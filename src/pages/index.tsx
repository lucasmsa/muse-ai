import Head from 'next/head'
import '../styles/globals.css'
import Main from '../components/pages/main-page'
import { CounterStoreProvider } from '../providers/counter-store-provider'

export default function Home() {
  return (
    <CounterStoreProvider>
      <Head>
        <title>MUSE.ai coding test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </CounterStoreProvider>
  )
}
