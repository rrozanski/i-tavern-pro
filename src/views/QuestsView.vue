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
            v-if="quests.length"
            class="table table-responsive-sm">
          <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th>
              {{ $t(`QUESTS.NAME`) }}
            </th>
            <th>
              {{ $t(`QUESTS.STATUS`) }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(quest, index) in quests"
              :key="quest.id">
            <td>
              {{ index + 1 }}
            </td>
            <td>
              {{ quest.description }}
            </td>
            <td>
            <span
                :class="getBadgeClass(quest.status)"
                class="badge">
              {{ $t(`QUESTS.STATUS_OPTIONS.${quest.status}`) }}
            </span>
            </td>
          </tr>
          </tbody>
        </table>
        <div
            v-else
            class="lead text-center my-5">
          {{ $t(`QUESTS.NO_QUESTS_MESSAGE`) }}
        </div>
        <div class="row mt-5">
          <div class="col-12">
            <router-link :to="{ name: 'tavern' }">
              <button
                  type="button"
                  class="btn btn-lg btn-dark">
                <i class="ra ra-beer"></i>
                {{ $t(`QUESTS.GO_BACK_BUTTON`) }}
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
    import { QuestStatus } from '@/enums';
    import { isLoadingMixin } from '@/mixins';
    import { Quest } from '@/models';
    import { Actions } from '@/store';
    import Vue from 'vue';

    export default Vue.extend({
        name: 'QuestsView',
        mixins: [
            isLoadingMixin
        ],
        created() {
            this.$store.dispatch(Actions.quests.fetchAll);
        },
        computed: {
            quests(): Quest[] {
                return this.$store.state.quests.items;
            }
        },
        methods: {
            getBadgeClass(status: QuestStatus): string {
                const classPrefix: string = 'badge-';

                switch (status) {
                    case QuestStatus.Available:
                        return `${classPrefix}info`;
                    case QuestStatus.InProgress:
                        return `${classPrefix}warning`;
                    case QuestStatus.Completed:
                        return `${classPrefix}success`;
                    default:
                        return '';
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
  @import '../styles/views/quests';
</style>
