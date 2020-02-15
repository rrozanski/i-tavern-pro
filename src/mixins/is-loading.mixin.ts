export const isLoadingMixin = {
    computed: {
        isLoading(): boolean {
            // @ts-ignore
            return this.$store.state.ui.isLoading;
        }
    }
};
