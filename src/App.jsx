import Scene from './components/Scene'
import Navigation from './components/Navigation'
import HeroOverlay from './components/HeroOverlay'
import InfoPanel from './components/InfoPanel'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <Scene />
      <HeroOverlay />
      <Navigation />
      <InfoPanel />
    </div>
  )
}
