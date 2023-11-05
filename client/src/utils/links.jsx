import { FaMapMarkedAlt } from 'react-icons/fa';
import { SiGoogledocs } from 'react-icons/si';
import { TbChartAreaLineFilled } from 'react-icons/tb';
import { GiNotebook } from 'react-icons/gi';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BiSolidWine } from 'react-icons/bi';

const links = [
  {
    id: 1,
    text: 'Propriedades',
    path: '/propertys',
    icon: FaMapMarkedAlt,
  },
  { id: 2, text: 'Áreas', path: '/areas', icon: TbChartAreaLineFilled },
  {
    id: 3,
    text: 'Caderno de campo',
    path: '/field-notebook',
    icon: GiNotebook,
  },
  {
    id: 4,
    text: 'Relatórios',
    path: '/report',
    icon: SiGoogledocs,
  },
];

const linksSale = [
  { id: 1, text: 'Vender', path: '/sale', icon: AiFillDollarCircle },
  {
    id: 2,
    text: 'Visualizar Vendas',
    path: '/view-sale',
    icon: AiFillDollarCircle,
  },
];

const linksProduction = [
  { id: 1, text: 'Produzir', path: '/production', icon: AiFillDollarCircle },
  {
    id: 2,
    text: 'Visualizar Produção',
    path: '/view-production',
    icon: AiFillDollarCircle,
  },
];

export { links, linksSale, linksProduction };
