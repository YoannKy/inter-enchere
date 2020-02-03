import { Sale } from '@/shared/models/model';

export default class AgregatorService {
  static search(keyword: string = '', sales: Sale[]) {
    const pattern = keyword
      .replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')
      .split(' ')
      .filter((t: string) => t.length > 0)
      .join('|');

    const regex = new RegExp(pattern, 'gi');

    return sales.reduce((saleAcc, sale) => {
      if (!regex.test(sale.description)
      && !regex.test(sale.title)
      && sale.items.every(item => !regex.test(item.description))
      ) {
        return saleAcc;
      }

      return [
        ...saleAcc,
        sale,
      ];
    }, [] as Sale[]);
  }

  static filter(keyword: string = '', word: string) {
    const pattern = keyword
      .replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')
      .split(' ')
      .filter((t: string) => t.length > 0)
      .join('|');

    const regex = new RegExp(pattern, 'gi');
    return keyword.length ? word.replace(regex, match => match.fontcolor('blue')) : word;
  }
}
