import Head from 'next/head';
import Image from 'next/image';
// import styles from '../styles/Home.module.css'
import Temp from '@components/Temp';
import Light from '@components/Light';
import Hum from '@components/Hum';


export default function Home() {
  return (
    <>
      <Head>
        <title>Devices</title>
        <meta name="description" content="DashBoard Con los dispositivos IOT" />
      </Head>
      <Temp topic={"temp"}/>
      <Hum topic={"hum"} />
      <Light topic={"led"} />
      {/* <Light topic={"light"}/> */}
      
    </>
    
  )
}
