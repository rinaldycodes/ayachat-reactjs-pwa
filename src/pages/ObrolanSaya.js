import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  onValue, query, ref } from 'firebase/database';
import { db_app } from '../configs/firebaseConfig';
import { getDataLogin } from '../helper/SessionLogin';
import { getUserInfo } from '../api/UserApi';
import { getDataChat, storeDataChat } from '../helper/CacheChat';
import ModalPrivateChatOption from '../components/chat/ModalPrivateChatOption';
import LongPressButton from '../components/LongPressButton';

const ObrolanSaya = () => {
    const nav = useNavigate();
    const [loading_screen, set_loading_screen] = useState(true);

    const [showModalPrivateChat, setShodaModalPrivateChat] = useState(false);

    const [data_chat, set_data_chat] = useState([]);
    const [data_chat_clicked, set_data_chat_clicked] = useState({});

    const handleAdd = () => {   
        nav('/add-group');
    }

    const handleUpdateChat = (data) => {
        const current_user_id = getDataLogin('uid');
        var no = 1;
        const arr_data_chat = [];

        Object.keys(data).forEach((chatId) => {
            // console.log(no++)
            const members = data[chatId].members;
            
            if ( members[current_user_id]  ) {
            // if ( members.hasOwnProperty(current_user_id)  ) {
                if (data[chatId].group_type == 'private chat') {
                    if ( data[chatId].user_1 == current_user_id) {
                        const res2 = getUserInfo(data[chatId].user_2).then( (snapshotUser) => {
                            if ( snapshotUser ) {
                                // console.log('res2 2', res2)
                                arr_data_chat.push({
                                    id: chatId,
                                    name: snapshotUser.alias_name,
                                    group_type: data[chatId].group_type,
                                })

                            }
                        });
                    } else {
                        const res2 = getUserInfo(data[chatId].user_1).then( (snapshotUser) => {
                            if ( snapshotUser ) {
                                // console.log('res2 2', snapshotUser.alias_name)
                                arr_data_chat.push({
                                    id: chatId,
                                    name: snapshotUser.alias_name,
                                    group_type: data[chatId].group_type,
                                })
                            }
                        });
                    }
                } else {
                    arr_data_chat.push({
                        id: chatId,
                        name: data[chatId].name,
                        group_type: data[chatId].group_type,
                    })
                }
                
            }
        })

        setTimeout(() => {
            storeDataChat('obrolan_saya',arr_data_chat);
            set_data_chat(arr_data_chat);
        }, 100);
    }

    useEffect( () => {
        setTimeout(() => {
            set_loading_screen(false); 
        }, 1000);

        const dataLocalChat = getDataChat('obrolan_saya');
        if ( dataLocalChat ) {
            set_data_chat(dataLocalChat);
        }

        const chatRef = query(ref(db_app, 'chat_app/chats'));
        onValue(chatRef, (snapshot) => {
            if ( snapshot.exists() ) {
                const data = snapshot.val();
                handleUpdateChat(data)
            }

              
        });
    }, [])


    const handleShowModalPrivateChat = (item) => {
        set_data_chat_clicked(item);
        setShodaModalPrivateChat(true);
      };
    
    const handleCloseModalPrivateChat = () => {
        setShodaModalPrivateChat(false);
    };
    
  return (
    <>
        <ModalPrivateChatOption showModalPrivateChat={showModalPrivateChat}  handleCloseModalPrivateChat={handleCloseModalPrivateChat} item={data_chat_clicked} />
        <ul className="list-group">
            {
                data_chat.map( (item,i) => {
                    return (
                        <>
                            <LongPressButton
                                onLongPress={
                                    () => {
                                        handleShowModalPrivateChat(item);
                                    }
                                }
                            >
                                <li className="list-group-item" key={i} onDoubleClick={ () => nav('/chat/'+item.id)} 
                                    // onClick={ () => {
                                    // }}
                                >{item.name}</li>
                            </LongPressButton>
                        </>
                    )
                })
            }
        </ul>
    </>
  )
}

export default ObrolanSaya