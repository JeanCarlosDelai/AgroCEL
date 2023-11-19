// helpers.ts

import Handlebars from 'handlebars';

Handlebars.registerHelper('formatDate', function (dateString: string) {
  // Crie um objeto de data a partir da string fornecida
  var date = new Date(dateString);

  // Extraia o dia, mês e ano
  var day = date.getDate();
  var month = date.getMonth() + 1; // Os meses em JavaScript são de 0 a 11
  var year = date.getFullYear();

  // Formate a data no estilo desejado (dd/mm/yyyy)
  var formattedDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;

  // Retorne a data formatada
  return formattedDate;
});
