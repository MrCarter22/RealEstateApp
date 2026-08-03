import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getLeads, deleteLead } from "../api/leads"
import { getConsultations, deleteConsultation } from "../api/consultations"
import { logout } from "../api/auth"
import './AgentDashboard.css'

function formatDate(isoDateString) {
  if (!isoDateString) return "N/A"
  return new Date(isoDateString).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatTime(timeString) {
  if (!timeString) return "N/A"
  const [hoursStr, minutesStr] = timeString.split(":")
  const hours = parseInt(hoursStr, 10)
  const period = hours >= 12 ? "PM" : "AM"
  const displayHours = hours % 12 === 0 ? 12 : hours % 12
  return `${displayHours}:${minutesStr} ${period}`
}

function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("leads")
  const [leads, setLeads] = useState([])
  const [consultations, setConsultations] = useState([])
  const [error, setError] = useState("")
  const [confirmLeadId, setConfirmLeadId] = useState(null)
  const [confirmConsultationId, setConfirmConsultationId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([getLeads(), getConsultations()])
      .then(([leadsData, consultationsData]) => {
        setLeads(leadsData)
        setConsultations(consultationsData)
      })
      .catch((err) => {
        setError(err.message)
        if (err.message.includes("Invalid") || err.message.includes("Missing")) {
          logout()
          navigate("/agent-login")
        }
      })
  }, [navigate])

  const handleLogout = () => {
    logout()
    navigate("/agent-login")
  }

  const handleDiscardLead = async (id) => {
    try {
      await deleteLead(id)
      setLeads(leads.filter(lead => lead.id !== id))
      setConfirmLeadId(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDiscardConsultation = async (id) => {
    try {
      await deleteConsultation(id)
      setConsultations(consultations.filter(consultation => consultation.id !== id))
      setConfirmConsultationId(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="agentDashboardPage">
      <h1>Agent Dashboard</h1>
      <button onClick={handleLogout}>Log Out</button>

      {error && <p>{error}</p>}

      <section className = "statBanner">
            <div className="stat">
                <h2>{leads.length}</h2>
                <p>Leads</p>
            </div>
            <div className="stat">
                <h2>{consultations.length}</h2>
                <p>Consultations</p>
            </div>
        </section>

      <div className="tabs">

        <button onClick={() => setActiveTab("leads")} className={activeTab === "leads" ? "active" : ""}>Leads</button>
        <button onClick={() => setActiveTab("consultations")} className={activeTab === "consultations" ? "active" : ""}>Consultations</button>
      </div>

      <div className="tabContent">
        {activeTab === "leads" && (
          <div>
            <h2>Leads</h2>
            <ul>
              {leads.map(lead => (
                <li key={lead.id}>
                  <div className="itemInfo">
                    <span className="itemSummary">{lead.name} - {lead.email} - {lead.phone}</span>
                    {lead.message && <p className="itemMessage">"{lead.message}"</p>}
                  </div>
                  {confirmLeadId === lead.id ? (
                    <span className="confirmActions">
                      <button onClick={() => handleDiscardLead(lead.id)}>Confirm</button>
                      <button onClick={() => setConfirmLeadId(null)}>Cancel</button>
                    </span>
                  ) : (
                    <button onClick={() => setConfirmLeadId(lead.id)}>Discard</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === "consultations" && (
          <div>
            <h2>Consultations</h2>
            <ul>
              {consultations.map(consultation => (
                <li key={consultation.id}>
                  <div className="itemInfo">
                    <span className="itemSummary">
                      {consultation.name} - {consultation.email} - {consultation.phone} - {formatDate(consultation.date)} at {formatTime(consultation.time)}
                    </span>
                    {consultation.message && <p className="itemMessage">"{consultation.message}"</p>}
                  </div>
                  {confirmConsultationId === consultation.id ? (
                    <span className="confirmActions">
                      <button onClick={() => handleDiscardConsultation(consultation.id)}>Confirm</button>
                      <button onClick={() => setConfirmConsultationId(null)}>Cancel</button>
                    </span>
                  ) : (
                    <button onClick={() => setConfirmConsultationId(consultation.id)}>Discard</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  )
}

export default AgentDashboard
