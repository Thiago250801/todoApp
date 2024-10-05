import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateStatus'
})
export class DateStatusPipe implements PipeTransform {

  transform(todoDate: Date | null): string {
    if (!todoDate) {
      return 'Data não definida'; // Retornar uma string padrão se a data for nula
    }

    // Certifique-se de que todoDate é um objeto Date
    const date = new Date(todoDate);

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Formatar as datas para comparação
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0); // Usar 'date' em vez de 'todoDate'

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanha';
    } else if (date < today) {
      return 'Expirou ';
    } else {
      return date.toLocaleDateString('pt-BR'); // Retorna a data formatada
    }
  }

}
