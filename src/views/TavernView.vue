<template>
  <section>
    <div class="row">
      <div class="col-12">
        <HeroList></HeroList>
      </div>
      <div
          v-if="!isLoading"
          class="col-12">
        <EmbarkSection></EmbarkSection>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <Footer></Footer>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import EmbarkSection from '@/components/EmbarkSection.vue';
  import Footer from '@/components/Footer.vue';
  import HeroList from '@/components/HeroList.vue';
  import { isLoadingMixin } from '@/mixins';
  import { Actions } from '@/store';
  import Vue from 'vue';

  export default Vue.extend({
    name: 'TavernView',
    components: {
      EmbarkSection,
      Footer,
      HeroList
    },
    mixins: [
      isLoadingMixin
    ],
    created() {
      this.$store.dispatch(Actions.heroes.fetchAll);
    }
  });
</script>
