import React from 'react';
import { useState } from 'react';

function Selector({selectedCategory, setSelectedCategory, currentCategory, setCurrentCategory }: {selectedCategory: string, setSelectedCategory: (category: string) => void, currentCategory: string, setCurrentCategory: (category: string) => void}){
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
                                setCurrentCategory(item)
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
                {currentCategory}
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