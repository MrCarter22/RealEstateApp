import { useState, useEffect } from "react"
import PropertyCard from "../components/PropertyCard"
import SearchFilters from "../components/SearchFilters"
import { getProperties } from "../api/properties"
import './Properties.css'

function Properties() {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [lowestPrice, setLowestPrice] = useState("")
    const [highestPrice, setHighestPrice] = useState("")
    const [bedrooms, setBedrooms] = useState("")
    const [bathrooms, setBathrooms] = useState("")
    const [sqft, setSqft] = useState("")
    const [propertyType, setPropertyType] = useState("all")

    useEffect(() => {
        getProperties()
            .then(setProperties)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    const filteredProperties = properties.filter(property => {
    const query = searchQuery.trim().toLowerCase()
    return (
        (query === "" || property.address.toLowerCase().includes(query) || property.city.toLowerCase().includes(query)) &&
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
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            lowestPrice={lowestPrice} setLowestPrice={setLowestPrice}
            highestPrice={highestPrice} setHighestPrice={setHighestPrice}
            bedrooms={bedrooms} setBedrooms={setBedrooms}
            bathrooms={bathrooms} setBathrooms={setBathrooms}
            sqft={sqft} setSqft={setSqft}
            propertyType={propertyType} setPropertyType={setPropertyType}
        />

        {loading && <p>Loading properties...</p>}
        {error && <p>Couldn't load properties: {error}</p>}

        {!loading && !error && (
            <div className="propertyGrid">
                {filteredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        )}
    </div>

  )

}

export default Properties