import React, { useEffect, useRef, useState } from 'react'
import { checkIsMember, createGroupMember, getChatInfo,  sendChat } from '../api/ChatApi'
import { useParams, useSearchParams } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage';
import { db_app } from '../configs/firebaseConfig';
import { child, get, onValue, query, ref } from 'firebase/database';
import NotFound from './NotFound';
import BubleChat from '../components/chat/BubleChat';
import NotFoundChat from '../components/chat/NotFoundChat';
import { getDataLogin } from '../helper/SessionLogin';
import Navbar from '../components/Navbar';
import { sortAscByKey } from '../helper/GlobalFunctions';
import { getUserInfo } from '../api/UserApi';

const Chat = () => {
    const dbRef = ref(db_app);
    const containerRef = useRef(null);


    const { chat_id } = useParams();
    const [user_id, set_user_id] = useState('');
    const [message_x, set_message_x] = useState('');
    const [data_user, set_data_user] = useState({});
    const [chat_info, set_chat_info] = useState({});
    const [chat_name, set_chat_name] = useState('');
    const [data_message, set_data_message] = useState([]);
    const [user_is_member, set_user_is_member] = useState(false); 

    const handleChekIsMember = async (user_id_x) => {
        const res = await checkIsMember(chat_id, user_id_x);
        set_user_is_member(res);
        // console.log('handleChekIsMember', res)
    }

    const handleChatInfo = async (user_login_id) => {
        const res = await getChatInfo(chat_id);
        set_chat_info(res);
        // console.log('handleChatInfo', res);
        if (res.group_type == 'private chat') {
            if ( res.user_1 == user_login_id) {
                const res2 = await getUserInfo(res.user_2);

                set_chat_name(res2.alias_name)
            } else {
                const res2 = await getUserInfo(res.user_1);

                set_chat_name(res2.alias_name)
            }
        } else {
            set_chat_name(res.name)
        }
    }

    const handleSend = async () => {
        const res = await sendChat(chat_id, user_id, message_x);
        set_message_x('');
    }

    const handleGabung = async () => {
        const res = await createGroupMember(chat_id,user_id, 'member');
        if ( res == '200') {
            handleChekIsMember(user_id);
        }
    }

    const updateDataMessages = async (data) => {
        const dataArray = [];
        
        var snapshotCharacters = await get( query(
            ref(db_app, 'chat_app/characters')
        ))  

        if ( snapshotCharacters.exists() ) {
            snapshotCharacters = snapshotCharacters.val();
        } else {
            // console.log('characters not found' )
        }

        const snapshotMember = get(child(dbRef, 'chat_app/users/'))
        .then( (snapshotMember) => {
            set_data_user(snapshotMember.val())
            Object.entries(data).map(([id, obj]) => {
                
                const user = snapshotMember.val();

                // console.log('snapshotCharacters', snapshotCharacters)
                // console.log('user[obj.sender_id].character', user[obj.sender_id].character)

                dataArray.push({ 
                    id,
                    dor: id, 
                    alias_name: user[obj.sender_id].alias_name,
                    character: snapshotCharacters[user[obj.sender_id].character].src,
                    ...obj 
                })
    
    
                
            });

            // console.log('dataArray', dataArray)
            set_data_message( sortAscByKey(dataArray,'sys_created_on'));

        }).catch( (e) => {
            console.log('e', e)
        })
        
        
    }



    useEffect( () => {
        let user_id = getDataLogin('uid');

        set_user_id(user_id);
        handleChekIsMember(user_id);
        handleChatInfo(user_id);
        const messageRef = ref(db_app, 'chat_app/chats/' + chat_id + '/messages');

        onValue(messageRef, (snapshot) => {
            const snapshotChat = snapshot.val();
            if ( snapshotChat !== null ) {

                updateDataMessages(snapshotChat)
            }
        });

    }, [])

    useEffect(() => {

        // setTimeout(() => {
            const container = containerRef.current;
            if (container) {
                container.scrollTop = container.scrollHeight;
            } else {
                console.log(container)
                alert('Element not found');
            }
            
        // }, 1000);
    }, [data_message]);


    // if ( !user_is_member ) {
    //     return (
    //             <NotFound />
    //     )
    // }

  return (
    <>
        <Navbar 
            headerBack={true}
            headerTitle={ chat_name }
        />
        <div className='container-fluid'>
            <div ref={containerRef} className='chat-container'  style={{ height: '80vh', overflowY: 'auto'}}>
                {
                    data_message.length > 0 ?
                    data_message.map( (v,i) => {
                        if ( v.sender_id == user_id ) {
                            return (
                                <div key={i}>
                                    <BubleChat 
                                        type={'right'}
                                        value={v}
                                    />
                                </div>
                            )
                        } else {
                            return (
                                <div key={i}>
                                    <BubleChat 
                                        type={'left'}
                                        value={v}
                                    />
                                </div>
                            )
                        }
                    })

                    :
                    <NotFoundChat />
                }
            </div>
            {
                user_is_member ?
                <div className='row sticky-bottom'>
                    <input 
                        className='form-control col'
                        value={message_x}
                        onChange={(e) => set_message_x(e.currentTarget.value)}
                        placeholder='Ketik untuk mengirim pesan'
                        onKeyDown={ (e) => {
                            if (e.key === 'Enter') {
                                handleSend()
                            }
                        }}
                    />
                    {
                        message_x &&
                        <button onClick={handleSend} className='btn btn-sm btn-primary col-md-2 col-2 ms-3'>Ent</button>
                    }
                </div>
                :
                <div className='row'>
                    <button onClick={handleGabung} className='btn btn-sm btn-primary col'>Gabung</button>
                </div>
            }
        </div>
    </>
  )
}

export default Chat