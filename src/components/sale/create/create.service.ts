import { Input, SaleForm, ItemForm } from '@/shared/models/model';

export default class SaleCreateService {
  static formatSaleInputs(inputs: Input[]) {
    return inputs.reduce((saleAcc, input) => {
      if (input.type === 'item') {
        return saleAcc;
      }

      return {
        ...saleAcc,
        [input.name]: input.model,
      };
    }, {} as SaleForm);
  }

  static formatItemInputs(inputs: Input[], saleId: number) {
    return inputs.reduce((saleAcc, input) => {
      if (input.type === 'sale') {
        return saleAcc;
      }

      return [
        ...saleAcc, {
          [input.name as 'description']: input.model,
          saleId,
        },
      ];
    }, [] as ItemForm[]);
  }
}
