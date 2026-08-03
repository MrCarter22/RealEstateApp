import { FaPhone, FaEnvelope, FaIdCard } from "react-icons/fa"
import LeadCapture from "../components/LeadCapture"
import './Contact.css'

function Contact() {
  return (
    <div className="contactPage">
      <div className="agentCard">
        <h1>Deric Carter</h1>
        <p className="agentTitle">Real Estate Agent — Greater Houston Area</p>

        <div className="agentCardDetails">
          <p><FaPhone /> (281)-744-2361</p>
          <p><FaEnvelope /> dericcarter@hotmail.com</p>
          <p><FaIdCard /> License #744536</p>
        </div>
      </div>

      <section className="leadCapture">
        <LeadCapture />
      </section>
    </div>
  )
}

export default Contact
