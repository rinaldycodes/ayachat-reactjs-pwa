import React from 'react'

const LoadingScreen = ({loading_text}) => {
  return (
    <div className='container-fluid'>
      <div className='row text-center align-items-center d-flex' style={{
          display: 'flex',
          height: '80vh'
      }}>
        <div>
            <img src='/images/garnish/animal_playing.png' width={200} height={200} alt='loading img' 
              style={{
                objectFit: 'contain'
              }}
            />
            <div>{loading_text}</div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen