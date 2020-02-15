import AdventureView from '@/views/AdventureView.vue';
import QuestsView from '@/views/QuestsView.vue';
import TavernView from '@/views/TavernView.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tavern',
      component: TavernView
    },
    {
      path: '/adventure',
      name: 'adventure',
      component: AdventureView
    },
    {
      path: '/quests',
      name: 'quests',
      component: QuestsView
    }
  ],
});
