import DeleteApplicationModal from './DeleteApplicationModal';
import UpdateApplicationModal from './UpdateApplicationModal';
import FormatDate from '../../../utils/FormatDate';

const Application = ({ application }) => {
  const application_date_format = FormatDate(application?.application_date);
  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
          {application?.used_product}
        </td>
        <td className="px-4 py-3">{application?.application_type}</td>
        <td className="px-4 py-3">{application?.quantity} Kg</td>
        <td className="px-4 py-3">{application_date_format}</td>
        <td className="px-4 py-3">{application?.application_time} horas</td>
        <td className="px-4 py-3">{application?.description}</td>
        <td className="flex-1 m-0 p-3 justify-end">
          <UpdateApplicationModal application={application} />
        </td>
        <td className="flex-1 p-3">
          <DeleteApplicationModal application={application} />
        </td>
      </tr>
    </>
  );
};
export default Application;
