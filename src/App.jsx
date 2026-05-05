import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import AgentDashboard from "./pages/AgentDashboard"
import Contact from "./pages/Contact"
import Properties from "./pages/Properties"
import PropertyDetail from "./pages/PropertyDetail"
import Schedule from "./pages/Schedule"
import About from "./pages/About"
import Layout from "./components/Layout";

function App() {

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%' }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/contact" element= {<Layout><Contact /></Layout>} />
        <Route path="/properties" element={<Layout><Properties /></Layout>} />
        <Route path="/property-detail/:id" element={<Layout><PropertyDetail /></Layout>} />
        <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;