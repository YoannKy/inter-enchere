import { Component, Vue } from 'vue-property-decorator';
import {
  startWith, debounceTime, pluck, tap,
} from 'rxjs/operators';
import { Sale } from '@/shared/models/model';
import AgregatorService from '@/shared/services/agregator.service';

import ItemListComponent from '@/components/items/list/list.component';

// @ts-ignore
import WithRender from './list.component.html';

@WithRender
@Component({
  filters: {
    search: (text: string, keyword: string) => AgregatorService.filter(keyword, text),
  },
  subscriptions() {
    return {
      inputValue: this.$fromDOMEvent('input', 'keyup').pipe(
        tap(() => {
          this.$data.loading = true;
        }),
        startWith(''),
        debounceTime(1000),
        pluck('target', 'value'),
        tap((val) => {
          this.$data.sales = this.$store.getters.searchSales(val);
          this.$data.keyword = val;
          this.$data.loading = false;
        }),
      ),
    };
  },
  components: {
    ItemListComponent,
  },
})
export default class SaleListComponent extends Vue {
  sales: Sale[] = [];

  keyword: string = '';

  loading = true;
}
