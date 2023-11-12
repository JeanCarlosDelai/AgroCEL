import {
  FaFileInvoiceDollar,
  FaMapMarkedAlt,
  FaWineBottle,
} from 'react-icons/fa';
import { SiGoogledocs } from 'react-icons/si';
import { TbChartAreaLineFilled } from 'react-icons/tb';
import { GiNotebook } from 'react-icons/gi';
import { FaSackDollar } from 'react-icons/fa6';

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
    path: '/reports',
    icon: SiGoogledocs,
  },
];

const linksSale = [
  { id: 1, text: 'Vender / Produzir', path: '/sale', icon: FaSackDollar },
  {
    id: 2,
    text: 'Visualizar Vendas',
    path: '/view-sale',
    icon: FaFileInvoiceDollar,
  },
  {
    id: 3,
    text: 'Visualizar Produção',
    path: '/view-production',
    icon: FaWineBottle,
  },
];

export { links, linksSale };
