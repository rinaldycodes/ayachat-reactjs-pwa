import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { getDatabase, onValue, ref } from 'firebase/database';
import { db_app } from '../configs/firebaseConfig';
import { getDataChat, storeDataChat } from '../helper/CacheChat';

const ObrolanRekomendasi = () => {
    const nav = useNavigate();

    const [data_chat, set_data_chat] = useState([]);

    const handleAdd = () => {   
        nav('/add-group');
    }

    useEffect( () => {

        const dataLocalChat = getDataChat('obrolan_rekomendasi');
        if ( dataLocalChat ) {
            set_data_chat(dataLocalChat);
        }

        const starCountRef = ref(db_app, 'chat_app/chats');
        onValue(starCountRef, (snapshot) => {
            const arr_data_chat = [];
            
            if ( snapshot.exists() ) {
                const data = snapshot.val();
                Object.keys(data).forEach((chatId) => {
                    // console.log(data)
                    if ( data[chatId].group_type == 'public' ) {
                        arr_data_chat.push({
                            id: chatId,
                            name: data[chatId].name,
                            group_type: data[chatId].group_type,
                        })
                    }
                })

            }
            storeDataChat('obrolan_rekomendasi', arr_data_chat);
            set_data_chat(arr_data_chat);
        });
    }, [])
  return (
    <>
        <ul className="list-group">
            {
                data_chat.map( (item,i) => {
                    return (
                        <li className="list-group-item pointer" key={i} onClick={ () => nav('/chat/'+item.id)}>{item.name}</li>
                    )
                })
            }
        </ul>
    </>
  )
}

export default ObrolanRekomendasi