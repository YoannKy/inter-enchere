import { Component, Prop, Vue } from 'vue-property-decorator';

import { Item } from '@/shared/models/model';
import AgregatorService from '@/shared/services/agregator.service';

// @ts-ignore
import WithRender from './list.component.html';

@WithRender
@Component({
  filters: {
    search: (text: string, keyword: string) => AgregatorService.filter(keyword, text),
  },
})
export default class SaleListComponent extends Vue {
  @Prop({ default: () => [] }) items!: Item[];

  @Prop({ default: () => '' }) keyword!: string;
}
