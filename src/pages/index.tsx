import { Inter } from "next/font/google";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import Selector from "../components/Selector";
import DateButton from "../components/DateButton";
import TransactionList from "../components/TransactionList";
import Filter from "../components/Filter";

import { TbTriangleInvertedFilled } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";

import api from "./api/posts";
import axios, {isCancel, AxiosError} from 'axios';

const inter = Inter({ subsets: ["latin"] });

//TODO: MAKE IT RESPONSIVE BRO

const HomeHeader: React.FC<{ newAmount: number, newType: string, setNewAmount: (value: number) => void, setNewType: (value: string) => void, setRefetch: (value: boolean) => void }> = ({ newAmount, setNewAmount, newType, setNewType, setRefetch }) => {
  const [value, setValue] = useState<number>('' as unknown as number);
  const [desc, setDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('Category')
  const [startDate, setStartDate] = React.useState<Date>(new Date()); 
  const [selectedDate, setSelectedDate] = useState(startDate)
  
  const [mouseDown, setMouseDown] = useState(false);
  const handleMouseDown = () => setMouseDown(true);

  const [receiveMouseDown, setReceiveMouseDown] = useState(false);
  const handleReceiveMouseDown = () => setReceiveMouseDown(true);
  const handleReceiveMouseUp = () => setReceiveMouseDown(false);

  const [spendMouseDown, setSpendMouseDown] = useState(false);
  const handleSpendMouseDown = () => setSpendMouseDown(true);
  const handleSpendMouseUp = () => setSpendMouseDown(false);

  const [showModal, setShowModal] = useState(false);
  const [showSelector, setShowSelector] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ""){
      setNewAmount(0);
      return setValue('' as unknown as number);
    }
    if (parseInt(e.target.value) < 0){
      setNewAmount(0);
      return setValue('' as unknown as number);
    }
    if (parseInt(e.target.value) > 1000000000){
      setNewAmount(1000000000);
      return setValue(1000000000);
    }
    setValue(parseInt(e.target.value));
    setNewAmount(parseInt(e.target.value));
  };

  const handleInputDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Post data to API
  const handleButton = async (newTypes: string) => {
    try {
      if(newAmount === '' as unknown as number || newAmount === 0) {
        return;
      }
      const response = await api.post('/posts', {
        Amount: newAmount,
        Types: newTypes,
        Category: selectedCategory,
        Note: desc,
        Dates: selectedDate.toLocaleDateString('ja-Jp')
      });
      setRefetch(true);
      console.log(response);
    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      } else if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Error', err.message);
      }
    }
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const toggleSelector = () => {
    setShowSelector(!showSelector)
  }

  return (
    <div>
      <div className="flex-row flex items-center">
        {/* Filter Button */}
        <div 
          onMouseDown={handleMouseDown} 
          onMouseUp={() => setMouseDown(false)} 
          className="h-max w-16 px-4"
        >
          <div onClick={toggleSelector}>
            <FaFilter className={`text-white text-xl cursor-pointer transition-all duration-200 hover:rounded-full hover:bg-white hover:text-[#03002e] hover:size-8 hover:border-2 hover:border-white ${mouseDown ? 'scale-75' : 'scale-100'} ${showSelector ? "rounded-full bg-white text-[#03002e] size-8 border-2 border-white" : ""}`} />
          </div>
          <div className={`absolute ${showSelector ? "scale-105" : "scale-0"}`}>
            <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} showSelector={showSelector} setShowSelector={setShowSelector} /> 
          </div>
        </div>

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
          <div className="absolute mr-[16rem] mb-[13rem] text-white font-monserrat font-bold text-md">Amount</div>
          <div className="flex flex-col items-center">
            <input
              placeholder="Rp 0,00"
              className="bg-slate-500 rounded-xl px-3 pt-8 pb-3 outline-none font-monserrat font-extrabold text-2xl text-white no-spinners"
              type="Number"
              onChange={handleInputChange}
              value={value}
              max={1000000000}
            />

            <input 
              placeholder="Description"
              type="text"
              maxLength={30}
              onChange={handleInputDescription}
              className="py-1 mt-3 pl-3 w-full outline-none bg-[#100da8af] text-white font-monserrat font-semibold rounded-lg"
            />

            <div className="flex justify-evenly w-full py-3">
              <Selector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              <DateButton selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>

            <div className="flex justify-evenly p-4 w-full"> 
              <div 
                onClick={() => {
                  handleButton("income");
                  toggleModal();
                  setValue('' as unknown as number);
                  setDesc("" as unknown as string);
                  setSelectedCategory("Category");
                  setSelectedDate(new Date());
                }} 
                onMouseDown={handleReceiveMouseDown} 
                onMouseUp={handleReceiveMouseUp} 
                className={`bg-[#9092ff] text-gray-900 duration-150 cursor-pointer transition-all py-2 px-4 font-monserrat font-bold rounded-3xl ${receiveMouseDown ? 'scale-100 duration-75' : 'hover:scale-105'}`}
              >
                <IoMdCheckmarkCircleOutline className="inline-block mb-[0.2rem] mr-2" />
                Receive
              </div>
              <div 
                onClick={() => {
                  handleButton("expense");
                  toggleModal();
                  setValue('' as unknown as number);
                  setDesc("" as unknown as string);
                  setSelectedCategory("Category");
                  setSelectedDate(new Date());
                }}
                onMouseDown={handleSpendMouseDown} 
                onMouseUp={handleSpendMouseUp} 
                className={`bg-[#575899] text-slate-200 duration-150 cursor-pointer transition-all pl-4 py-2 pr-5 font-monserrat font-bold rounded-3xl ${spendMouseDown ? 'scale-100 duration-75' : 'hover:scale-105'}`}
              >
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

