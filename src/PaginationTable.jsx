import React, { useState, useEffect } from "react";

const PaginationTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to show per page
    const totalPages = Math.ceil(data.length / itemsPerPage); // Total pages

    // Fetch data from the API (JSONPlaceholder)
    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/users")
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.log("Error fetching data:", error));
    }, []);

    // Function to handle the slicing of data based on the page
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Function to navigate to the previous page
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Function to navigate to the next page
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Function to go to a specific page
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    // Function to render page numbers with ellipses when necessary
    const renderPageNumbers = () => {
        const pages = [];

        // Always display the first page
        if (currentPage > 2) {
            pages.push(1);
            if (currentPage > 3) {
                pages.push("...");
            }
        }

        // Display the previous, current, and next page
        for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
            pages.push(i);
        }

        // Always display the last page
        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                pages.push("...");
            }
            pages.push(totalPages);
        }

        return pages;
    };

    // Calculate number of empty rows to add
    const getEmptyRowsCount = () => {
        const totalDisplayedRows = paginatedData.length;
        return itemsPerPage - totalDisplayedRows;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-4">
            <h1 className="text-3xl mb-6">Pagination Table</h1>
            <h1 className="text-3xl mb-6">User details</h1>

            <table className="bg-zinc-700">
                <thead>
                    <tr className="text-left bg-teal-600">
                        <th style={{ width: '150px' }} className="py-2 px-4 border-2">ID</th>
                        <th style={{ width: '300px' }} className="py-2 px-4 border-2">Name</th>
                        <th style={{ width: '350px' }} className="py-2 px-4 border-2">Email</th>
                        <th style={{ width: '300px' }} className="py-2 px-4 border-2">Password</th>
                        <th style={{ width: '300px' }} className="py-2 px-4 border-2">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item) => (
                        <tr key={item.id}>
                            <td className="py-2 px-4 border-2">{item.id}</td>
                            <td className="py-2 px-4 border-2">{item.name}</td>
                            <td className="py-2 px-4 border-2">{item.email}</td>
                            <td className="py-2 px-4 border-2">{item.password}</td>
                            <td className="py-2 px-4 border-2">{item.role}</td>
                        </tr>
                    ))}

                    {/* Add empty rows if needed */}
                    {Array.from({ length: getEmptyRowsCount() }, (_, index) => (
                        <tr key={`empty-${index}`} className="border-b">
                            <td className="py-2 px-4 border-b">&nbsp;</td>
                            <td className="py-2 px-4 border-b">&nbsp;</td>
                            <td className="py-2 px-4 border-b">&nbsp;</td>
                            <td className="py-2 px-4 border-b">&nbsp;</td>
                            <td className="py-2 px-4 border-b">&nbsp;</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 mx-1 ${currentPage === 1 ? "bg-zinc-700" : "bg-orange-600"
                        } rounded text-white`}
                >
                    Previous
                </button>

                {/* Page Numbers */}
                {renderPageNumbers().map((page, index) =>
                    typeof page === "number" ? (
                        <button
                            key={index}
                            onClick={() => handlePageClick(page)}
                            className={`px-3 py-1 mx-1 ${page === currentPage ? "bg-orange-600" : "bg-zinc-700"
                                } rounded text-white`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="px-3 py-1 mx-1 bg-zinc-700 rounded">
                            {page}
                        </span>
                    )
                )}

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 mx-1 ${currentPage === totalPages ? "bg-zinc-700" : "bg-orange-600"
                        } rounded text-white`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationTable;
