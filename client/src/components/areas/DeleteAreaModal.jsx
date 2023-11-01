import { useState } from 'react';
import { deleteArea } from '../../queries/areas/areas';
import { BsTrashFill } from 'react-icons/bs';
import OpenCloseModal from '../OpenCloseModal';
import { DeleteConfirmation } from '../DeleteConfirmation';

export default function DeleteAreaModal(area) {
  const [isModalDeleteOpen, setDeleteModalOpen] = useState(false);

  function openDeleteModal(data) {
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
  }

  async function handlerDelete() {
    setDeleteModalOpen(false);
    await deleteArea(area.value.id);
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
          message="Tem certeza que deseja excluir essa área?"
        />
      </OpenCloseModal>
    </div>
  );
}
