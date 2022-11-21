import Modal from '@common/Modal';
import { useMQTT } from '@hooks/useMQTTClient';
import React, { useEffect } from 'react'

const Light = ({topic}) => {

  const { publish, message } = useMQTT();
  const [checked, setChecked] = React.useState(false);
  const [topicM, setTopicM] = React.useState(topic);
  const [modal, setModal] = React.useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    publish(topicM, e.target.checked ? "1" : "0");
  }

  const handleModal = () => {
    setModal(!modal);
  }  

  return (
    
    <>
      <div className='card mr-1 ml-4 mt-2 overflow-hidden p-0' style={{maxWidth: 300}}>
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 className='mb-0'>Luz</h5>
          <span style={{cursor: 'pointer'}}
            onClick={handleModal}
          >
            <i class="fas fa-cog" onClick={handleModal}></i>
          </span>
        </div>
        <div className='card-body'>
          <div className='mt-1 d-flex flex-column justify-content-center align-items-center'>
            <div className={`mb-0 text-${checked?"warning":"primary"}`} style={{fontSize: 100, marginTop: -10}}>
              <i class="fas fa-lightbulb"></i>
            </div>
            <div className="form-check form-switch" style={{marginLeft: -40, marginTop: -10}}>
              <input className="form-check-input" style={{width: 100, height: 50}} onChange={handleChange} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
            </div>
          </div>
        </div>
      </div>

      <Modal handle={modal} setHandle={setModal} topic={topic} setTopic={setTopicM} aleatorio={Math.random().toString(36).substr(2, 9)}/>
    </>
  )
}

export default Light