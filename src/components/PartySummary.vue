<template>
  <div class="text-muted small ml-3">
    {{ $tc('CLASS_OPTIONS.FIGHTER', fighters) }}: {{ fighters | noValue }} |
    {{ $tc('CLASS_OPTIONS.ROGUE', rogues) }}: {{ rogues | noValue }} |
    {{ $tc('CLASS_OPTIONS.WIZARD', wizards) }}: {{ wizards | noValue }}
  </div>
</template>

<script lang="ts">
    import { Getters } from '@/store';
    import Vue from 'vue';

    export default Vue.extend({
        name: 'PartySummary',
        computed: {
            fighters(): number {
                return this.$store.getters[Getters.fightersNumber];
            },
            rogues(): number {
                return this.$store.getters[Getters.roguesNumber];
            },
            wizards(): number {
                return this.$store.getters[Getters.wizardsNumber];
            }
        },
    });
</script>
