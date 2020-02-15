import { QuestsApi } from '@/api/quests.api';
import { Quest } from '@/models';
import { Actions } from '@/store/actions';
import { Mutations } from '@/store/mutations';
import { AxiosResponse } from 'axios';
import { Module } from 'vuex';
import { RootState } from './root.store';

const questApi: QuestsApi = new QuestsApi();

interface QuestsState {
    items: Quest[];
}

export const QuestsModule: Module<QuestsState, RootState> = {
    state: {
        items: []
    },

    mutations: {
        [Mutations.quests.setAll](state, quests: Quest[]) {
            state.items = quests;
        }
    },

    actions: {
        async [Actions.quests.fetchAll]({commit}) {
            commit(Mutations.ui.setLoadingState, true);
            const questsResponse: AxiosResponse = await questApi.getQuests();
            commit(Mutations.quests.setAll, questsResponse.data);
            commit(Mutations.ui.setLoadingState, false);
        }
        // [Actions.quests.fetchAll]({commit}) {
        //     questApi.getQuests()
        //         .then(
        //             ((questsResponse: AxiosResponse) => commit(Mutations.quests.setAll, questsResponse.data))
        //         );
        // }
    }
};
