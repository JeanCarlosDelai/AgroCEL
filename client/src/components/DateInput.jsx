import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { Datepicker } from 'flowbite-react';

registerLocale('pt-br', ptBR);

import 'react-datepicker/dist/react-datepicker.css';

const DateInput = (props) => {
  const formattedDate = props.value ? format(props.value, 'dd/MM/yyyy') : '';

  return (
    <DatePicker
      type="date"
      locale="pt-br"
      dateFormat="dd/MM/yyyy"
      selected={props.startdate}
      onChange={props.onChange}
      value={formattedDate} // Use a data formatada como valor
      className={props.className}
    />
  );
};

export default DateInput;
