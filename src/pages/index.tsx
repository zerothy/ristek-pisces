import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";

import { TbTriangleInvertedFilled } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const inter = Inter({ subsets: ["latin"] });

const HomeHeader: React.FC = () => {
  const [mouseDown, setMouseDown] = useState(false);
  const handleMouseDown = () => setMouseDown(true);

  const [receiveMouseDown, setReceiveMouseDown] = useState(false);
  const handleReceiveMouseDown = () => setReceiveMouseDown(true);
  const handleReceiveMouseUp = () => setReceiveMouseDown(false);

  const [spendMouseDown, setSpendMouseDown] = useState(false);
  const handleSpendMouseDown = () => setSpendMouseDown(true);
  const handleSpendMouseUp = () => setSpendMouseDown(false);

  const [showModal, setShowModal] = useState(false);

  const [value, setValue] = useState<number>(NaN);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return setValue(NaN);
    if (parseInt(e.target.value) < 0) return setValue(NaN);
    if (parseInt(e.target.value) > 1000000000) return setValue(1000000000);
    setValue(parseInt(e.target.value));
  };

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div>
      {/* Assign Button */}
      <div 
        draggable={false}
        onMouseDown={handleMouseDown}
        onMouseUp={() => setMouseDown(false)}
        onClick={toggleModal}
        className={`bg-green-500 w-max py-2 pl-4 pr-5 font-monserrat font-extrabold rounded-md cursor-pointer duration-150 transition-all ${mouseDown ? 'scale-100' : 'hover:scale-105'}`}
      >
            Assign
            <TbTriangleInvertedFilled className={`inline-block w-[0.7rem] ml-2 mb-1 ${showModal && 'rotate-180'} transition-all duration-300`}/>
      </div>

      {/* Modal */}
      <div 
        onClick={toggleModal}
        className={`bg-slate-950 z-10 fixed top-0 left-0 flex justify-center w-full h-full items-center align-middle bg-opacity-70 ${showModal ? 'scale-100' : 'scale-0'} transition-all`}
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="w-max h-max p-6 bg-gradient-to-br from-[#010048af] via-[#020078b2] to-[#0805adaf] rounded-xl border-4 border-[#ffc900] border-solid border-opacity-40 flex justify-center items-center"
        > 
          <div className="absolute mr-[16rem] mb-[6.6rem] text-white font-monserrat font-bold text-md">Amount</div>
          <div className="flex flex-col items-center">
            <input
              placeholder="Rp 0,00"
              className="bg-slate-500 rounded-xl px-3 pt-8 pb-3 outline-none font-monserrat font-extrabold text-2xl text-white no-spinners"
              type="Number"
              onChange={handleInputChange}
              value={value}
              max={1000000000}
            />
            <div className="flex justify-evenly p-4 w-full"> 
              <div onMouseDown={handleReceiveMouseDown} onMouseUp={handleReceiveMouseUp} className={`bg-[#9092ff] text-gray-900 duration-150 cursor-pointer transition-all py-2 px-4 font-monserrat font-bold rounded-3xl ${receiveMouseDown ? 'scale-100' : 'hover:scale-105'}`}>
                <IoMdCheckmarkCircleOutline className="inline-block mb-[0.2rem] mr-2" />
                Receive
              </div>
              <div onMouseDown={handleSpendMouseDown} onMouseUp={handleSpendMouseUp} className={`bg-[#575899] text-slate-200 duration-150 cursor-pointer transition-all pl-4 py-2 pr-5 font-monserrat font-bold rounded-3xl ${spendMouseDown ? 'scale-100' : 'hover:scale-105'}`}>
                <RiMoneyDollarCircleLine className="inline-block mb-[0.2rem] mr-2 text-xl" />
                Spend
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  
  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className="bg-[#03002e] w-[82%]">
      <div className="flex justify-center p-2 border-b-2 border-[#ffc900] border-solid border-opacity-40">
        <div onClick={toggleModal}>
          <HomeHeader />
        </div>
      </div>
      
    </div>
  );
}