const DataShow: React.FC<{ newAmount: number, newType: string, refetch: boolean, setRefetch: (value: boolean) => void }> = ({ newAmount, newType, refetch, setRefetch }) => {
  const [posts, setPosts] = useState([] as any)
  const [dataInflow, setDataInflow] = useState(0);
  const [dataOutflow, setDataOutflow] = useState(0);
  const [dataBalance, setDataBalance] = useState(0);
  const [transactionPosts, setTransactionPosts] = useState([] as any);

  // Fetch data from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err: any) {
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

    const loadInData = async () => {
      await fetchPosts();

      console.log("REFETCH");
      console.log(refetch);

      // console.log(posts)

      if (posts.postsByDate) {
          // Init variables here
          let dataInflow = 0;
          let dataOutflow = 0;

          Object.keys(posts.postsByDate).forEach((key) => {
            posts.postsByDate[key].map((post: any) => {
              Object.keys(post).forEach((key) => {
                // Code goes here
                if(key === "Types") {
                  if (post[key] === "income") {
                    dataInflow += post.Amount;
                  }
                  if (post[key] === "expense") {
                    dataOutflow += post.Amount;
                  }
                }
              })
            })
            setDataInflow(dataInflow);
            setDataOutflow(dataOutflow);
            setDataBalance(dataInflow - dataOutflow);
          })

          setTransactionPosts(posts.postsByDate);
      }

      setRefetch(false);
    }

    loadInData();
    
  }, [refetch])
  /* API END */  

  const [date, setDate] = useState(new Date());
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  }

  return (
    <div className="py-4 px-6">
      <div className="text-slate-200 opacity-70 text-sm">Welcome back,</div>
      <div className="text-white font-monserrat font-bold text-2xl">Hello, Joe Mathew!</div>

      <div className="flex flex-col lg:flex-row">
        <div className="font-monserrat text-slate-200 font-semibold bg-gradient-to-r from-[#2c67f2] via-[#0032a8] to-[#002477] border-2 border-solid border-[#2c67f2] lg:w-[50%] w-full h-48 rounded-xl mt-5 duration-150 transition-all hover:scale-105 cursor-default">
          <div className="pt-6 pl-6">Balance</div>
          <div className="text-3xl xl:text-5xl pl-5 pt-3 text-white">
            {formatCurrency(dataBalance)}
          </div>
          <div className="text-sm pl-6 pt-9">{days[date.getDay()]}, {date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>

        <div className="text-white font-monserrat font-semibold pt-5 lg:w-[50%] w-full flex flex-col justify-evenly lg:pl-6 pl-1 space-y-3">
          <div
            className="bg-[#010057cd] flex flex-column px-3 py-3 rounded-xl hover:scale-105 duration-150 transition-all cursor-default"
          ><FaMoneyBillTrendUp className="inline text-5xl pt-2 pr-2 fill-slate-300" />
            <div className="inline">    
              <span className="text-sm font-normal text-slate-300">Inflow</span>
              <br />
              <span className="text-2xl">{formatCurrency(dataInflow)}</span>
            </div>
          </div>
          <div 
            className="bg-[#010057cd] flex flex-column py-3 px-3 rounded-xl hover:scale-105 duration-150 transition-all cursor-default"
          ><MdOutlineShoppingCart className="inline text-5xl pr-1 fill-slate-300" />
            <div className="inline">
              <span className="text-sm font-normal text-slate-300">Outflow</span>
              <br />
              <span className="text-2xl">{formatCurrency(dataOutflow)}</span>
            </div>
            </div>
        </div>
      </div>
      <div className="justify-center flex">
        <TransactionList key={transactionPosts.length} posts={transactionPosts} />
      </div>
    </div>
  );

}

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [newAmount, setNewAmount] = useState(0);
  const [newType, setNewType] = useState('' as unknown as string);
  const [refetch, setRefetch] = useState(true);
  
  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className="bg-[#03002e] w-full min-h-svh xl:w-[82%]">
      <div className="flex justify-center p-2 border-b-2 border-[#ffc900] border-solid border-opacity-40">
        <div onClick={toggleModal}>
          <HomeHeader newAmount={newAmount} newType={newType} setNewAmount={setNewAmount} setNewType={setNewType} setRefetch={setRefetch} />
        </div>
      </div>
      <div>
        <DataShow newAmount={newAmount} newType={newType} refetch={refetch} setRefetch={setRefetch} />
      </div>
    </div>
  );
}