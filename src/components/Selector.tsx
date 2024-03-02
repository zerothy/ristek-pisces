import React from 'react';
import { useState } from 'react';

import { IoFastFoodOutline } from "react-icons/io5"; //<IoFastFoodOutline />
import { GiClothes } from "react-icons/gi"; //<GiClothes />
import { FaCar } from "react-icons/fa"; //<FaCar />
import { TbBuildingCircus } from "react-icons/tb";//<TbBuildingCircus />
import { FaRegHospital } from "react-icons/fa"; //<FaRegHospital />
import { FaSchoolFlag } from "react-icons/fa6"; //<FaSchoolFlag />
import { BsThreeDots } from "react-icons/bs"; //<BsThreeDots />


function Selector({selectedCategory, setSelectedCategory}: {selectedCategory: string, setSelectedCategory: (category: string) => void}){
    const category = ["Food", "Clothes", "Transportation", "Entertainment", "Health", "Education", "Others"];

    const [mouseDown, setMouseDown] = useState(false)

    const [showSelector, setShowSelector] = useState(false)

    const toggleSelector = () => {
        setShowSelector(!showSelector)
    }

    const listCategory = () => {
        return (
            <div>
                {category.map((item, index) => {
                    return (
                        <div 
                            key={index} 
                            className="text-center text-[#32288b] font-semibold hover:bg-[#32288b] hover:text-[#1E90FF] transition-all duration-75 cursor-pointer"
                            onClick={() => {
                                toggleSelector()
                                setSelectedCategory(item)
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
        <div>
            <div 
                onClick={toggleSelector}
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
                className={`bg-[#1E90FF] cursor-pointer pb-1 w-32 h-max font-bold text-[#32288b] border-2 border-[#32288b] border-solid rounded-xl text-center duration-150 transition-all ${mouseDown ? 'scale-100' : 'hover:scale-105'}`}
            >
                {selectedCategory}
            </div>
            <div
                className={`absolute bg-[#1E90FF] border-2 border-solid border-[#32288b] rounded-xl text-center duration-150 transition-all origin-top ${showSelector ? 'scale-100' : 'scale-0'}`}
            >
                {listCategory()}
            </div>
        </div>
    );
}

export default Selector;