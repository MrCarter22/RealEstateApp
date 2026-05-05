import {useState} from "react"
import mockConsultations from "../data/mockConsultations"
import mockLeads from "../data/mockLeads"
import './AgentDashboard.css'

function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("leads")
  return (
    <div className="agentDashboardPage">
      <h1>Agent Dashboard</h1>

      <section className = "statBanner">
            <div className="stat">
                <h2>{mockLeads.length}</h2>
                <p>Leads</p>
            </div>
            <div className="stat">
                <h2>{mockConsultations.length}</h2>
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
              {mockLeads.map(lead => (
                <li key={lead.id}>{lead.name} - {lead.email} - {lead.phone}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === "consultations" && (
          <div>
            <h2>Consultations</h2>
            <ul>
              {mockConsultations.map(consultation => (
                <li key={consultation.id}>{consultation.name} - {consultation.email} - {consultation.phone} - {consultation.date} at {consultation.time}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  ) 
}

export default AgentDashboard