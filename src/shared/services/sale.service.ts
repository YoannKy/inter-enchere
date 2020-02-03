import apiService from '@/shared/services/api.service';
import { Sale, QueryParam, SaleForm } from '@/shared/models/model';

const SALE = 'sales';

class SaleService {
  static list(params: QueryParam[] = []) {
    return apiService.list<Sale>(SALE, Sale, params);
  }

  static post(sale: SaleForm) {
    return apiService.post(SALE, Sale, SaleService.toJson(sale));
  }

  static toJson(sale: SaleForm) {
    return {
      title: sale.title,
      description: sale.description,
    };
  }
}

export default SaleService;
