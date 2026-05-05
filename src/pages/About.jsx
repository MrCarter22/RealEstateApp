import { Link } from "react-router-dom"
import './About.css'

function About() {
  return (
    <div className="aboutPage">
      <h1>About Me</h1>
        <p>Hi! I am your real estate agent with 5 years of experience in the industry.
        I am passionate about helping clients find their dream homes and providing exceptional service throughout the buying or selling process.
        I specialize in both selling and renting houses in the Greater Houston area. I am dedicated to making your real estate experience smooth and successful. Whether you're a first-time homebuyer, looking to sell your property, or searching for the perfect rental, I am here to assist you every step of the way.
        Let's work together to achieve your real estate goals!
        </p>

        <div className="stats">
          <p><strong>Experience:</strong> 5 years</p>
          <p><strong>Properties Sold:</strong> 5+</p>
          <p><strong>Client Satisfaction:</strong> 98%</p>
        </div>

        <div className="btnRow">
          <Link to="/contact" className="btn">Contact Me</Link>
          <Link to="/schedule" className="btn">Schedule a Consultation</Link>
        </div>

        <div className="testimonials">
          <h2>Client Testimonials</h2>
          <div className="testimonialCard">
            <p>"I had a fantastic experience working with this agent. They were knowledgeable, responsive, and helped me find the perfect home!" - Jane D.</p>
          </div>
          <div className="testimonialCard">
            <p>"Selling my house was a breeze thanks to this agent's expertise and dedication. Highly recommend!" - John S.</p>
          </div>
          <div className="testimonialCard">
            <p>"I found the ideal rental property with the help of this agent. They made the process easy and stress-free." - Sarah L.</p>
          </div>
        </div>      
    </div>
  ) 
}

export default About