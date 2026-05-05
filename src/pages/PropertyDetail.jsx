import { useParams } from "react-router-dom"
import  mockProperties  from "../data/mockProperties"
import './PropertyDetail.css'

function PropertyDetail() {

    const { id } = useParams()
    const property = mockProperties.find(p => p.id === Number(id))   


    if (!property) {
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
          <p className="quickInfo">{property.bedrooms} beds | {property.bathrooms} baths | {property.sqft.toLocaleString()} sqft</p>
          <p className="price">${property.price.toLocaleString()}</p>
        </div>

        <div className="gridContainer">
          <div className="propertySpecs">
            <h3>Specs</h3>
            <div className="specsList">
              <div className="specItem">
                <span className="specLabel">Year Built:</span>
                <span className="specValue">{property.yearBuilt}</span>
              </div>
              <div className="specItem">
                <span className="specLabel">Type:</span>
                <span className="specValue">{property.type === "sale" ? "For Sale" : "For Rent"}</span>
              </div>
              <div className="specItem">
                <span className="specLabel">Stories:</span>
                <span className="specValue">{property.stories}</span>
              </div>
              <div className="specItem">
                <span className="specLabel">Garage:</span>
                <span className="specValue">{property.garage}</span>
              </div>
              <div className="specItem">
                <span className="specLabel">Square Footage:</span>
                <span className="specValue">{property.sqft.toLocaleString()}</span>
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