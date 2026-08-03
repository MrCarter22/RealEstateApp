import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../api/auth"
import './Schedule.css'

function AgentLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await login(email, password)
      navigate("/agent-dashboard")
    } catch (err) {
      setError(err.message || "Login failed")
    }
  }

  return (
    <div className="schedulePage">
      <div className="scheduleForm">
        <h2>Agent Login</h2>
        <form className="contactForm" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="password">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">Log In</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default AgentLogin
