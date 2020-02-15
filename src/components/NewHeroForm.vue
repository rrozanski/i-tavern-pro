<template>
  <b-modal
      v-model="showNewHeroForm"
      :hide-header-close="true"
      :no-close-on-esc="true"
      :no-close-on-backdrop="true"
      size="lg">
    <div slot="modal-header">
      <h4>
        {{ $t('NEW_HERO_FORM.TITLE') }}
      </h4>
    </div>
    <div class="row my-1 mx-3">
      <div class="col-sm-12 col-md-6">
        <form>
          <div class="form-group">
            <label for="heroName">
              {{ $t('NEW_HERO_FORM.NAME') }}
            </label>
            <input
                v-model="$v.hero.name.$model"
                v-focus
                type="text"
                class="form-control"
                id="heroName">
            <div
                v-if="!$v.hero.name.required && $v.hero.name.$dirty"
                class="invalid-feedback">
              {{ $t('FORM_ERRORS.REQUIRED') }}
            </div>
            <div
                v-if="!$v.hero.name.maxLength && $v.hero.name.$dirty"
                class="invalid-feedback">
              {{ $t('FORM_ERRORS.MAX_LENGTH', { max: 100 }) }}
            </div>
          </div>
          <div class="form-group">
            <label for="heroGender">
              {{ $t('NEW_HERO_FORM.GENDER') }}
            </label>
            <select
                v-model="$v.hero.gender.$model"
                class="form-control"
                id="heroGender">
              <option></option>
              <option
                  v-for="gender in genderOptions"
                  :value="gender">
                {{ $t(`GENDER_OPTIONS.${gender}`) }}
              </option>
            </select>
            <div
                v-if="!$v.hero.gender.required && $v.hero.gender.$dirty"
                class="invalid-feedback">
              {{ $t('FORM_ERRORS.REQUIRED') }}
            </div>
          </div>
          <div class="form-group">
            <label for="heroRace">
              {{ $t('NEW_HERO_FORM.RACE') }}
            </label>
            <select
                v-model="$v.hero.race.$model"
                class="form-control"
                id="heroRace">
              <option></option>
              <option
                  v-for="race in raceOptions"
                  :value="race">
                {{ $t(`RACE_OPTIONS.${race}`) }}
              </option>
            </select>
            <div
                v-if="!$v.hero.race.required && $v.hero.race.$dirty"
                class="invalid-feedback">
              {{ $t('FORM_ERRORS.REQUIRED') }}
            </div>
          </div>
          <div class="form-group">
            <label for="heroClass">
              {{ $t('NEW_HERO_FORM.CLASS') }}
            </label>
            <select
                v-model="$v.hero.class.$model"
                class="form-control"
                id="heroClass">
              <option></option>
              <option
                  v-for="heroClass in classOptions"
                  :value="heroClass">
                {{ $tc(`CLASS_OPTIONS.${heroClass}`, 1) }}
              </option>
            </select>
            <div
                v-if="!$v.hero.class.required && $v.hero.class.$dirty"
                class="invalid-feedback">
              {{ $t('FORM_ERRORS.REQUIRED') }}
            </div>
          </div>
        </form>
      </div>
      <div class="col-sm-12 col-md-6">
        <hero-abilities @hero-abilities="getHeroAbilities($event)"></hero-abilities>
      </div>
    </div>
    <div slot="modal-footer">
      <button
          @click="cancel"
          type="button"
          class="btn btn-lg btn-dark action-button mr-3">
        <i class="ra ra-sideswipe"></i>
        {{ $t('NEW_HERO_FORM.CANCEL_BUTTON') }}
      </button>
      <button
          :disabled="$v.$invalid"
          @click="submit"
          type="button"
          class="btn btn-lg btn-dark action-button">
        <i class="ra ra-player-thunder-struck"></i>
        {{ $t('NEW_HERO_FORM.CREATE_HERO_BUTTON') }}
      </button>
    </div>
  </b-modal>
</template>

<script lang="ts">
    import HeroAbilities from '@/components/HeroAbilities.vue';
    import { Gender, HeroClass, Race } from '@/enums';
    import { Actions } from '@/store';
    import Vue from 'vue';
    import { between, maxLength, maxValue, minValue, required } from 'vuelidate/lib/validators';

    export default Vue.extend({
        name: 'NewHeroForm',
        components: {
            HeroAbilities
        },
        props: {
            showNewHeroForm: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                hero: {
                    name: '',
                    gender: '',
                    race: '',
                    class: '',
                    abilities: {
                        dexterity: 0,
                        strength: 0,
                        wisdom: 0
                    }
                },
                genderOptions: Gender,
                raceOptions: Race,
                classOptions: HeroClass,
            };
        },
        validations: {
            hero: {
                name: {
                    required,
                    maxLength: maxLength(100),
                },
                gender: {
                    required
                },
                race: {
                    required
                },
                class: {
                    required
                },
                abilities: {
                    dexterity: {
                        minValue: minValue(1),
                        maxValue: maxValue(20),
                    },
                    strength: {
                        between: between(1, 20)
                    },
                    wisdom: {
                        between: between(1, 20)
                    }
                }
            }
        },
        methods: {
            submit() {
                this.$store.dispatch(Actions.heroes.createHero, { ...this.hero, id: new Date().getTime().toString() });
                this.clearForm();
                this.$emit('update:showNewHeroForm', false);
            },
            cancel() {
                this.clearForm();
                this.$emit('update:showNewHeroForm', false);
            },
            clearForm(): void {
                this.hero = {
                    name: '',
                    gender: '',
                    race: '',
                    class: '',
                    abilities: {
                        dexterity: 0,
                        strength: 0,
                        wisdom: 0
                    }
                };

                this.$v.$reset();
            },
            getHeroAbilities(abilities: { dexterity: number, strength: number, wisdom: number }): void {
                this.hero.abilities = { ...abilities };
            }
        }
    });
</script>

<style scoped lang="scss">
  @import '../styles/components/new-hero-form';
</style>
