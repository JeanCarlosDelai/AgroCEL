import React from 'react';
import { BsTrashFill } from 'react-icons/bs';
import CloseModal from '../Buttons/CloseModal';

export function DeleteConfirmation({ onCancel, onConfirm, message }) {
  return (
    <div
      id="deleteModal"
      tabIndex="-1"
      aria-hidden="true"
      className="flex bg-slate-800 bg-opacity-75 h-screen overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-screen mx-auto  md:inset-0 max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative p-4 text-center bg-gray-700 rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <CloseModal onCancel={onCancel} />
          <BsTrashFill className="text-red-500  w-11 h-11 mb-3.5 mx-auto" />
          <p className="mb-4 text-gray-300 ">{message}</p>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={onCancel}
              data-modal-toggle="deleteModal"
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-700 bg-green-200 rounded-lg border border-green-400 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
            >
              Não, cancelar
            </button>
            <button
              onClick={onConfirm}
              type="submit"
              className="py-2 px-3 text-sm font-medium text-center text-white bg-red-500 rounded-lg border border-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              Sim, continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
