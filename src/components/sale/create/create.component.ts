import { Component, Vue } from 'vue-property-decorator';

import { tap, flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import store from '@/store';

import SaleService from '@/shared/services/sale.service';
import ItemService from '@/shared/services/item.service';
import { SET_SALE, SET_ITEMS_OF_SALE } from '@/shared/constants/store.constant';
import { Item, Input } from '@/shared/models/model';

import SaleCreateService from './create.service';
// @ts-ignore
import WithRender from './create.component.html';

@WithRender
@Component({
  computed: {
    canBeSubmited(): boolean {
      return (this.$data.inputs as Input[]).every(
        ({ model }) => !!model.length,
      );
    },
    canAddMore(): boolean {
      return (this.$data.inputs as Input[]).length < 5;
    },
  },
})
export default class SaleCreateComponent extends Vue {
  inputs: Input[] = [{
    label: 'title',
    name: 'title',
    rules: [value => !!value.length || 'Cannot be blank'],
    model: '',
    type: 'sale',
  }, {
    label: 'description',
    name: 'description',
    rules: [value => !!value.length || 'Cannot be blank'],
    model: '',
    type: 'sale',
  }, {
    label: 'Description de l\'objet numéro 0',
    name: 'description',
    rules: [value => !!value.length || 'Cannot be blank'],
    model: '',
    type: 'item',
  }]

  showSnackbar = false;

  message = '';

  loading = false;

  maxItems = 3;

  addMore() {
    this.inputs.push({
      label: `'Description de l'objet numéro ${this.inputs.length - 2}`,
      name: 'description',
      rules: [value => !!value.length || 'Cannot be blank'],
      model: '',
      type: 'item',
    });
  }

  submit() {
    this.loading = true;
    const salePayload = SaleCreateService.formatSaleInputs(this.inputs);

    SaleService.post(salePayload).pipe(
      tap(sale => store.commit(SET_SALE, sale)),
      flatMap((sale) => {
        const items = SaleCreateService.formatItemInputs(this.inputs, sale.id)
          .map(itemPayload => ItemService.post(itemPayload));
        return forkJoin(...items);
      }),
      tap((items : Item[]) => items.forEach(item => store.commit(SET_ITEMS_OF_SALE, item))),
    ).subscribe(
      () => {
        this.loading = false;
        this.showSnackbar = true;
        this.message = 'Vente créee';
      }, () => {
        this.loading = false;
        this.showSnackbar = true;
        this.message = 'Une erreur serveur a eu lieu, la vente n\'a pas pu être créee';
      },
    );
  }
}
