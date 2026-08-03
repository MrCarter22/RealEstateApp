import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import AgentDashboard from "./pages/AgentDashboard"
import AgentLogin from "./pages/AgentLogin"
import Contact from "./pages/Contact"
import Properties from "./pages/Properties"
import PropertyDetail from "./pages/PropertyDetail"
import Schedule from "./pages/Schedule"
import About from "./pages/About"
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%' }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/agent-login" element={<Layout><AgentLogin /></Layout>} />
        <Route path="/agent-dashboard" element={<ProtectedRoute><AgentDashboard /></ProtectedRoute>} />
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