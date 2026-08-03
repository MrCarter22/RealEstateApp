import { Link } from 'react-router-dom'
import './PropertyCard.css'

function PropertyCard({ property }) {
  return (
    <Link to={`/property-detail/${property.id}`} className="propertyCardLink">
        <div className="propertyCard">
        <img src={property.image} alt={property.address} />
        <h3>{property.address}</h3>
        <p>{property.city} {property.zip}</p>
        <p>{property.bedrooms ?? "N/A"} beds | {property.bathrooms ?? "N/A"} baths | {property.sqft ? property.sqft.toLocaleString() : "N/A"} sqft</p>
        <p>{property.price ? `$${property.price.toLocaleString()}` : "Price N/A"}</p>
        </div>
    </Link>
  )
}

export default PropertyCard