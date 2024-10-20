import axios from 'axios';
import React, { useState } from 'react'
import SubmitButton from '../components/SubmitButton';

const CombineRules = () => {
    const [ruleStrings, setRuleStrings] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const rulesArray = ruleStrings.split('\n').filter((rule) => rule.trim() !== '').toString();
    console.log(rulesArray);
    axios.post(`http://127.0.0.1:5000/api/rules/combine_rules`,{"data":rulesArray}).then((data)=>{
        console.log(data);
        // setData(data);
    }).catch((err)=>{
        console.log(err);
        
        // setError(err);
    })

  };
  return (
    <div className="flex flex-col space-y-6 max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Combine Rules</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold text-gray-700">Rule Strings</label>
          <textarea
            className="p-4 border border-gray-300 rounded-md h-48 resize-none focus:ring-2 focus:ring-gray-500"
            value={ruleStrings}
            onChange={(e) => setRuleStrings(e.target.value)}
            placeholder="Enter rule strings, one per line"
          />
        </div>

        <SubmitButton  text={"Combine Rules"} />
        {/* <button
          type="submit"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 hover:font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform transform hover:scale-105"
        >
          Combine Rules
        </button> */}
      </form>

      {/* {response && (
        <div className='bg-green-100 text-green-800 p-4 rounded-md font-semibold border border-green-200 mt-4'>
         
          {response.combinedAST ? (
            <div>Rules combined successfully</div>
          ) : (
            <div>Rules not combined</div>
          )}
        </div>
      )} */}

      {error && (
        <div className="text-red-600 mt-4 text-center text-lg">
          Error: {error}
        </div>
      )}
    </div>
  )
}

export default CombineRules
