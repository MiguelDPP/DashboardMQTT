import React from 'react'
import { useMQTT } from '@hooks/useMQTTClient';
import Link from 'next/link';

const DashboardLayout = ({ children }) => {
  const { connected, broker } = useMQTT();
  return (
    <>
      {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
          {/* Sidebar - Brand */}
          <Link className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-wave-square"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Dashboard IoT</div>
          </Link>
          {/* Divider */}
          <hr className="sidebar-divider my-0" />
          {/* Nav Item - Dashboard */}
          <li className="nav-item active">
            <Link className="nav-link" href="/">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dispositivos</span></Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" href="/connect">
            <i className="fas fa-server"></i>
              <span>Broker</span></Link>
          </li>

        </ul>
        {/* End of Sidebar */}
        {/* Content Wrapper */}

        <div id="content-wrapper" className="d-flex flex-column">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <span className={`badge bg-${(connected)?"success":"danger"} text-lg`}>{(connected)?`Conectado a ${broker}`:"Desconectado"}</span>
          </nav>
          <div className='row'>
            {children}
          </div>
        </div>
      </div>


    </>
  )
}

export default DashboardLayout