import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProperty } from "../api/properties"
import './PropertyDetail.css'

function PropertyDetail() {

    const { id } = useParams()
    const [property, setProperty] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        getProperty(id)
            .then(setProperty)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error || !property) {
        return <div>Property not found</div>
    }

  return (
    <>

      <div className="propertyDetailPage">
        <h1>Property Detail</h1>
        <img src={property.image} alt={property.address} />

        <div className="propertyHeader">
          <h2>{property.address}</h2>
          <p className="location">{property.city} {property.zip}</p>
          <p className="quickInfo">{property.bedrooms ?? "N/A"} beds | {property.bathrooms ?? "N/A"} baths | {property.sqft ? property.sqft.toLocaleString() : "N/A"} sqft</p>
          <p className="price">{property.price ? `$${property.price.toLocaleString()}` : "Price N/A"}</p>
        </div>

        <div className="gridContainer">
          <div className="propertySpecs">
            <h3>Specs</h3>
            <div className="specsList">
              <div className="specItem">
                <span className="specLabel">Year Built:</span>
                <span className="specValue">{property.yearBuilt ?? "N/A"}</span>
              </div>
              <div className="specItem">
                <span className="specLabel">Type:</span>
                <span className="specValue">{property.type === "sale" ? "For Sale" : "For Rent"}</span>
              </div>
              <div className="specItem">
                <span className="specLabel">Stories:</span>
                <span className="specValue">{property.stories ?? "N/A"}</span>
              </div>
              <div className="specItem">
                <span className="specLabel">Garage:</span>
                <span className="specValue">{property.garage ?? "N/A"}</span>
              </div>
              <div className="specItem">
                <span className="specLabel">Square Footage:</span>
                <span className="specValue">{property.sqft ? property.sqft.toLocaleString() : "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>
        </div>
      </div>
    </>
  )

}

export default PropertyDetail
