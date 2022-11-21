// import '../styles/globals.css'
import '@styles/sb-admin-2.min.css';
import DashboardLayout from '@layouts/DashboardLayout';
import { ProviderMQTT } from '@hooks/useMQTTClient';


function MyApp({ Component, pageProps }) {
  
  return (
    <ProviderMQTT>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </ProviderMQTT>
  )
}

export default MyApp
