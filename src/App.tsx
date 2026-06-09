import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Courses } from './pages/Courses'
import { Portal } from './pages/Portal'
import { Learn } from './pages/Learn'
import { useRoute } from './hooks/useRoute'

export default function App() {
  const route = useRoute()

  const page =
    route === 'about' ? (
      <About />
    ) : route === 'contact' ? (
      <Contact />
    ) : route === 'courses' ? (
      <Courses />
    ) : route === 'portal' ? (
      <Portal />
    ) : route === 'learn' ? (
      <Learn />
    ) : (
      <Home />
    )

  return (
    <div className="min-h-screen">
      <Navbar route={route} />
      <main>{page}</main>
      <Footer />
    </div>
  )
}
