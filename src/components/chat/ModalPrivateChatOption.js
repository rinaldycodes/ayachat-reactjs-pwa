import { ref, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { getDataLogin } from '../../helper/SessionLogin';
import { db_app } from '../../configs/firebaseConfig';

const ModalPrivateChatOption = ({ showModalPrivateChat, handleCloseModalPrivateChat, item }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        handleCloseModalPrivateChat()
        setShowModal(false);
    };

    const handleDelete = (item,user_login_id) => {
        remove(ref(db_app, '/chat_app/chats/'+item.id+'/members/'+user_login_id)).then( (res) => {
            console.log('remove success', res)
            handleCloseModal();
        }).catch( (e) => {
            console.log('remove error', e)
        })
    }

    useEffect( () => {

    }, [])

  return (
    <div>
        {/* {showModal && ( */}
            <div className={`modal fade ${showModalPrivateChat?'show':''} `} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
                style={{
                    display: (showModalPrivateChat?'block':'none')
                }}
            >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{item.name}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-bodyx">
                        <ul className="list-group">
                            <li className="list-group-item"
                                onClick={ () => {
                                    if ( window.confirm('Apa kamu yakin akan menghapus chat '+item.name+' ?')) {
                                        const user_login_id = getDataLogin('uid');
                                        handleDelete(item,user_login_id);
                                    }

                                }}
                            >Delete</li>
                        </ul>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div> */}
                </div>
            </div>
            </div>
        {/* )} */}
    </div>
  )
}

export default ModalPrivateChatOption