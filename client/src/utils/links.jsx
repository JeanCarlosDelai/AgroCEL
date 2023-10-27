import { FaMapMarkedAlt } from 'react-icons/fa';
import { SiGoogledocs } from 'react-icons/si';
import { TbChartAreaLineFilled } from 'react-icons/tb';
import { GiNotebook } from 'react-icons/gi';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BiSolidWine } from 'react-icons/bi';

const links = () => {
  const links = [
    {
      id: 1,
      text: 'Propriedades',
      path: '/propertys',
      icon: <FaMapMarkedAlt />,
    },
    { id: 2, text: 'Áreas', path: '/areas', icon: <TbChartAreaLineFilled /> },
    {
      id: 3,
      text: 'Caderno de campo',
      path: '/field-notebook',
      icon: <GiNotebook />,
    },
    { id: 4, text: 'Vendas', path: '/vendas', icon: <AiFillDollarCircle /> },
    {
      id: 5,
      text: 'Produção Própria',
      path: '/crop',
      icon: <BiSolidWine />,
    },
    {
      id: 6,
      text: 'Relatórios',
      path: '/report',
      icon: <SiGoogledocs />,
    },
  ];
  return links;
};

export { links };
