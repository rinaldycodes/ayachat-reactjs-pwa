import React, { useState } from 'react';
import ObrolanRekomendasi from '../pages/ObrolanRekomendasi';
import ObrolanSaya from '../pages/ObrolanSaya';
import Kontak from '../pages/Kontak';

function TabBerandaComponent() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <div className="tab-container navbar bg-light ">
        <div className='container-fluid'>
            <div
            className={`tab mb-0 h1 fs-6 pointer ${activeTab === 0 ? 'active-tab' : ''}`}
            onClick={() => handleTabClick(0)}
            >
            ObrolanRekomendasi
            </div>
            <div
            className={`tab mb-0 h1 fs-6 pointer ${activeTab === 1 ? 'active-tab' : ''}`}
            onClick={() => handleTabClick(1)}
            >
            Obrolan Saya
            </div>
            <div
            className={`tab mb-0 h1 fs-6 pointer ${activeTab === 2 ? 'active-tab' : ''}`}
            onClick={() => handleTabClick(2)}
            >
            Kontak
            </div>
        </div>
      </div>
      <div className="tab-content">
        {/* Render content based on activeTab state */}
        {activeTab === 0 && <div><ObrolanRekomendasi/></div>}
        {activeTab === 1 && <div><ObrolanSaya /></div>}
        {activeTab === 2 && <div><Kontak /></div>}
      </div>
    </div>
  );
}

export default TabBerandaComponent;
