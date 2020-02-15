<template>
  <div class="card shadow">
    <section
        v-if="isLoading"
        class=" spinner-container">
      <b-spinner class="spinner"></b-spinner>
    </section>
    <section v-else>
      <div class="card-body">
        <table
            v-if="heroes.length"
            class="table table-responsive-sm">
          <thead class="thead-dark">
          <tr>
            <th></th>
            <th>
              {{ $t('HERO_LIST.NAME') }}
            </th>
            <th>
              {{ $t('HERO_LIST.GENDER') }}
            </th>
            <th>
              {{ $t('HERO_LIST.RACE') }}
            </th>
            <th>
              {{ $t('HERO_LIST.CLASS') }}
            </th>
            <th>
              <i class="ra ra-cog"></i>
            </th>
          </tr>
          </thead>
          <tbody
              is="transition-group"
              name="table-row">
          <tr
              v-for="hero in heroes"
              :key="hero.id">
            <td>
              <img
                  :src="getAvatarUrl(hero.class)"
                  alt="Hero Avatar"
                  class="hero-avatar">
            </td>
            <td>
              {{ hero.name }}
            </td>
            <td>
              {{ $t(`GENDER_OPTIONS.${hero.gender}`) }}
            </td>
            <td>
              {{ $t(`RACE_OPTIONS.${hero.race}`) }}
            </td>
            <td>
              {{ $tc(`CLASS_OPTIONS.${hero.class}`, 1) }}
            </td>
            <td>
              <i
                  @click="removeHero(hero.id)"
                  class="ra ra-skull"></i>
            </td>
          </tr>
          </tbody>
        </table>
        <div
            v-else
            class="lead text-center my-5">
          {{ $t('HERO_LIST.NO_HEROES_MESSAGE') }}
        </div>
        <party-summary></party-summary>
        <div class="row mt-5">
          <div class="col-6">
            <router-link :to="{ name: 'quests' }">
              <button
                  type="button"
                  class="btn btn-lg btn-outline-dark">
                <i class="ra ra-scroll-unfurled"></i>
                {{ $t('HERO_LIST.QUESTS_BUTTON') }}
              </button>
            </router-link>
          </div>
          <div class="col-6 text-right">
            <button
                @click="createHero"
                type="button"
                class="btn btn-lg btn-dark">
              <i class="ra ra-player-thunder-struck"></i>
              {{ $t('HERO_LIST.CREATE_HERO_BUTTON') }}
            </button>
          </div>
        </div>
      </div>

      <new-hero-form :show-new-hero-form.sync="showNewHeroForm"></new-hero-form>
    </section>
  </div>
</template>

<script lang="ts">
    import NewHeroForm from '@/components/NewHeroForm.vue';
    import PartySummary from '@/components/PartySummary.vue';
    import { HeroClass } from '@/enums';
    import { isLoadingMixin } from '@/mixins';
    import { Hero } from '@/models/hero.model';
    import { Actions } from '@/store';
    import Vue from 'vue';
    import VueI18n from '../i18n';

    export default Vue.extend({
        name: 'HeroList',
        components: {
            NewHeroForm,
            PartySummary
        },
        mixins: [
            isLoadingMixin
        ],
        data() {
            return {
                showNewHeroForm: false
            };
        },
        computed: {
            heroes(): Hero[] {
                return this.$store.state.heroes;
            }
        },
        methods: {
            getAvatarUrl(heroClass: HeroClass): string {
                const baseUrl = '../assets/images/';

                switch (heroClass) {
                    case HeroClass.Fighter:
                        return `${baseUrl}dwarf-helmet.svg`;
                    case HeroClass.Rogue:
                        return `${baseUrl}hood.svg`;
                    case HeroClass.Wizard:
                        return `${baseUrl}wizard-face.svg`;
                    default:
                        return '';
                }
            },
            removeHero(heroId: string): void {
                const confirmation = confirm(VueI18n.t('HERO_LIST.REMOVE_HERO_CONFIRMATION').toString());

                if (confirmation) {
                    this.$store.dispatch(Actions.heroes.deleteHero, heroId);
                }
            },
            createHero(): void {
                this.showNewHeroForm = true;
            }
        }
    });
</script>

<style scoped lang="scss">
  @import '../styles/components/hero-list';
</style>
