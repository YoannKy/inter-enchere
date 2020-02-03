import Vue from 'vue';
import Vuex from 'vuex';

import { SET_SALE, SET_ITEMS_OF_SALE } from '@/shared/constants/store.constant';
import { Sale, Item } from '@/shared/models/model';
import AgregatorService from '@/shared/services/agregator.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sales: {} as { [id: number]: Sale },
  },
  mutations: {
    [SET_SALE](state, sale: Sale) {
      state.sales = {
        ...state.sales,
        [sale.id]: {
          id: sale.id,
          description: sale.description,
          title: sale.title,
          items: [],
        },
      };
    },
    [SET_ITEMS_OF_SALE](state, item: Item) {
      state.sales = {
        ...state.sales,
        [item.saleId]: {
          ...state.sales[item.saleId],
          items: [...state.sales[item.saleId].items, {
            id: item.id,
            description: item.description,
            saleId: item.saleId,
          }],
        },
      };
    },
  },
  getters: {
    sales: state => Object.values(state.sales),
    searchSales: state => (keyword: string) => AgregatorService.search(
      keyword, Object.values(state.sales),
    ),
  },
});
