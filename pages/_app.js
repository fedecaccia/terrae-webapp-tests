import '../styles/globals.css'
import { Web3Provider } from '../context/Web3'
import { SidebarProvider } from '../context/Sidebar'

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <SidebarProvider>
      <Component {...pageProps} />
      </SidebarProvider>
    </Web3Provider>
  )
}

export default MyApp
