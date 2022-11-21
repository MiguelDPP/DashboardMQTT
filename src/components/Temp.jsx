import React, { useEffect } from 'react'
import styles from "@styles/devices.module.css";
import { useMQTT } from '@hooks/useMQTTClient';
import Modal from '@common/Modal';

const Temp = ({topic}) => {

  const { subscribe, message } = useMQTT();

  subscribe(topic);


  

  const [temp, setTemp] = React.useState(0);
  const [deg, setDeg] = React.useState(0);
  const [color, setColor] = React.useState("blue");
  const [topicM, setTopicM] = React.useState(topic);

  useEffect (() => {
    subscribe(topicM);
  }, [topicM]);

  useEffect(() => {
    if (message.topic === topicM) {
      // Comprobar que sea un numero
      try {
        let temp = parseFloat(message.message);
        setTemp(temp);
      }catch(err) {
        console.log(err);
      }
    }
  }, [message]);

  useEffect(() => {
    if (temp > 90) {
      setDeg(180);
    }else {
      setDeg(180*(temp/90));
    }
    if (temp > 70) {
      setColor("red");
    } else if (temp > 50) {
      setColor("orange");
    } else if (temp > 30) {
      setColor("yellow");
    }else {
      setColor("#496fdb");
    }
  }, [temp]);

  const [modal, setModal] = React.useState(false);

  const handleModal = () => {
    setModal(!modal);
  }

  return (
    <>
      <div className='card mr-1 ml-5 mt-2 overflow-hidden p-0' style={{maxWidth: 300}}>
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 className='mb-0'>Temperatura</h5>
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
          <div className={styles["circulo_centro"]} style={{color: 'blue', textAlign: 'center'}}><i className="fas fa-temperature-high"></i></div>
          <div className={styles.rectangulo} style={{textAlign: 'center'}}></div>
          <h1 className={styles.data}>{temp} °C</h1>
        </div>
      </div>
      
    </div>

    <Modal handle={modal} setHandle={setModal} topic={topic} setTopic={setTopicM} aleatorio={Math.random().toString(36).substr(2, 9)} />
    </>
  )
}

export default Temp