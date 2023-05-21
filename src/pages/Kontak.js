import { equalTo, get, onValue, orderByChild, query, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db_app } from '../configs/firebaseConfig'
import { getDataLogin } from '../helper/SessionLogin'
import KontakPermintaan from '../components/Kontak/KontakPermintaan'
import KontakProses from '../components/Kontak/KontakProses'
import KontakTemanku from '../components/Kontak/KontakTemanku'

const Kontak = () => {
    const current_user_id = getDataLogin('uid');
    
    const [data_accepted, set_data_accepted] = useState([]);
    const [data_awaiting, set_data_awaiting] = useState([]);
    const [data_requested, set_data_requested] = useState([]);

    const getRequested = async (snapshotData) => {
        const array_accepted = []
        const array_requested = [];
        const array_awaiting = []

        const characterQuery = query(
            ref(db_app, '/chat_app/characters/')
        )

        const usersQuery = query(
            ref(db_app, '/chat_app/users/')
        )

        const snapshotCharacters = await get(characterQuery);
        const snapshotUser = await get(usersQuery);

        if (snapshotCharacters.exists() ) {
            const dataCharacters = snapshotCharacters.val();
            const dataUser = snapshotUser.val();
            
            // const myQuery = query(
            //     ref(db_app, '/chat_app/friends/'+current_user_id),
            // )
            // const snapshotData = await onValue(myQuery);
    
            if ( snapshotData ) {
                const data = snapshotData;
                console.log('data', data)

                Object.keys(data).map( (key) => {
                    var dataKey = data[key];
                    console.log('key', dataKey['status'])
                    if ( dataKey['status'] == 'requested') {
                        dataKey.alias_name = dataUser[dataKey.friend_id].alias_name
                        dataKey.point = dataUser[dataKey.friend_id].point
                        dataKey.age = dataUser[dataKey.friend_id].age
                        dataKey.gender = dataUser[dataKey.friend_id].gender
                        dataKey.src = dataCharacters[dataUser[dataKey.friend_id].character].src
                        array_requested.push(dataKey)
                    }
        
                    if ( dataKey['status'] == 'accepted') {
                        dataKey.alias_name = dataUser[dataKey.friend_id].alias_name
                        dataKey.point = dataUser[dataKey.friend_id].point
                        dataKey.age = dataUser[dataKey.friend_id].age
                        dataKey.gender = dataUser[dataKey.friend_id].gender
                        dataKey.src = dataCharacters[dataUser[dataKey.friend_id].character].src
                        array_accepted.push(dataKey)
                    }
        
                    if ( dataKey['status'] == 'awaiting') {
                        dataKey.alias_name = dataUser[dataKey.friend_id].alias_name
                        dataKey.point = dataUser[dataKey.friend_id].point
                        dataKey.age = dataUser[dataKey.friend_id].age
                        dataKey.gender = dataUser[dataKey.friend_id].gender
                        dataKey.src = dataCharacters[dataUser[dataKey.friend_id].character].src
                        array_awaiting.push(dataKey)
                    }
                })
    
                

                set_data_accepted(array_accepted);
                set_data_requested(array_requested);
                set_data_awaiting(array_awaiting);
            }
    
            // console.log(array_accepted)
            console.log('array_requested',array_requested)
            // console.log(array_awaiting)
        }
    }

    useEffect( () => {
        // getRequested();
        const messageRef = ref(db_app, '/chat_app/friends/'+current_user_id);

        onValue(messageRef, (snapshot) => {
            const snapshotChat = snapshot.val();
            if ( snapshotChat !== null ) {

                getRequested(snapshotChat)
            }
        });
    }, [])
  return (
    <div className='container-fluid'>
        <nav>
            <div className="nav nav-tabs row justify-content-between" id="nav-tab" role="tablist">
                <button className="nav-link col active" id="nav-TemanKu-tab" data-bs-toggle="tab" data-bs-target="#nav-TemanKu" type="button" role="tab" aria-controls="nav-TemanKu" aria-selected="true">Temanku</button>
                <button className="nav-link col" id="nav-Proses-tab" data-bs-toggle="tab" data-bs-target="#nav-Proses" type="button" role="tab" aria-controls="nav-Proses" aria-selected="false">Proses</button>
                <button className="nav-link col" id="nav-Permintaan-tab" data-bs-toggle="tab" data-bs-target="#nav-Permintaan" type="button" role="tab" aria-controls="nav-Permintaan" aria-selected="false">Permintaan</button>
            </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-TemanKu" role="tabpanel" aria-labelledby="nav-TemanKu-tab">
                <KontakTemanku data={data_accepted}/>
            </div>
            <div className="tab-pane fade" id="nav-Proses" role="tabpanel" aria-labelledby="nav-Proses-tab">
                <KontakProses data={data_awaiting} />
            </div>
            <div className="tab-pane fade" id="nav-Permintaan" role="tabpanel" aria-labelledby="nav-Permintaan-tab">
                <KontakPermintaan data={data_requested} />
            </div>
        </div>
    </div>
  )
}

export default Kontak