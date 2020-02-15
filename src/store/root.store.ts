import { HeroesApi } from '@/api';
import { HeroClass } from '@/enums';
import { Hero } from '@/models';
import { AxiosResponse } from 'axios';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { Actions } from './actions';
import { Getters } from './getters';
import { Mutations } from './mutations';
import { QuestsModule } from './quests.module';
import { UiModule } from './ui.module';

Vue.use(Vuex);

const heroesApi: HeroesApi = new HeroesApi();

export interface RootState {
  headerTitle: string;
  headerSubtitle: string;
  heroes: Hero[];
  minHeroesRequired: number;
}

const RootStore: StoreOptions<RootState> = {
  state: {
    headerTitle: 'iTavern PRO',
    headerSubtitle: 'HEADER.SUBTITLE',
    heroes: [],
    minHeroesRequired: 3
  },

  getters: {
        [Getters.neededHeroes](state) {
          return state.heroes.length >= state.minHeroesRequired
              ? 0
              : state.minHeroesRequired - state.heroes.length;
        },

    [Getters.fightersNumber](state) {
      return state.heroes
          .filter((hero: Hero) => hero.class === HeroClass.Fighter)
          .length;
    },

    [Getters.roguesNumber](state) {
      return state.heroes
          .filter((hero: Hero) => hero.class === HeroClass.Rogue)
          .length;
    },

    [Getters.wizardsNumber](state) {
      return state.heroes
          .filter((hero: Hero) => hero.class === HeroClass.Wizard)
          .length;
    }
  },

  mutations: {
    [Mutations.heroes.setAll](state, heroes: Hero[]) {
      state.heroes = heroes;
    },

    [Mutations.heroes.addHero](state, hero: Hero) {
      state.heroes.push(hero);
    },

    [Mutations.heroes.removeHero](state, heroId: number) {
      state.heroes = state.heroes.filter((hero: Hero) => hero.id !== heroId);
    }
  },

  actions: {
    async [Actions.heroes.fetchAll]({ commit }) {
      commit(Mutations.ui.setLoadingState, true);
      const heroesResponse: AxiosResponse = await heroesApi.getHeroes();
      commit(Mutations.heroes.setAll, heroesResponse.data);
      commit(Mutations.ui.setLoadingState, false);
    },

    async [Actions.heroes.createHero]({ commit }, hero: Hero) {
      await heroesApi.createHero(hero);
      commit(Mutations.heroes.addHero, hero);
    },

    async [Actions.heroes.deleteHero]({ commit }, heroId: number) {
      await heroesApi.deleteHero(heroId);
      commit(Mutations.heroes.removeHero, heroId);
    }
  },

  modules: {
    quests: QuestsModule,
    ui: UiModule
  }
};

export default new Vuex.Store<RootState>(RootStore);
