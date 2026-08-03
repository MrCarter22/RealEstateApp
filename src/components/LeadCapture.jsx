import { useState } from "react"
import { submitLead } from "../api/leads"

function LeadCapture() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("")
    try {
      await submitLead({ name, email, phone, message })
      setStatus("success")
      setName("")
      setEmail("")
      setPhone("")
      setMessage("")
    } catch (err) {
      setStatus(err.message || "Something went wrong. Please try again.")
    }
  }

  return (
    <div>
      <h2>Get in Touch</h2>
      <p>Fill out the form below and we'll get back to you as soon as possible.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="tel" placeholder="Your Number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        <textarea placeholder="Your Message" rows="3" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        <button type="submit">Send Message</button>
      </form>
      {status === "success" && <p>Thanks! We'll be in touch soon.</p>}
      {status && status !== "success" && <p>{status}</p>}
    </div>
  )
}

export default LeadCapture
