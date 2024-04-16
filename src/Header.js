import React from 'react'
import { useState } from 'react';
const Header = ({ resultsPerPage, setResultsPerPage,
    setCurrentPage, selectedColumns, setSelectedColumns, setPriceFilterEnabled, setMinPrice,
    setMaxPrice, minPrice, maxPrice, priceFilterEnabled, setDebounceQuery }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const column = ['id', 'title', 'description', 'price', 'discountPercentage', 'rating', 'stock', 'brand', 'category'];

    const handleResultsPerPageChange = (val) => {
        setResultsPerPage(parseInt(val, 10));
        setCurrentPage(1);
    };

    const handleColumnChange = (columnName) => {
        setSelectedColumns(prevState => ({
            ...prevState,
            [columnName]: !prevState[columnName]
        }));
    };
    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };
    const debouncedHandleSearch = debounce((value) => {
        setDebounceQuery(value);
    }, 500);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        debouncedHandleSearch(value);
    };

    return (

        <div className="header_flex">
            <div className="dropdown">
                <button className="entries btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Entries per page: {resultsPerPage}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><button className="dropdown-item" type="button" onClick={() => handleResultsPerPageChange(5)}>5</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => handleResultsPerPageChange(10)}>10</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => handleResultsPerPageChange(20)}>20</button></li>
                </ul>
            </div>
            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Select columns to display
            </button>
            <ul className="dropdown-menu option_menu" aria-labelledby="dropdownMenuButton">
                {column.map((columnName) => (
                    <li key={columnName}>
                        <label class="form-check-label">
                            <input
                                class="form-check-input checkbox"
                                type="checkbox"
                                value={columnName}
                                checked={selectedColumns[columnName]}
                                onChange={() => handleColumnChange(columnName)}
                            />
                            {columnName}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
        <input
                className="search_input"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
            />
            <div>
                <label class="form-check-label">
                    <input
                        type="checkbox"
                        checked={priceFilterEnabled}
                        onChange={(e) => setPriceFilterEnabled(e.target.checked)}
                        class="form-check-input"
                    />
                    Price Range:
                </label>
                
                    <div class="min_max_input input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Min</span>
                        <input
                            disabled={!priceFilterEnabled}
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(parseInt(e.target.value))}
                        />
                        <span class="input-group-text" id="inputGroup-sizing-sm">Max</span>
                        <input
                            disabled={!priceFilterEnabled}
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        />
                    </div>
               
            </div>
            
        </div>
    )
}

export default Header