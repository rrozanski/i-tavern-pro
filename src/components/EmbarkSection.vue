<template>
  <div class="card shadow mt-5">
    <div class="card-body">
      <div class="row">
        <div class="col-xs-12 col-sm-8">
          <div v-if="neededHeroes > 0">
            <div class="lead">
              {{ $t('EMBARK_SECTION.PARTY_NOT_READY_MESSAGE') }}
            </div>
            <div class="note">
              {{ $tc('EMBARK_SECTION.NOT_ENOUGH_HEROES_MESSAGE', neededHeroes, { neededHeroes }) }}
            </div>
          </div>
          <div
              v-else
              class="lead mb-3 mb-sm-0">
            {{ $t('EMBARK_SECTION.PARTY_READY_MESSAGE') }}
          </div>
        </div>
        <div class="col-xs-12 col-sm-4">
          <button
              type="button"
              class="btn btn-lg btn-dark"
              :disabled="neededHeroes > 0"
              @click="embark">
            <i class="ra ra-crossed-swords"></i>
            {{ $t('EMBARK_SECTION.EMBARK_BUTTON') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { Getters } from '@/store';
    import Vue from 'vue';

    export default Vue.extend({
        name: 'EmbarkSection',
        computed: {
            neededHeroes(): number {
                return this.$store.getters[Getters.neededHeroes];
            }
        },
        methods: {
            embark() {
                this.$router.push({ name: 'adventure' });
            }
        }
    });
</script>

<style scoped lang="scss">
  @import '../styles/components/embark-section';
</style>
