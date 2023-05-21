import React from 'react'
import { useNavigate } from 'react-router-dom'

const Avatar = ({ src, alt, width, user_id, user_info }) => {
    const nav = useNavigate();
  return (
    <div
        onClick={ () => {
            nav('/profil', {
                state: {
                    user_id: user_id,
                    user_info: user_info,
                }
            })
        }}
    >
        <img src={src} alt={alt} width={width} />
    </div>
  )
}

export default Avatar