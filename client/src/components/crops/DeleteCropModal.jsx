import { useState } from 'react';
import { deleteCrop } from '../../queries/crops/crops';
import { BsTrashFill } from 'react-icons/bs';
import OpenCloseModal from '../OpenCloseModal';
import { DeleteConfirmation } from '../DeleteConfirmation';

export default function DeleteCropModal(crop) {
  const [isModalDeleteOpen, setDeleteModalOpen] = useState(false);
  // console.log(crop);
  function openDeleteModal() {
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
  }
  // console.log(area.value.id);
  async function handlerDelete() {
    setDeleteModalOpen(false);
    console.log();
    await deleteCrop(crop.crop.area_id, crop.crop.id);
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
          message="Tem certeza que deseja excluir essa colheita?"
        />
      </OpenCloseModal>
    </div>
  );
}
