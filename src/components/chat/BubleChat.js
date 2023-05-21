import React from 'react'
import Avatar from './Avatar'

const BubleChat = ({type,value}) => {
    if ( type == 'right' ) {
        return (
            <div  className='mt-3'>
                <div className='bubble-right d-flex justify-content-end mb-3'>
                    <div className='message-bubble-right'>
                        <span className='p-chat'>{value.message}</span>
                        {/* <span className='p-jam'>{value.sys_created_on}</span> */}
                    </div>
                    <div>
                        <Avatar  src={value.character} alt="image" width={55} user_id={value.sender_id} user_info={value}  />
                    </div>
                </div>
                <div
                    style={{
                        marginTop: -15,
                        marginLeft: 10,
                        fontSize: 10,
                        color: 'gray',
                        fontWeight: 'bold',
                        textAlign: 'end'
                    }}
                >
                        <small >{value.sys_created_on}</small>
                </div>
            </div>
        )
    }

    if ( type == 'left' ) {
        return (
            <div  className='mt-3'>
                <div className='bubble-left d-flex justify-content-start mb-3'>
                    <div>
                        <Avatar  src={value.character} alt="image" width={55} user_id={value.sender_id}  user_info={value} />
                    </div>
                    <div className='message-bubble-left'>
                        <label className='p-name fw-bold'>{value.alias_name}</label>
                        <p className='p-chat'>{value.message}</p>
                    </div>
                </div>
                <div
                    style={{
                        marginTop: -15,
                        marginLeft: 10,
                        fontSize: 10,
                        color: 'gray',
                        fontWeight: 'bold'
                    }}
                >
                        <small >{value.sys_created_on}</small>
                </div>
            </div>
        )
    }
}

export default BubleChat