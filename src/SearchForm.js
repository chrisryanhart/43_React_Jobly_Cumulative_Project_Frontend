import e from "cors";
import React, { useState } from "react";

function SearchForm({extractSearchInput}){
    const INITIAL_STATE = {'value': ''};
    const [searchFormData, setSearchFormData] = useState(INITIAL_STATE);
    // if logged out, show login/sign up links
    const handleChange = (e) => {
        const searchInput = e.target.value;
        setSearchFormData({'value': searchInput});

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        extractSearchInput(searchFormData);
        setSearchFormData(INITIAL_STATE);
    }

    console.log(searchFormData);
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="search" 
                placeholder="Enter search term..."
                onChange={handleChange} 
                value={searchFormData.name}
            />
            <button>Submit</button>
        </form>

    );
}

export default SearchForm;