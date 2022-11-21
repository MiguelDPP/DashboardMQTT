import Head from 'next/head';
import Image from 'next/image';
// import styles from '../styles/Home.module.css'
import Temp from '@components/Temp';
import Light from '@components/Light';


export default function Home() {
  return (
    <>
      <Head>
        <title>Devices</title>
        <meta name="description" content="DashBoard Con los dispositivos IOT" />
      </Head>
      <Temp topic={"temp"}/>
      <Light topic={"light"}/>
    </>
    
  )
}
