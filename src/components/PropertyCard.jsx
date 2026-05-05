import { Link } from 'react-router-dom'
import './PropertyCard.css'

function PropertyCard({ property }) {
  return (
    <Link to={`/property-detail/${property.id}`} className="propertyCardLink">
        <div className="propertyCard">
        <img src={property.image} alt={property.address} />
        <h3>{property.address}</h3>
        <p>{property.city} {property.zip}</p>
        <p>{property.bedrooms} beds | {property.bathrooms} baths | {property.sqft.toLocaleString()} sqft</p>
        <p>${property.price.toLocaleString()}</p>
        </div>
    </Link>
  )
}

export default PropertyCard