import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Stub from './components/Stub.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import Watch from './pages/Watch.jsx'
import Talks from './pages/Talks.jsx'
import TalkCategory from './pages/TalkCategory.jsx'
import NewHere from './pages/NewHere.jsx'
import Prayer from './pages/Prayer.jsx'
import Join from './pages/Join.jsx'
import Events from './pages/Events.jsx'
import Bulletin from './pages/Bulletin.jsx'
import Giving from './pages/Giving.jsx'
import Departments from './pages/Departments.jsx'
import DepartmentDetail from './pages/DepartmentDetail.jsx'

const pages = [
  { path: '/gallery', title: 'Gallery' },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          <Route path="/watch" element={<Watch />} />
            <Route path="/talks" element={<Talks />} />
          <Route path="/talks/:slug" element={<TalkCategory />} />
            <Route path="/new-here" element={<NewHere />} />
          <Route path="/prayer" element={<Prayer />} />
            <Route path="/join" element={<Join />} />
            <Route path="/events" element={<Events />} />
            <Route path="/bulletin" element={<Bulletin />} />
            <Route path="/giving" element={<Giving />} />
          {pages.map((p) => (
            <Route key={p.path} path={p.path} element={<Stub title={p.title} />} />
          ))}
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:slug" element={<DepartmentDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}