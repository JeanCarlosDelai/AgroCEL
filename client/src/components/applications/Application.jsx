// import DeleteCropModal from './DeleteCropModal';
// import UpdateCropModal from './UpdateCropModal';

import UpdateApplicationModal from './UpdateApplicationModal';

const Application = ({ application }) => {
  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
          {application?.used_product}
        </td>
        <td className="px-4 py-3">{application?.application_type}</td>
        <td className="px-4 py-3">{application?.quantity}</td>
        <td className="px-4 py-3">{application?.application_date}</td>
        <td className="px-4 py-3">{application?.application_time}</td>
        <td className="px-4 py-3">{application?.description}</td>
        <td className="flex-1 m-0 p-3 justify-end">
          <UpdateApplicationModal application={application} />
        </td>
        <td className="flex-1 p-3">{/* <DeleteCropModal crop={crop} /> */}</td>
      </tr>
    </>
  );
};
export default Application;
