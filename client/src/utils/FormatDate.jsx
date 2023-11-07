import { format, parseISO } from 'date-fns';

function FormatDate(data) {
  if (typeof data === 'string') {
    data = parseISO(data);
  }

  if (data instanceof Date) {
    return format(data, 'dd/MM/yyyy');
  } else {
    return 'Data inválida';
  }
}

export default FormatDate;
