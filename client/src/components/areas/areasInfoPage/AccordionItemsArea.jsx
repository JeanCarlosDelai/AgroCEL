import ApplicationsContainer from '../../../pages/dashboard/Applications/ApplicationsContainer';
import CropsContainer from '../../../pages/dashboard/Crops/CropsContainer';
import TableAreainfo from './TableAreaInfo';

function AccordionItemsArea({ area }) {
  return [
    {
      title: 'Informações da área ',
      content: <TableAreainfo area={area} />,
    },
    {
      title: 'Colheitas',
      content: <CropsContainer area={area} />,
    },
    {
      title: 'Aplicações',
      content: <ApplicationsContainer area={area} />,
    },
    {
      title: 'Manejo',
      content:
        'The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.',
    },
  ];
}

export default AccordionItemsArea;
