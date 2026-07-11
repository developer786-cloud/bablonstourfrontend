import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import FloatingContactButtons from '../../components/common/FloatingContactButtons'
import SeoHead from '../../components/common/SeoHead'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <SeoHead />
      <Navbar />
      <main id="main-content" className="app-main flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingContactButtons />
    </div>
  )
}

export default MainLayout
