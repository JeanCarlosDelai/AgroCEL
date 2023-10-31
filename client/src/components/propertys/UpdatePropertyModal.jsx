import { FormRow } from '..';
import { toast } from 'react-toastify';
import { Button, Flowbite } from 'flowbite-react';
import { LiaBroomSolid } from 'react-icons/lia';
import { AiOutlineEdit, AiOutlineSend } from 'react-icons/ai';
import { useState } from 'react';
import { updateProperty } from '../../queries/propertys/propertys';
import usePropertyStore from '../../store/propertys/usePropertyStore';

const UpdatePropertyModal = (property) => {
  const selectProperty = usePropertyStore((state) => state.selectProperty);

  const [name, setName] = useState('');
  const [total_area, setTotalArea] = useState('');
  const [cultivated_area, setCultivatedArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isModalUpdateOpen, setUpdateModalOpen] = useState(false);

  function openUpdateModal() {
    setName(property.value.name);
    setState(property.value.state);
    setTotalArea(property.value.total_area);
    setCultivatedArea(property.value.cultivated_area);
    setCity(property.value.city);
    setUpdateModalOpen(true);
  }

  function closeUpdateModal() {
    setUpdateModalOpen(false);
  }

  const handlerUpdate = async () => {
    setUpdateModalOpen(false);
    await updateProperty(property.value.id, {
      name,
      state,
      cultivated_area,
      total_area,
      city,
    });

    selectProperty({
      name: name,
      property_id: property.id,
    });
  };

  const clearFormFields = () => {
    setName('');
    setTotalArea('');
    setCultivatedArea('');
    setCity('');
    setState('');
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={openUpdateModal}
        type="button"
        id="createProductModalButton"
        className="flex w-full rounded-md p-2 ml-2 hover:bg-green-200  text-green-600 "
      >
        <AiOutlineEdit />
      </button>
      {isModalUpdateOpen && (
        <div
          id="createProductModal"
          tabIndex="-1"
          aria-hidden="true"
          className="flex bg-slate-800 bg-opacity-75 h-screen overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-screen mx-auto  md:inset-0 max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4  rounded-lg shadow bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-white">
                  Editar Propriedade
                </h3>
                <button
                  type="button"
                  onClick={closeUpdateModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-target="createProductModal"
                  data-modal-toggle="createProductModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Nome da Propriedade
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2. placeholder-gray-100  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Nome"
                    ></input>
                  </div>

                  <div>
                    <label
                      htmlFor="cultivated"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Area Cultivada
                    </label>
                    <input
                      type="number"
                      value={cultivated_area}
                      onChange={(e) => setCultivatedArea(e.target.value)}
                      name="cultivated"
                      id="cultivated"
                      className="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2. placeholder-gray-100  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Número de ha"
                    ></input>
                  </div>
                  <div>
                    <label
                      htmlFor="areatotal"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Area Total
                    </label>
                    <input
                      type="number"
                      name="areatotal"
                      id="areatotal"
                      value={total_area}
                      onChange={(e) => setTotalArea(e.target.value)}
                      className="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2. placeholder-gray-100  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Número de ha"
                    ></input>
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Cidade
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2. placeholder-gray-100  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Sua Cidade"
                    ></input>
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Estado
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2. placeholder-gray-100  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Seu Estado"
                    ></input>
                  </div>
                </div>
                <div className="relative inline-flex items-center justify-center">
                  <button
                    type="button"
                    onClick={clearFormFields}
                    className="relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  >
                    <span class="relative inline-flex px-10 py-2.5 transition-all ease-in duration-75 text-white bg-black rounded-md group-hover:bg-opacity-0">
                      <LiaBroomSolid className="mr-2 mt-0.5" /> Limpar
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handlerUpdate}
                    className="relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  >
                    <span className="relative inline-flex px-10 py-2.5 transition-all ease-in duration-75 text-white bg-black rounded-md group-hover:bg-opacity-0">
                      <AiOutlineSend className="mr-2 mt-0.5" />
                      Enviar
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default UpdatePropertyModal;
