import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateButton({selectedDate, setSelectedDate}: {selectedDate: Date, setSelectedDate: (date: Date) => void}){
    

    return (
        <div>
            <DatePicker 
                selected={selectedDate} 
                onChange={(date) => date && setSelectedDate(date)}
                className="text-[#32288b] bg-[#1E90FF] font-bold w-36 text-center border-2 border-[#32288b] outline-none rounded-xl py-[0.15rem]"
             />
        </div>
    );
}

export default DateButton