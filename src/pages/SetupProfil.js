import React, { useState } from 'react'

const SetupProfil = () => {
    const [age, set_age] = useState('');
    const [gender, set_gender] = useState('');

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col'>
                <div className='form-group mb-3'>
                    <label>Umur {age}</label>
                    <select
                        className='form-control'

                    >
                        <option value={age}>Pilih umur</option>
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
            </div>
        </div>
    </div>
  )
}

export default SetupProfil