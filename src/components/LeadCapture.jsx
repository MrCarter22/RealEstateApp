import { useState } from "react"
function LeadCapture() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
  e.preventDefault() // stops page from refreshing
  console.log({ name, email, phone, message }) // for now, just log the form data to the console
  setName("")
  setEmail("")
  setPhone("")
  setMessage("")
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
    </div>
  )
}

export default LeadCapture