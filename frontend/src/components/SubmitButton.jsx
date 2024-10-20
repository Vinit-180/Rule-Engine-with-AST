import React from 'react'

const SubmitButton = ({onClick,text}) => {
  return (
    <button
            type="submit"
            onClick={onClick}
            className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 hover:font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform transform hover:scale-105"
        >
            {text}
        </button>
  )
}

export default SubmitButton
