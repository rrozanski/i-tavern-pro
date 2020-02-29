<template>
  <div class="card shadow">
    <div class="card-body">
      <table
          v-if="quests.length"
          class="table table-responsive-sm">
        <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Status</th>
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
              {{ quest.status }}
            </span>
          </td>
        </tr>
        </tbody>
      </table>
      <div
          v-else
          class="lead text-center my-5">
        There are no quests. Try again later.
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <router-link :to="{ name: 'tavern' }">
          <button
              type="button"
              class="btn btn-lg btn-dark">
            <i class="ra ra-beer"></i>
            Go back to Tavern
          </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { QuestStatus } from '@/enums';
    import { Quest } from '@/models';
    import Vue from 'vue';

    export default Vue.extend({
        name: 'QuestsView',
        computed: {
            quests(): Quest[] {
                return [
                    {
                        id: 1,
                        description: 'Save the dragon from the villagers.',
                        status: QuestStatus.Available
                    },
                    {
                        id: 2,
                        description: 'Kill all rats in the cellar.',
                        status: QuestStatus.InProgress
                    },
                    {
                        id: 3,
                        description: 'Negotiate peace with barbarians.',
                        status: QuestStatus.Completed
                    },
                ];
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
