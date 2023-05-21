import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../api/UserApi';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { equalTo, get, orderByChild, query, ref, set } from 'firebase/database';
import { db_app } from '../configs/firebaseConfig';
import Navbar from '../components/Navbar';
import LoadingScreen from './LoadingScreen';
import { getDataLogin } from '../helper/SessionLogin';
import { createPrivateChat } from '../api/ChatApi';

const Profil = () => {
  const nav = useNavigate();
  const [loading_screen, set_loading_screen] = useState(true);
  const { state } = useLocation();

  const [user, set_user] = useState();
  const [friend, set_friend] = useState(0);

  const current_user_id = getDataLogin('uid');

  const handleGetUserInfo = async (user_id) => {

    set_loading_screen(true);
    const res = await getUserInfo(user_id)

    if ( res != undefined ) {
      // console.log('debug', res)
      set_user(res);
      set_loading_screen(false);
    }
  }

  const handleOpenChat = async () => {
    var found_out = 0;
    const snapshotChat = await get( query(
      ref(db_app, 'chat_app/chats/'),
      orderByChild('group_type'),
      equalTo('private chat'),
    ))

    if ( snapshotChat.exists() ) {
      const private_chat_data = snapshotChat.val()
      Object.keys(private_chat_data).forEach( (chatId) => {
        // console.log("open chat ", private_chat_data[chatId]);
        if ( private_chat_data[chatId].user_1 === state.user_id  && private_chat_data[chatId].user_2 === current_user_id ) {
          nav('/chat/'+chatId)
          found_out = 1;
          return false;
        }

        if ( private_chat_data[chatId].user_1 === current_user_id  && private_chat_data[chatId].user_2 === state.user_id ) {
            found_out = 1;
            nav('/chat/'+chatId)
            return false;
        }

      })

      if ( found_out === 0 )  {
        console.log('found out 0' , found_out)
        createPrivateChat(state.user_id).then( (res) => {
            console.log('create private_chat dari existing', res)
            if ( res != '400' ) {
                // alert("Berhasil open chat");
                nav('/chat/'+res)
            }
        }).catch( (error) => {
            console.log('error', error)
        })

      } else {
        console.log('found out 1' , found_out)
      }


    } else {
      createPrivateChat(state.user_id).then( (res) => {
          console.log('create private_chat ', res)
          if ( res != '400' ) {
              // alert("Berhasil open chat");
              nav('/chat/'+res)
          }
      }).catch( (error) => {
          console.log('error', error)
      })
    }
  }

  const handleTambahTeman = async () => {
    const currTime = Date.now();
    const myQuery = await set(
      ref(db_app, 'chat_app/friends/'+current_user_id+'/'+state.user_id), {
        friend_id: state.user_id,
        status: 'requested',
        sys_created_on: currTime,
      }
    )

    const friendQuery = await set(
      ref(db_app, 'chat_app/friends/'+state.user_id+'/'+current_user_id), {
        friend_id: current_user_id,
        status: 'awaiting',
        sys_created_on: currTime,
      }
    )

    set_friend(1);
  }

  useEffect( () => {
    if ( state == null ) {
      nav('/beranda');
    } else {
      handleGetUserInfo(state.user_id)
    }

  },[])

  if ( loading_screen ) {
    return (
      <LoadingScreen loading_text={'LOADING'} />
    )
  }

  return (
    <div>
      <Navbar
        headerBack={true}
        headerTitle={'Profil Pengguna'}
        headerRight={
          <>
            {
              current_user_id == state.user_id &&
              <div
                onClick={ () => {
                  nav('/profil-edit', {
                    state: {
                      user_id: current_user_id,
                      user: user,
                      user_info: state.user_info,
                    }
                  })
                }}
              >
                <i className='fa fa-pencil'></i>
              </div>
            }
          </>
        }
      />
      <div className='container-fluid'>
        <div className='row justify-content-center mt-3'>
          <div className='col-5'>
            <div 
              className='image-container-responsive'
              style={{
                border: '1px solid'
              }}
            >
              <img src={state.user_info.character} alt={'Avate'}
                 style={{
                  width: 'inherit'
                }}
              />
            </div>
          </div>
          <div className='col'>
              <div>
                <p className='h6 fw-bold'>{ state.user_info.alias_name}</p>
                <div className='row'>
                  <p className='h6 col'>Jenis Kelamin</p>
                  <p className='h6 col'>{user.gender.toUpperCase()}</p>
                </div>
                <div className='row'>
                  <p className='h6 col'>Usia</p>
                  <p className='h6 col'>{user.age}</p>
                </div>
                <div className='row'>
                  <p className='h6 col'>Poin Sosial</p>
                  <p className='h6 col'>{user.point}</p>
                </div>
                {
                  current_user_id != state.user_id ? friend == 0 ?


                  <div className=''>
                    <button className='btn btn-primary w-100' onClick={handleTambahTeman}>Tambah Teman</button>
                  </div>
                  : <></>
                  :
                  <></>
                }
              </div>
          </div>
        </div>
        <div className='row justify-content-center mt-5'>
              <div className='col-6'>
                {
                  current_user_id != state.user_id &&
                    <button className='btn btn-outline-primary w-100' onClick={handleOpenChat}>Kirim Pesan</button>
                }
              </div>
        </div>
      </div>
    </div>
  )
}

export default Profil