export class Item {
  id: number;

  saleId: number;

  description: string;

  constructor({ id, sale_id, description }: { id: number, sale_id: number, description: string}) {
    this.id = id;
    this.saleId = sale_id;
    this.description = description;
  }
}

export class Sale {
  id: number;

  title: string;

  description: string;

  items: Item[];

  constructor({
    id,
    title,
    description,
    items,
  }: {
    id: number,
    title: string,
    description: string,
    items: { id: number, sale_id: number, description: string}[] }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.items = (items || []).map(item => new Item(item));
  }
}

export interface QueryParam {
  name: string;
  value: string | number | boolean;
}

export type Rule = (param: string) => boolean | string;

export interface Input {
  name: string;
  label: string;
  rules: Rule[];
  model: string;
  type: 'sale' | 'item';
}

export type SaleForm = Pick<Sale, 'title' | 'description'>;

export type ItemForm = Pick<Item, 'description' | 'saleId'>
