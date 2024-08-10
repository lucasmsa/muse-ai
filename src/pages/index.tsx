import HomePage from '../components/pages/home-page'
import { CounterStoreProvider } from '../providers/counter-store-provider'

export default function Home() {
  return (
    <CounterStoreProvider>
      <HomePage />
    </CounterStoreProvider>
  )
}
