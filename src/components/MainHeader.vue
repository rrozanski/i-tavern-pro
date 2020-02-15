<template>
  <div class="header">
    <div class="container">
      <div>
        <div class="title">
          {{ title }}
        </div>
        <div class="subtitle">
          {{ subtitle }}
        </div>
      </div>
      <div class="logo">
        <img
            src="../assets/images/hanging-sign.svg"
            alt="iTavern Logo">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import VueI18n from '../i18n';
    import { mapState } from 'vuex';

    export default Vue.extend({
        name: 'MainHeader',
        computed: {
            title(): string {
                return this.$store.state.headerTitle;
            },
            subtitle(): string {
                return VueI18n.t(this.$store.state.headerSubtitle).toString();
            }
        }
        // computed: mapState({
        //     title: 'headerTitle',
        //     subtitle: 'headerSubtitle'
        // })
    });
</script>

<style scoped lang="scss">
  @import '../styles/components/main-header';
</style>
