import { useMQTT } from '@hooks/useMQTTClient';
import React from 'react'

const Light = ({topic}) => {

  const { publish, message } = useMQTT();

  const prender = () => {
    console.log("Prender");
    publish(topic, "1");
  }

  return (
    
    <>
      <button className='mt-5' onClick={prender}>Prender Nojoñe</button>
    </>
  )
}

export default Light