import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function TransactionList({ posts }: { posts: any }) {
    const [data, setData] = useState(posts || []);
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['Jam', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    useEffect(() => {
        setData(posts);
    }, [posts]);

    const formatCurrency = (amount: number) => {
    return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    }

    const showData = ({ key, amount, types, category, dates, note }: { key: any, amount: number, types: string, category: string, dates: string, note: string }) => {
        const formattedDate = new Date(dates).toLocaleDateString('en-GB');
        
        return (
            <div key={key} >
                <div className="bg-[#03002e] px-5 text-white text-sm py-2 flex flex-row" >
                    <div className="w-28 font-semibold text-center">{category}</div>
                    <div className="w-28 font-semibold text-center ">{formattedDate}</div>
                    <div className="mx-3 w-3/4 font-semibold text-left ">{note}</div>

                    <div className={`w-36 font-semibold text-right  ${types === "income" ? "text-green-400" : "text-red-400"}`}>{formatCurrency(amount)}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-3 my-6">
            {   
                Object.keys(data).reverse().flatMap((outerKey) => {
                    const outerKeyDate = new Date(outerKey);
                    return (
                        <div key={outerKey} className="bg-[#010057] mb-4 rounded-t-xl rounded-b-lg border-2 border-[#010057] cursor-default">
                            <div className="flex flex-row items-center px-8 py-1 font-Poppins">
                                <div className="text-2xl font-bold text-slate-200">{("0" + outerKeyDate.getDate()).slice(-2)}</div>
                                <div className="text-base font-semibold pl-3 text-slate-300">{days[outerKeyDate.getDay()]}</div>
                                <div className="text-xs text-slate-300 pl-3">{months[outerKeyDate.getMonth()]} {outerKeyDate.getFullYear()}</div>
                            </div>

                            {data[outerKey].map((post: any, innerKey: any) => (
                                <div key={`${outerKey}-${innerKey}`}>
                                    {showData({ key: `${outerKey}-${innerKey}`, amount: post.Amount, types: post.Types, category: post.Category, dates: post.Dates, note: post.Note })}
                                </div>
                            ))}

                        </div>
                    );
                })
            }
        </div>
    );
}