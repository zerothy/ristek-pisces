import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function TransactionList({ posts }: { posts: any }) {
    const [data, setData] = useState(posts || []);

    const showData = ({ key, amount, types, category, dates, note }: { key: any, amount: number, types: string, category: string, dates: string, note: string }) => {

        return (
            <div key={key} className="bg-white">
                <div className="flex justify-between p-4">
                    <div>
                        <h1>{types}</h1>
                        <p>{category}</p>
                    </div>
                    <div>
                        <h1>{amount}</h1>
                        <p>{dates}</p>
                    </div>
                </div>
                <div className="p-4">
                    <p>{note}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full m-6 bg-red-200">
            {   
                data.map((post: any, index: any) => (
                    showData({ key: index, amount: post.Amount, types: post.Types, category: post.Category, dates: post.Dates, note: post.Note })
                ))
            }
            hi
        </div>
    );
}