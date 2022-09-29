import { useStores } from "./useStores";

export const useClearStores = () => {
  const { authStore, jobStore } = useStores();
  return () => {
    authStore.resetStore();
    jobStore.resetStore();
  };
};
