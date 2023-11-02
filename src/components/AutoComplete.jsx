import React, { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

library.add(faMagnifyingGlass,faXmark); // Add the icons you want to use

export const AutoComplete = () => {
    const [nameValues, setNameValues] = useState("");
    const [nameList, setNameList] = useState([]);

    //To get input values
    const handleChange = (event) => {
        setNameValues(event.target.value);
    };
    console.log(nameValues);

    //to fetch data
    const API_URL = "https://dummyjson.com/products/search";

    const fetchNames = async () => {
        try {
            const response = await axios(API_URL, {
                params: {
                    q: nameValues,
                },
            });
            setNameList(response.data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (nameValues) {
                fetchNames();
            }
        }, 3000);
        console.log("mount");
        return () => {
            clearTimeout(timeOut);
            console.log("unmount");
        };
    }, [nameValues]);


    //close
    const closeHandler=()=>{
        setNameValues("")
        setNameList([])
    }
    return (
        <div className="autocomplete">
            <h2>Search the Product</h2>
            <input type="text" className="searchInput" onChange={handleChange} value={nameValues}/>
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
            <span onClick={closeHandler}><FontAwesomeIcon className="closeIcon" icon={faXmark}/></span>
            <ul>
                {nameList.map((item, index) => (
                    <li key={index}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};
