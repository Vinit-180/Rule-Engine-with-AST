import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import SubmitButton from '../components/SubmitButton';

const ModifyRule = () => {


    const [rules, setRules] = useState([]);
    const [rule, setRule] = useState('');
    const [newRuleString, setNewRuleString] = useState('');
    const [error, setError] = useState(null);
    const [data,setData]=useState();
    const getRules = () => {

        axios.get("http://127.0.1:5000/api/rules").then((data)=>{
            console.log(data);
            setRules(data.data.rules);
        }).catch((err)=>{
            console.log(err);
            setError(err);
        })
    };
  useEffect(() => {
    getRules();
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(newRuleString,rule);
    axios.put(`http://127.0.1:5000/api/rules/update_rule?rule_id=${rule}`,{"rule":newRuleString},).then((data)=>{
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
            text:"Error: Rule not modified",
            icon:"warning",
        })
        setData('');
        console.log(err);
        setError("Facing some Errors to modify your rule. Please check the format again ");
    })
  }

  return (
    <div className='flex flex-col space-y-6 max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg'>
      <h2 className='text-4xl font-bold mb-8 text-center text-gray-800'>Modify Rule</h2>
      <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold text-gray-700">Rule ID</label>
          <select
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={rule}
            onChange={(e) => setRule(e.target.value)}
          >
            <option value="" disabled>Select a Rule ID</option>
            {rules?.map((item) => (
              <option key={item._id} value={item?._id}>
                {item?.rule_string} {item?._id}</option>
            ))}
          </select>
        </div>

      <div className='flex flex-col mb-6'>
        <label className='mb-2 text-lg font-semibold text-gray-700'>New Rule String</label>
        <textarea
          value={newRuleString}
          onChange={(e) => setNewRuleString(e.target.value)}
          placeholder='Enter new rule string'
          className='p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-600'
        />
      </div>
        <SubmitButton 
        onClick={handleSubmit}
        text={"Modify Rule"} />

      {/* {response && (
        <pre className='bg-orange-100 text-orange-800 p-4 rounded-md mt-6 border border-orange-200'>
         {response.ruleString ? (
            <div>Rules modify successfully!</div>
          ) : (
            <div>Rule not modified</div>
          )}
        
        </pre>
      )} */}
      {error && (
        <div className='text-red-600 mt-6 text-lg'>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  )
}

export default ModifyRule
