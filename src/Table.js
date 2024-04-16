import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
function Table({ data }) {
    const column = ['id', 'title', 'description', 'price', 'discountPercentage', 'rating', 'stock', 'brand', 'category'];
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [debounceQuery, setDebounceQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [selectedColumns, setSelectedColumns] = useState([...column].reduce((acc, val) => { acc[val] = true; return acc; }, {}));
    const [priceFilterEnabled, setPriceFilterEnabled] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    const handleSort = (columnName) => {
        if (sortColumn === columnName) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(columnName);
            setSortOrder("asc");
        }
    };

    const totalResults = data?.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const currentPageData = data?.slice(startIndex, endIndex);

    const filteredData = currentPageData?.filter((item) =>
        Object.values(item).some((value) =>
            new RegExp(debounceQuery, "i").test(value)
        )
    );

    const sortedData = filteredData?.slice().sort((a, b) => {
        if (sortColumn) {
            if (sortOrder === "asc") {
                return a[sortColumn] > b[sortColumn] ? 1 : -1;
            } else {
                return a[sortColumn] < b[sortColumn] ? 1 : -1;
            }
        }
        return 0;
    });
    const priceFilteredData = priceFilterEnabled
        ? sortedData?.filter(item => item.price >= minPrice && item.price <= maxPrice)
        : sortedData;

    return (
        <div>
            <Header resultsPerPage={resultsPerPage}
                setResultsPerPage={setResultsPerPage}
                setCurrentPage={setCurrentPage}
                selectedColumns={selectedColumns}
                setSelectedColumns={setSelectedColumns}
                setPriceFilterEnabled={setPriceFilterEnabled}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceFilterEnabled={priceFilterEnabled}
                setDebounceQuery={setDebounceQuery}
            />
            {data ? (
                <div className="my_table">
                    <table class="table table-bordered table-success table-striped table-hover">
                        <thead>
                            <tr>
                                {Object.entries(selectedColumns).map(([columnName, isChecked]) => isChecked && (
                                    <th scope="col" key={columnName} onClick={() => handleSort(columnName)}>{columnName}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {priceFilteredData?.map((item) => (
                                <tr key={item.id}>
                                    {Object.entries(selectedColumns).map(([columnName, isChecked]) => isChecked && (
                                        <td key={columnName}>{item[columnName]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Footer currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages} />
        </div>
    );
}
export default Table;
