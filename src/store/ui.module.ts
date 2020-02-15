import { Actions } from '@/store/actions';
import { Mutations } from '@/store/mutations';
import { Module } from 'vuex';
import { RootState } from './root.store';

interface UiState {
    isLoading: boolean;
}

export const UiModule: Module<UiState, RootState> = {
    state: {
        isLoading: false
    },

    mutations: {
        [Mutations.ui.setLoadingState](state, isLoading: boolean) {
            state.isLoading = isLoading;
        }
    },

    actions: {
        [Actions.ui.setLoading]({commit}, isLoading: boolean) {
            commit(Mutations.ui.setLoadingState, isLoading);
        }
    }
};
