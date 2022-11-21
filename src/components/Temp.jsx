import React, { useEffect } from 'react'
import styles from "@styles/devices.module.css";
import { useMQTT } from '@hooks/useMQTTClient';

const Temp = ({topic}) => {

  const { subscribe, message } = useMQTT();

  subscribe(topic);

  useEffect(() => {
    console.log(message);
    if (message.topic === topic) {
      // Comprobar que sea un numero
      try {
        let temp = parseFloat(message.message);
        setTemp(temp);
      }catch(err) {
        console.log(err);
      }
    }
  }, [message]);

  const [temp, setTemp] = React.useState(80);
  const [deg, setDeg] = React.useState(0);
  const [color, setColor] = React.useState("blue");

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
      setColor("blue");
    }
  }, [temp]);

  return (
    <div className='card mr-4 ml-4 mt-2 overflow-hidden' style={{maxWidth: 300}}>
      <div className='card-body'>
        <h5 class="card-title">Temperatura</h5>
        <div className="mt-4" >
          <div className={styles.barraTemp} style={{transform: `rotate(${deg}deg)`}}>
            <div className={styles.cont} style={{backgroundColor: 'rgb(143, 136, 136)'}}></div>
            <div className={styles.cont} style={{backgroundColor: color}}></div>
          </div>
          <div className={styles["circulo_centro"]} style={{color: 'blue', textAlign: 'center'}}><i class="fas fa-temperature-high"></i></div>
          <div className={styles.rectangulo} style={{textAlign: 'center'}}></div>
          <h1 className={styles.data}>{temp} °C</h1>
        </div>
      </div>
      
    </div>
  )
}

export default Temp