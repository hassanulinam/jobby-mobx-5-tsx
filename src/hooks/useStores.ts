import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import AuthStore from "../stores/AuthStore";
import JobStore from "../stores/JobStore";

export interface UserStoreType {
  authStore: AuthStore;
  jobStore: JobStore;
}

export const useStores = (): UserStoreType => {
  const stores = useContext(MobXProviderContext);
  const { authStore, jobStore } = stores;
  return { authStore, jobStore };
};
