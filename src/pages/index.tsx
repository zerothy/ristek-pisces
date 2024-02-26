import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import React from "react";
import CurrencyInput, { CurrencyInputProps, CurrencyInputOnChangeValues } from 'react-currency-input-field';
import CurrencyInputValue from 'react-currency-input-field';

import { TbTriangleInvertedFilled } from "react-icons/tb";

const inter = Inter({ subsets: ["latin"] });

const HomeHeader = () => {
  const [mouseDown, setMouseDown] = useState(false);
  const handleMouseDown = () => setMouseDown(true);

  const [showModal, setShowModal] = useState(false);

  const [value, setValue] = useState<CurrencyInputProps>({
    value: 0,
    decimalsLimit: 2,
    intlConfig: { locale: 'id-ID', currency: 'IDR' },
    min: 0,
    onChange: (event) => {
      const newValue = event.target.value || 0;
      const formattedValue = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
      }).format(Number(newValue));

      setValue({
        ...value,
        value: newValue,
      });
    },
  });

  // TODO: FIX THIS FKIN CODE TO WORK 
  // const handleChange = (event: CurrencyInputOnChangeValues<number>) => {
  //   const newValue = event.value || 0;
  //   const formattedValue = new Intl.NumberFormat('id-ID', {
  //     style: 'currency',
  //     currency: 'IDR',
  //     minimumFractionDigits: 2,
  //   }).format(newValue);

  //   setValue({
  //     value: newValue,
  //     formattedValue: formattedValue,
  //     error: newValue < 0,
  //   });
  // };

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
          className="w-96 h-96 bg-[#010048] rounded-xl border-4 border-[#ffc900] border-solid border-opacity-40 flex justify-center items-center"
        >
          <CurrencyInput
            placeholder="Rp 0,00"
            className="bg-slate-500 text-center rounded-xl px-3 pt-3 pb-8 outline-none font-monserrat font-extrabold text-2xl text-white no-spinners"
            intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
            min={0}
            decimalsLimit={2}
          />
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