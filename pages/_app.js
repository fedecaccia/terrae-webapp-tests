// import App from 'next/app'
// import { Web3Provider } from '../context/Web3'

// class MyApp extends App {
//   render() {
//     const { Component, pageProps } = this.props
//     return (
//       <Web3Provider>
//         <Component {...pageProps} />
//       </Web3Provider>
//     )
//   }
// }

// export default MyApp


import '../styles/globals.css'
import { Web3Provider } from '../context/Web3'

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  )
}

export default MyApp
