import { Component, Vue } from 'vue-property-decorator';
import { tap, flatMap, bufferCount } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import SaleListComponent from '@/components/sale/list/list.component';
import saleService from '@/shared/services/sale.service';
import itemService from '@/shared/services/item.service';
import store from '@/store';
import { SET_SALE, SET_ITEMS_OF_SALE } from '@/shared/constants/store.constant';
import { Item } from '@/shared/models/model';

// @ts-ignore
import WithRender from './home.component.html';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'B',
  'A',
];

@WithRender
@Component({
  components: {
    SaleListComponent,
  },
  subscriptions() {
    return {
      konami: this.$fromDOMEvent('input', 'keyup').pipe(
        bufferCount(10),
        tap((inputs) => {
          if (inputs.every(
            (input, index) => (input as KeyboardEvent)
              .key
              .toLowerCase() === KONAMI_CODE[index].toLowerCase(),
          )
          ) {
            this.$data.showKonami = true;
          } else {
            this.$data.showKonami = false;
            console.log('konami code failed');
          }
        }),
      ),
    };
  },
})
export default class Home extends Vue {
    showKonami = false;

    public mounted() {
      saleService.list().pipe(
        tap(sales => sales.forEach(sale => store.commit(SET_SALE, sale))),
        flatMap((sales) => {
          const itemsPerSale = sales.map(sale => itemService.list([{ name: 'sale_id', value: sale.id }]));
          return forkJoin(itemsPerSale);
        }),
        tap((itemsBySale: Item[][]) => itemsBySale.forEach(
          items => items.forEach(item => store.commit(SET_ITEMS_OF_SALE, item)),
        )),
      ).subscribe();
    }
}
