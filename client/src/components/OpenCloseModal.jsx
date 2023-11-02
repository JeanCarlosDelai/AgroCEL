import React from 'react';
import CloseModal from './Buttons/CloseModal';

const OpenCloseModal = ({
  isModalOpen,
  openModal,
  closeModal,
  children,
  modalName,
  modalButton,
  classStyle,
  colorText,
  backdrop,
}) => {
  return (
    <>
      <button
        onClick={openModal}
        type="button"
        className={`relative inline-flex  items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group ${
          classStyle
            ? 'bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'
            : ''
        }`}
      >
        <span
          className={`relative inline-flex px-4 py-2.5  transition-all ease-in duration-75 ${colorText} rounded-md group-hover:bg-opacity-0 ${
            classStyle ? 'bg-black' : ''
          }`}
        >
          {modalButton}
        </span>
      </button>
      {isModalOpen && (
        <div
          tabIndex="-1"
          aria-hidden="true"
          className="flex bg-slate-800 bg-opacity-75 h-screen overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-screen mx-auto md:inset-0 max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div
              className={`relative p-4  rounded-lg shadow sm:p-5 ${
                backdrop ? '' : 'bg-gray-800'
              }`}
            >
              <div
                className={`flex justify-between items-center pb-4 mb-4 rounded-t sm:mb-5 dark:border-gray-600 ${
                  backdrop ? '' : 'border-b'
                }`}
              >
                <h3 className="text-lg font-semibold text-white">
                  {modalName}
                </h3>
                {!backdrop && <CloseModal onCancel={closeModal} />}
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenCloseModal;
