import { useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import api from "../pages/api/posts";
import axios from "axios";

function Filter({ selectedCategory, setSelectedCategory, showSelector, setShowSelector }: { selectedCategory: string, showSelector: boolean, setSelectedCategory: (category: string) => void, setShowSelector: (show: boolean) => void }) {
    const category = ["Food", "Clothes", "Transportation", "Entertainment", "Health", "Education", "Others"];

    const [mouseDown, setMouseDown] = useState(false)

    const toggleSelector = () => {
        setShowSelector(!showSelector)
    }

    const router = useRouter()
    const [filter, setFilter] = useState("")

    const fetchPosts = async () => {
        try {
            
            const url = `http://localhost:3000/?category=${selectedCategory || ""}`;
            router.push(url);
            const response = await api.get(url);

        } catch (err: any) {
            // handle error
            // Not in the 200 response range
            if (axios.isCancel(err)) {
                console.log('Request canceled', err.message);
            } else if (err.response) {
                // The request was made and the server responded with a status code
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if (err.request) {
                // The request was made but no response was received
                console.log(err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
        }
    }
    
    useEffect(() => {
        fetchPosts();
    }, [selectedCategory]);

    const listCategory = () => {
        return (
            <div>
                {category.map((item, index) => {
                    return (
                        <div 
                            key={index} 
                            className="text-left pl-2 py-1 text-slate-200 bg-[#03002e] font-semibold hover:bg-[#010057] hover:text-slate-200 transition-all duration-150 cursor-pointer "
                            onClick={() => {
                                setShowSelector(!showSelector)
                                setSelectedCategory(item)
                                console.log("selected category: " + selectedCategory)
                                fetchPosts()
                            }}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className={`w-44 mt-5 bg-[#010057] border-4 border-[#010057] rounded-lg transition-all origin-top duration-100 ${showSelector ? 'scale-100' : 'scale-0'}`}>
            <div className="font-semibold pl-2 pb-[0.25] pt-[0.25] cursor-default text-white">
                Filter By:
            </div>
            {listCategory()}
        </div>
    );
}

export default Filter;