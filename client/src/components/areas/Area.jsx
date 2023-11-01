import UpdateAreaModal from './UpdateAreaModal';
import DeleteAreaModal from './DeleteAreaModal';

const Area = ({ area }) => {
  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
          {area.name}
        </td>
        <td className="px-4 py-3">{area.species}</td>
        <td className="px-4 py-3">{area.variety}</td>
        <td className="px-4 py-3">{area.cultivated_area}</td>
        <td className="px-4 py-3">Detalhes</td>
        <td className="flex-1 m-0 p-3 justify-end">
          <UpdateAreaModal value={area} />
        </td>
        <td className="flex-1 p-3">
          <DeleteAreaModal value={area} />
        </td>
      </tr>
    </>
  );
};
export default Area;
