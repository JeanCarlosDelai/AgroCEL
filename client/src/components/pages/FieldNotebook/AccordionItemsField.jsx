import CreateCropModalField from './CreateCropModalField';
import CreateApplicationModalField from './CreateApplicationModalField';
import CreateOtherActivitieModalField from './CreateOtherActivitieModalField';

function AccordionItemsField() {
  return [
    {
      title: 'Adicionar Colheitas',
      content: <CreateCropModalField />,
    },
    {
      title: 'Adicionar Aplicações',
      content: <CreateApplicationModalField />,
    },
    {
      title: 'Adicionar Manejo',
      content: <CreateOtherActivitieModalField />,
    },
  ];
}

export default AccordionItemsField;
