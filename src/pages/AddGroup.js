import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { createGroup } from '../api/ChatApi';
import { useNavigate } from 'react-router-dom';

const AddGroup = () => {
    const nav = useNavigate();
    const [group_name, set_group_name] = useState('');
    const [group_type, set_group_type] = useState('public'); 

    const handleBuat = () => {
        createGroup(group_name, group_type).then( (res) => {
            console.log('create group ', res)
            if ( res == '200' ) {
                set_group_name('')
                alert("Berhasil membuat group");
                nav(-1)
            }
        }).catch( (error) => {
            console.log('error', error)
        })
    };
  return (
    <div className='container-fluid'>
        <div className='row'>
            <Navbar 
                headerBack={true}
            />
            <div className='form-group'>
                <label>Nama obrolan saya</label>
                <input 
                    className='form-control'
                    value={group_name}
                    onChange={(e) => {
                        set_group_name(e.currentTarget.value)
                    }}
                    placeholder='Contoh: Nutriboost addicts'
                />
            </div>
            <div className='form-group mt-3'>
                <label>Tipe obrolan</label>
                <select className='form-control'
                    value={group_type}
                    onChange={(e) => {
                        set_group_type(e.currentTarget.value)
                    }}
                >
                    <option valiue="public">Public</option>
                    <option valiue="private">Private</option>
                </select>
            </div>
            <div className='form-group mt-3'>
                <button className='btn btn-primary' onClick={handleBuat}>Buat</button>
            </div>
        </div>
    </div>
  )
}

export default AddGroup