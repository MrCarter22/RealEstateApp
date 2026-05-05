import PropertyCard from "../components/PropertyCard";
import LeadCapture from "../components/LeadCapture";
import { Link } from "react-router-dom";
import mockProperties from "../data/mockProperties";
import './Home.css'
import { useState, useEffect } from "react";

function StatCounter({ target }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const increment = target / 200
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev < target) {
          return Math.ceil(prev + increment)
        } else {
          clearInterval(timer)
          return target
        }
      })
    }, 10)
    return () => clearInterval(timer)
  }, [target])

  return <span>{count.toLocaleString()}</span>
}

function Home() {
    return (
        <>        
          <section className="hero">
            <div className="heroContent">
                <h1>Find Your Dream Home</h1>
                <img src="/images/hero.jpg" alt="Dream Home" className="heroImage" />
                <p>Explore the best properties in town with us. Your perfect home is just a click away.</p>
                <Link to="/properties" className="btn">Browse Properties</Link>
            </div>    
        </section>

        <section className = "statBanner">
            <div className="stat">
                <h2><StatCounter target={50} />+</h2>
                <p>Homes Sold</p>
            </div>
            <div className="stat">
                <h2><StatCounter target={5} />+</h2>
                <p>Years Experience</p>
            </div>
            <div className="stat">
                <h2><StatCounter target={98} />%</h2>
                <p>Client Satisfaction</p>
            </div>
        </section>

        <section className = "featuredProperties">
            <h2>Featured Properties</h2>
            <div className="propertyGrid">
                {mockProperties.slice(0, 4).map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

        </section>

        <section className = "leadCapture">
            <LeadCapture />
        </section>
       
        </>
    )

}

export default Home;