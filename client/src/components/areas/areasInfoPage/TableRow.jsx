export function TableRow({ label, value }) {
  return (
    <tr className="bg-gray-800 border-b ">
      <td scope="col" className="px-6 py-3">
        <h6>
          <strong>{label} -</strong> {value}
        </h6>
      </td>
    </tr>
  );
}
