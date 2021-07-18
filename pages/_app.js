import '../styles/globals.css'
import { Web3Provider } from '../context/Web3'
import { SidebarProvider } from '../context/Sidebar'
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <SidebarProvider>
        <ToastProvider autoDismiss={true} autoDismissTimeout="5000" placementType="top-right">
          <Component {...pageProps} />
          </ToastProvider>
      </SidebarProvider>
    </Web3Provider>
  )
}

export default MyApp
