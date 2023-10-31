import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';

const SubmitButton = ({ label }) => {
  return (
    <button
      type="submit"
      className="relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
    >
      <span className="relative inline-flex px-10 py-2.5 transition-all ease-in duration-75 text-white bg-black rounded-md group-hover:bg-opacity-0">
        <AiOutlineSend className="mr-2 mt-0.5" />
        {label || 'Enviar'}
      </span>
    </button>
  );
};

export default SubmitButton;
