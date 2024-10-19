import React, { useState } from 'react'
import axios from "axios";
import swal from 'sweetalert';

const CreateRule = () => {
    const [rule,setRule]=useState();
    const [data,setData]=useState();
    const [error,setError]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://127.0.1:5000/api/rules/create_rule",{"rule":rule},
            { headers: {
                'Content-Type': 'application/json'
            },}
        ).then((data)=>{
            console.log(data);
            swal({
                title: "Hurrah!",
                text: data.data.message,
                icon: "success",
              });
        }).catch((err)=>{
            swal({
                title:"Oh",
                text:"Error",
                icon:"warning",
            })
            console.log(err);
        })
    }
  return (
    <div className="flex flex-col space-y-6 max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Create Rule</h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold text-gray-700">Enter Rule String</label>
          <textarea
            className="p-4 border border-gray-300 rounded-md h-40 resize-none focus:ring-2 focus:ring-green-500"
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            placeholder="age > 30 AND department = 'Sales'"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
        >
          Create Rule
        </button>
      </form>

      {data && (
        <div className='bg-green-100 text-green-800 p-4 rounded-md font-semibold border border-green-200 mt-4'>
       
          {data.ruleString ? (
            <div>Rule created successfully</div>
          ) : (
            <div>Rule not created</div>
          )}
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-4 text-center text-lg">
          Error: {error}
        </div>
      )}
    </div>
  )
}

export default CreateRule
