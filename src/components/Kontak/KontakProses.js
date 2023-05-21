import React from 'react'
import ButtonUndangTeman from './ButtonUndangTeman';
import { ref, set } from 'firebase/database';
import { db_app } from '../../configs/firebaseConfig';
import { getDataLogin } from '../../helper/SessionLogin';

const KontakProses = ({data}) => {
    const current_user_id = getDataLogin('uid');

    const handleAccept = async (friend_id) => {
        const currTime = Date.now();
        const myQuery = await set(
          ref(db_app, 'chat_app/friends/'+current_user_id+'/'+friend_id), {
            friend_id: friend_id,
            status: 'accepted',
            sys_updated_on: currTime,
          }
        )
    
        const friendQuery = await set(
          ref(db_app, 'chat_app/friends/'+friend_id+'/'+current_user_id), {
            friend_id: current_user_id,
            status: 'accepted',
            sys_updated_on: currTime,
          }
        )
    }

    if ( data.length <= 0 ) {
        return (
            <div 
               className='row justify-content-center'
            >
                <div className='col-md-5 text-center'>
                    <div className='image-container-responsive'>
                        <img src='/images/garnish/dog_and_cat_handshake.png' />
                    </div>
                    <p>Anda belum memiliki permintaan pertemanan. </p>
                </div>
                <div className='row justify-content-center'>
                    <ButtonUndangTeman mypage="proses" />
                </div>
            </div>
        )
    }
  return (
    <div>
        <div 
            style={{
                overflowY: 'scroll',
                height: '73vh',
                paddingBottom: 50,
            }}
        >
            {
                data.map( (val, i) => {
                    return (
                        <div className='card card-body mt-3'>
                            <div className='row align-items-center'>
                                <div className='col-md-3 col-4 image-container-responsive'>
                                    <img src={val.src} alt='img avt'  />
                                </div>
                                <div className='col'>
                                    <div style={{ fontSize: 16, fontWeight: 'bold'}}>{val.alias_name}</div>
                                    <div style={{ fontSize: 14, }}>{val.gender.toUpperCase()} </div>
                                    <div style={{ fontSize: 14, }}>{val.age} Tahun </div>
                                    <div style={{ fontSize: 14, }}>{val.point} <b>Point</b></div>
                                </div>
                                <div className='col-2 col-md-4'>
                                    <div className='justify-content-evenly row align-items-center align-content-center'>
                                        <button className='btn btn-sm btn-primary col-5 col-md-4'
                                            onClick={ () => {
                                                handleAccept(val.friend_id)
                                            }}
                                        >
                                            <i className='fa fa-plus'></i>
                                        </button>
                                        <button className='btn btn-sm btn-danger col-5 col-md-4'>
                                            <i className='fa fa-close'></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })
            }
        </div>
        {/* <div className='col-12' style={{
            position: 'absolute',
            bottom: 0,
        }}>
            <button className='btn btn-primary w-100'>Undang Teman</button>
        </div> */}
        <div className='row justify-content-center'>
            <ButtonUndangTeman mypage="proses" />
        </div>
    </div>
  )
}

export default KontakProses