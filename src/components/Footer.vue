<template>
  <div class="row mt-4">
    <div class="col-12">
      <select
          v-model="$i18n.locale"
          class="form-control language-select">
        <option
            v-for="(language, index) in languages"
            :key="`language-${index}`"
            :value="language">
          {{ $t(`LANGUAGES.${language.toUpperCase()}`) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'Footer',
        data() {
            return {
                languages: ['en', 'pl']
            };
        }
    });
</script>

<style scoped lang="scss">
@import '../styles/components/footer';
</style>
