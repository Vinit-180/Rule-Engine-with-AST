import React, { useState } from 'react'
import axios from "axios";
import swal from 'sweetalert';
import SubmitButton from '../components/SubmitButton';

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
              setData(data.data);
              setError('')
        }).catch((err)=>{
            swal({
                title:"Oh",
                text:"Error: Rule not created",
                icon:"warning",
            })
            setData('');
            console.log(err);
            setError("Facing some Errors to create your rule. Please check the format again ");
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

        <SubmitButton  text={"Create Rule"} />

      </form>

      {data && (
        <div className='bg-green-100 text-green-800 p-4 rounded-md font-semibold border border-green-200 mt-4'>
       <div>
          {data.message}
        </div>
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
