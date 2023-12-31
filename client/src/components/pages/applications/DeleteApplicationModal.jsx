import { useState } from 'react';
import { deleteApplication } from '../../../queries/applications/applications';
import { BsTrashFill } from 'react-icons/bs';
import OpenCloseModal from '../../modal/OpenCloseModal';
import { DeleteConfirmation } from '../../modal/DeleteConfirmation';

export default function DeleteApplicationModal(application) {
  const [isModalDeleteOpen, setDeleteModalOpen] = useState(false);
  function openDeleteModal() {
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
  }
  async function handlerDelete() {
    setDeleteModalOpen(false);
    await deleteApplication(
      application.application.area_id,
      application.application.id,
    );
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
          message="Tem certeza que deseja excluir essa aplicação?"
        />
      </OpenCloseModal>
    </div>
  );
}
