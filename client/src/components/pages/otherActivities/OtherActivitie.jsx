import DeleteOtherActivitieModal from './DeleteOtherActivitieModal';
import UpdateOtherActivitieModal from './UpdateOtherActivitieModal';
import FormatDate from '../../../utils/FormatDate';

const OtherActivitie = ({ otherActivitie }) => {
  const activitie_date_format = FormatDate(otherActivitie?.activitie_date);
  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
          {otherActivitie?.name}
        </td>
        <td className="px-4 py-3">{otherActivitie?.activitie_category}</td>
        <td className="px-4 py-3">{activitie_date_format}</td>
        <td className="px-4 py-3">{otherActivitie?.activitie_time}</td>
        <td className="px-4 py-3">{otherActivitie?.description}</td>
        <td className="flex-1 m-0 p-3 justify-end">
          <UpdateOtherActivitieModal otherActivitie={otherActivitie} />
        </td>
        <td className="flex-1 p-3">
          <DeleteOtherActivitieModal otherActivitie={otherActivitie} />
        </td>
      </tr>
    </>
  );
};
export default OtherActivitie;
