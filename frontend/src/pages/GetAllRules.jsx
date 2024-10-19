import axios from 'axios';
import React, { useEffect, useState } from 'react'

const GetAllRules = () => {
    
    const [data,setData]=useState();
    const [error,setError]=useState('');
    useEffect(()=>{
        axios.get("http://127.0.1:5000/api/rules").then((data)=>{
            console.log(data);
        setData(data.data.rules);
        }).catch((err)=>{
            console.log(err);
            setError(err);
        })
    },[]);
  return (
<div className='flex flex-col justify-center items-center p-6'>
      <h2 className='text-4xl font-bold mb-8 text-center text-blue-600'>All Rules</h2>
      <div className='w-full max-w-4xl bg-white shadow-md rounded-lg overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-blue-500 text-white'>
            <tr>
              <th className='p-4 text-left text-sm font-medium'>Rule ID</th>
              <th className='p-4 text-left text-sm font-medium'>Rule String</th>
            </tr>
          </thead>
          <tbody className='bg-gray-50 divide-y divide-gray-200 text-black'>
            {data?.map((rule) => {
              return (<tr key={rule?._id} className='hover:bg-gray-100'>
                <td className='p-4 text-sm'>{rule?._id}</td>
                <td className='p-4 text-sm'>{rule?.rule_string}</td>
              </tr>)
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GetAllRules
