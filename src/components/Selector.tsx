import React from 'react';
import { useState } from 'react';

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
                            className="text-center text-[#cc6c5c] font-semibold hover:bg-[#cc6c5c] hover:text-[#f9b49b] transition-all duration-75"
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
                className={`bg-[#f9b49b] cursor-pointer pb-1 w-32 h-max font-bold text-[#cc6c5c] border-2 border-solid border-[#cc6c5c] rounded-xl text-center duration-150 transition-all ${mouseDown ? 'scale-100' : 'hover:scale-105'}`}
            >
                {selectedCategory}
            </div>
            <div
                className={`absolute bg-[#f9b49b] border-2 border-solid border-[#cc6c5c] rounded-xl text-center duration-150 transition-all origin-top ${showSelector ? 'scale-100' : 'scale-0'}`}
            >
                {listCategory()}
            </div>
        </div>
    );
}

export default Selector;