import { useState } from "react"
import PropertyCard from "../components/PropertyCard"
import SearchFilters from "../components/SearchFilters"
import mockProperties from "../data/mockProperties"
import './Properties.css'

function Properties() {
    const [lowestPrice, setLowestPrice] = useState("")
    const [highestPrice, setHighestPrice] = useState("")
    const [bedrooms, setBedrooms] = useState("")
    const [bathrooms, setBathrooms] = useState("")
    const [sqft, setSqft] = useState("")
    const [propertyType, setPropertyType] = useState("all")

    const filteredProperties = mockProperties.filter(property => {
    return (
        (lowestPrice === "" || property.price >= Number(lowestPrice)) &&
        (highestPrice === "" || property.price <= Number(highestPrice)) &&
        (bedrooms === "" || property.bedrooms >= Number(bedrooms)) &&
        (bathrooms === "" || property.bathrooms >= Number(bathrooms)) &&
        (sqft === "" || property.sqft >= Number(sqft)) &&
        (propertyType === "all" || property.type === propertyType)
    )
})

  return (
    <div className="propertiesPage">
        <SearchFilters 
            lowestPrice={lowestPrice} setLowestPrice={setLowestPrice}
            highestPrice={highestPrice} setHighestPrice={setHighestPrice}
            bedrooms={bedrooms} setBedrooms={setBedrooms}
            bathrooms={bathrooms} setBathrooms={setBathrooms}
            sqft={sqft} setSqft={setSqft}
            propertyType={propertyType} setPropertyType={setPropertyType}
        />

        <div className="propertyGrid">
            {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    </div>

  )
  
}

export default Properties