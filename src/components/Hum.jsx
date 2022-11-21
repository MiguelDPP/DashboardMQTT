import { useMQTT } from '@hooks/useMQTTClient';
import React, { useEffect } from 'react';
import styles from "@styles/devices.module.css";
import Modal from '@common/Modal';

const Hum = ({topic}) => {
  const { subscribe, message } = useMQTT();

  subscribe(topic);

  const [hum, setHum] = React.useState(0);

  const [deg, setDeg] = React.useState(0);
  const [color, setColor] = React.useState("#496fdb");
  const [topicM, setTopicM] = React.useState(topic);
  const [modal, setModal] = React.useState(false);


  useEffect (() => {
    subscribe(topicM);
  }, [topicM]);

  useEffect(() => {
    if (message.topic === topicM) {
      // Comprobar que sea un numero
      try {
        try {
          let hum = parseFloat(message.message);
          setDeg(180*(hum/100));
          setHum(hum);
        }catch(err) {
          console.log(err);
        }
      }catch(err) {
        console.log(err);
      }
    }
  }, [message]);

  const handleModal = () => {
    setModal(!modal);
  }

  
  return (
    <>
      <div className='card mr-1 ml-4 mt-2 overflow-hidden p-0' style={{maxWidth: 300}}>
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 className='mb-0'>Humedad</h5>
          <span style={{cursor: 'pointer'}}
            onClick={handleModal}
          >
            <i class="fas fa-cog" onClick={handleModal}></i>
          </span>
        </div>
        <div className='card-body'>
          <div className="mt-4" >
            <div className={styles.barraTemp} style={{transform: `rotate(${deg}deg)`}}>
              <div className={styles.cont} style={{backgroundColor: 'rgb(143, 136, 136)'}}></div>
              <div className={styles.cont} style={{backgroundColor: color}}></div>
            </div>
            <div className={styles["circulo_centro"]} style={{color: 'blue', textAlign: 'center'}}><i className="fas fa-tint"></i></div>
            <div className={styles.rectangulo} style={{textAlign: 'center'}}></div>
            <h1 className={styles.data}>{hum} %</h1>
          </div>
        </div>
      </div>
      <Modal handle={modal} setHandle={setModal} topic={topic} setTopic={setTopicM} aleatorio={Math.random().toString(36).substr(2, 9)}/>
    </>
  )
}

export default Hum