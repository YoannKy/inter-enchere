import Vue from 'vue';
import VueRouter from 'vue-router';
import SaleCreateComponent from '@/components/sale/create/create.component';
import SaleListComponent from '@/components/sale/list/list.component';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'list',
    component: SaleListComponent,
  },
  {
    path: '/create',
    name: 'create',
    component: SaleCreateComponent,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
