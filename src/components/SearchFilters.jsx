
function SearchFilters({lowestPrice, setLowestPrice, highestPrice, setHighestPrice, bedrooms, setBedrooms, bathrooms, setBathrooms, sqft, setSqft, propertyType, setPropertyType}) {
  return (

    <div className="searchFilters">
        <h3>Search Filters</h3>
            <div className="filterGroup">
                <label>Min Price
                    <input type="number" value={lowestPrice} onChange={(e) => setLowestPrice(e.target.value)} />
                </label>
                <label>Max Price
                    <input type="number" value={highestPrice} onChange={(e) => setHighestPrice(e.target.value)} />
                </label>
                <label>Bedrooms
                    <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
                </label>
                <label>Bathrooms
                    <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
                </label>
                <label>Square Footage
                    <input type="number" value={sqft} onChange={(e) => setSqft(e.target.value)} />
                </label>
                <label>Property Type
                    <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                        <option value="all">All</option>
                        <option value="sale">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </label>
    </div>
    </div>
    )

}

export default SearchFilters