import { useState } from 'react';
import { deleteProperty } from '../../../queries/propertys/propertys';
import usePropertyStore from '../../../store/propertys/usePropertyStore';
import { BsTrashFill } from 'react-icons/bs';
import OpenCloseModal from '../../modal/OpenCloseModal';
import { DeleteConfirmation } from '../../modal/DeleteConfirmation';

export default function DeletePropertyModal(property) {
  const removeSelectProperty = usePropertyStore(
    (state) => state.removeSelectProperty,
  );
  const [isModalDeleteOpen, setDeleteModalOpen] = useState(false);

  function openDeleteModal(data) {
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
  }

  async function handlerDelete() {
    setDeleteModalOpen(false);
    await deleteProperty(property.value.id);
    removeSelectProperty({
      name: name,
      property_id: property.id,
    });
  }

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalDeleteOpen}
        openModal={openDeleteModal}
        closeModal={closeDeleteModal}
        modalName={''}
        backdrop={true}
        modalButton={<BsTrashFill />}
        colorText={'text-red-600'}
        classStyle={false}
      >
        <DeleteConfirmation
          isOpen={isModalDeleteOpen}
          onCancel={closeDeleteModal}
          onConfirm={handlerDelete}
          message="Tem certeza que deseja excluir essa propriedade?"
        />
      </OpenCloseModal>
    </div>
  );
}
