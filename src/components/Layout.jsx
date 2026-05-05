import Navbar from "./Navbar"
import Footer from "./Footer"

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pageContent">
      {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout