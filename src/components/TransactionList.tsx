import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const mapVectorData = (vector: any) => {
    return vector.map((subVector: any, index: any) => (
        <div key={index}>
          {subVector.map((value: any, subIndex: any) => (
            <p key={subIndex}>{value}</p>
          ))}
        </div>
      ));
}

export default function TransactionList({ posts }: { posts: any }) {
    const [data, setData] = useState(posts || []);
    // const [vectorData, setVectorData] = useState<string[][]>([]);
    // const [tempVectorData, setTempVectorData] = useState<string[]>([]);

    // const pushBack = (x: any) => {
    //     setVectorData(prevVectorData => [...prevVectorData, [x]]);
    // }

    // const pushBackTemp = (x: any) => {
    //     setTempVectorData(prevTempVectorData => [...prevTempVectorData, x]);
    // }

    // concat data just in case we need the original data
    // const sortedData = [].concat(data)
    //     .sort((a: any,b: any) => a.Dates > b.Dates ? -1 : 1)
    //     .map((item) => item);

    // const dateSort = (sortedData: any) => {
    //     console.log("len: " + sortedData.length )
    //     let index = 0;
    //     for(let i = 0; i < sortedData.length; i++){
    //         // console.log(i + ": " + sortedData[i].Dates)
    //         if(i > 0){
    //             if(sortedData[i].Dates !== sortedData[i-1].Dates){
    //                 pushBack(tempVectorData[index]);
    //                 index++;
    //             }
    //         }
    //         pushBackTemp(sortedData[i]);
    //         // console.log("check: " + tempVectorData[index])
    //     }
    // }
    
    // useEffect(() => {
    //     dateSort(sortedData);
    // }, [sortedData]);

    const showData = ({ key, amount, types, category, dates, note }: { key: any, amount: number, types: string, category: string, dates: string, note: string }) => {

        return (
            <div key={key} className="bg-blue-200">
                <div className="m-2 bg-white">
                    <p>Amount: {amount}</p>
                    <p>Types: {types}</p>
                    <p>Category: {category}</p>
                    <p>Dates: {dates}</p>
                    <p>Note: {note}</p>
                </div>
                <div>
                    {/* {console.log("vectorData: " + vectorData[0])} */}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-3 my-6 bg-red-200">
            {   
                data.map((post: any, index: any) => (
                    showData({ key: index, amount: post.Amount, types: post.Types, category: post.Category, dates: post.Dates, note: post.Note })
                ))
            }
        </div>
    );
}