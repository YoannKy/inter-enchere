import { map } from 'rxjs/operators';

import apiService from '@/shared/services/api.service';
import { Item, QueryParam, ItemForm } from '@/shared/models/model';

const ITEM = 'items';

class ItemService {
  static list(params: QueryParam[] = []) {
    return apiService.list<Item>(ITEM, Item, params);
  }

  static post(item: ItemForm) {
    return apiService.post(ITEM, Item, ItemService.toJson(item));
  }

  static toJson(item: ItemForm) {
    return {
      description: item.description,
      sale_id: item.saleId,
    };
  }
}

export default ItemService;
