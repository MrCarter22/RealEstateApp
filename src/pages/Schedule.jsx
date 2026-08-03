import { useState } from "react"
import { submitConsultation } from "../api/consultations"
import './Schedule.css'

function Schedule() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [meetingType, setMeetingType] = useState("inPerson")
  const [propertyType, setPropertyType] = useState("sale")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("")
    const data = { name, email, phone, date, time, meetingType, propertyType, message }
    try {
      await submitConsultation(data)
      setStatus("success")
      setName("")
      setEmail("")
      setPhone("")
      setDate("")
      setTime("")
      setMeetingType("inPerson")
      setPropertyType("sale")
      setMessage("")
    } catch (err) {
      setStatus(err.message || "Something went wrong. Please try again.")
    }
  }

  return (

    <div className="schedulePage">
      <div className="scheduleForm">
        <h2>Schedule a Showing</h2>
        <form className="contactForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label htmlFor="email">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="phone">Phone:</label>
          <input type="tel" value={phone} onChange= {(e) => setPhone(e.target.value)} required />

          <label htmlFor="date">Preferred Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

          <label htmlFor="time">Preferred Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

          <label htmlFor="meetingType">Meeting Type:</label>
          <select id="meetingType" name="meetingType" value={meetingType} onChange={(e) => setMeetingType(e.target.value)} required>
            <option value="inPerson">In-Person</option>
            <option value="virtual">Virtual</option>
          </select>

          <label htmlFor="type">Property Type:</label>
          <select id="type" name="type" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} required>
            <option value="sale">Buy</option>
            <option value="rent">Rent</option>
          </select>


          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

          <button type="submit">Submit</button>
        </form>
        {status === "success" && <p>Thanks! Your consultation request has been sent.</p>}
        {status && status !== "success" && <p>{status}</p>}
      </div>
    </div>

  )
}

export default Schedule;
