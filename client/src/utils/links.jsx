import { IoBarChartSharp } from 'react-icons/io5';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = () => {
  const links = [
    {
      id: 1,
      text: 'Propriedades',
      path: '/propertys',
      icon: <IoBarChartSharp />,
    },
    { id: 2, text: 'Áreas', path: '/', icon: <ImProfile /> },
  ];
  return links;
};

export { links };
