import React, { useEffect, useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import SubmitButton from '../components/SubmitButton';

const EvaluateRule = () => {
    const [age, setAge] = useState('');
    const [salary, setSalary] = useState('');
    const [department, setDepartment] = useState('');
    const [experience, setExperience] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [rules, setRules] = useState([]);
    const [rule, setRule] = useState('');

    
    const getRules = async () => {
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
    const handleSubmit =  (e) => {
        e.preventDefault();
          const data = {
            age: parseInt(age, 10),
            salary: parseInt(salary, 10),
            department: department,
            experience: parseInt(experience, 10),
          };
        axios.post(`http://127.0.0.1:5000/api/rules/evaluate_rule?rule_id=${rule}`,{"data":data}).then((data)=>{
            console.log(data);
            if(data.data.result)
            {            swal({
              title: "Hurrah!",
              text: "Your rule evaluated successfully!!", // Updated success message
              icon: "success",
            });
          }
            else
            {swal({
              title: "Oops!",
              text: "Your rule evaluation failed. Please check your inputs and try again.",
              icon: "error",
            });}
            setError('');
            // setData(data);
        }).catch((err)=>{
            console.log(err);
            setError("Facing some Errors to evaluate your rule. Please check the format again ");
        })

      };

    const inputFields = [
        { label: "Age", value: age, setter: setAge, type: "number", placeholder: "Enter age" },
        { label: "Department", value: department, setter: setDepartment, type: "text", placeholder: "Enter department" },
        { label: "Salary", value: salary, setter: setSalary, type: "number", placeholder: "Enter salary" },
        { label: "Experience", value: experience, setter: setExperience, type: "number", placeholder: "Enter experience" },
    ];
  return (
    <div className="flex flex-col space-y-4 max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Evaluate Rule</h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
        {inputFields.map((field, index) => (
            <div className="flex flex-col" key={index}>
                <label className="mb-1 text-lg font-semibold text-gray-700">{field.label}</label>
                <input
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                />
            </div>
        ))}
        <SubmitButton  text={"Evaluate Rule"} />       
      </form>

      {error && <div className="text-red-500 mt-4 text-center text-lg">Error: {error}</div>}
    </div>
  )
}

export default EvaluateRule
