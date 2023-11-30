// helpers.ts

import Handlebars from 'handlebars';

Handlebars.registerHelper('formatDate', function (dateString: string) {
  // Crie um objeto de data a partir da string fornecida
  const date = new Date(dateString);

  // Extraia o dia, mês e ano
  const day = date.getDate();
  const month = date.getMonth() + 1; // Os meses em JavaScript são de 0 a 11
  const year = date.getFullYear();

  // Formate a data no estilo desejado (dd/mm/yyyy)
  const formattedDate =
    (day < 10 ? '0' : '') +
    day +
    '/' +
    (month < 10 ? '0' : '') +
    month +
    '/' +
    year;

  // Retorne a data formatada
  return formattedDate;
});
