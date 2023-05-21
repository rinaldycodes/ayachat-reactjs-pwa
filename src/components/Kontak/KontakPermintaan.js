import React from 'react'
import ButtonUndangTeman from './ButtonUndangTeman';

const KontakPermintaan = ({data}) => {

    if ( data.length <= 0 ) {
        return (
            <div 
               className='row justify-content-center'
            >
                <div className='col-md-5 text-center'>
                    <div className='image-container-responsive'>
                        <img src='/images/garnish/dog_and_cat_handshake.png' />
                    </div>
                    <p>Anda belum melakukan permintaan teman ke siapapun. <br></br> Ayo kirim permintaan teman kesiapapun, dan buat hubungan baru. </p>
                </div>
                <div className='row justify-content-center'>
                    <ButtonUndangTeman mypage="permintaan" />
                </div>
            </div>
        )
    }
  return (
    <div>
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
                                {/* <div className='justify-content-evenly row align-items-center align-content-center'>
                                    <button className='btn btn-sm btn-primary col-5 col-md-4'>
                                        <i className='fa fa-plus'></i>
                                    </button>
                                    <button className='btn btn-sm btn-danger col-5 col-md-4'>
                                        <i className='fa fa-close'></i>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                )

            })
        }
    </div>
  )
}

export default KontakPermintaan