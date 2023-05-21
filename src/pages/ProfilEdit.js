import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { updateUser } from '../api/UserApi';

const ProfilEdit = () => {
    // const nav = useNavigate('');

    const { state } = useLocation();
    const [user, set_user] = useState(state.user);
    const current_user_id  = state.user_id;

    const [alias_name, set_alias_name] = useState(state.user_info.alias_name);
    const [age, set_age] = useState(user.age);
    const [gender, set_gender] = useState(user.gender);

    const handleSimpan = () => {
        if ( state.user_info.alias_name != alias_name ) {
            updateUser(current_user_id, 'alias_name', alias_name);
        }

        if ( user.age != age ) {
            updateUser(current_user_id, 'age', age);
        }

        if ( user.gender != gender ) {
            updateUser(current_user_id, 'gender', gender);
        }

        alert("Berhasil merubah profil");
    }

  return (
    <>
        <Navbar 
            headerBack={true}
            headerTitle={'Ubah Profil'}
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
                        <input 
                            className='form-control'
                            value={alias_name}
                            onChange={ (e) => set_alias_name(e.currentTarget.value)}
                        />
                        <div className='row mt-3'>
                            <p className='h6 col'>Jenis Kelamin</p>
                            {/* <p className='h6 '>{user.gender.toUpperCase()}</p> */}
                            <select
                                className='form-control col me-3'
                                onChange={ (e) => {
                                set_gender(e.currentTarget.value)
                                }}
                                value={gender}
                            >
                                <option value=''>-- Pilih --</option>
                                <option value='pria'>Pria</option>
                                <option value='wanita'>Wanita</option>
                            </select>
                        </div>
                        <div className='row mt-3'>
                            <p className='h6 col'>Usia</p>
                            <select
                                className='form-control col me-3'
                                onChange={ (e) => {
                                set_age(e.currentTarget.value)
                                }}
                                value={age}
                            >
                                <option value=''>-- Pilih --</option>
                                <option value='18'>18</option>
                                <option value='19'>19</option>
                                <option value='20'>20</option>
                                <option value='21'>21</option>
                                <option value='23'>23</option>
                                <option value='24'>24</option>
                                <option value='25'>25</option>
                                <option value='26'>26</option>
                                <option value='27'>27</option>
                                <option value='28'>28</option>
                                <option value='29'>29</option>
                                <option value='30'>30</option>
                                <option value='31'>31</option>
                                <option value='31'>31</option>
                            </select>
                        </div>
                        <div className='row mt-3'>
                        <p className='h6 col'>Poin Sosial</p>
                        <p className='h6 col'>{user.point}</p>
                        </div>
                        {
                        current_user_id != state.user_id &&
                        <div className=''>
                            <button className='btn btn-primary w-100'>Tambah Teman</button>
                        </div>
                        }
                    </div>
                </div>
            </div>
            <div className='card sticky-bottom'
                 style={{
                    position: 'absolute',
                    bottom: 60,
                    width: '96%'
                }}
            >
                <button className='btn btn-primary w-100 me-5'
                    onClick={handleSimpan}
                >Simpan</button>
            </div>
        </div>
    </>
  )
}

export default ProfilEdit