import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import AuthStore from "../stores/AuthStore";
import JobStore from "../stores/JobStore";

export interface StoresHook {
  authStore: AuthStore;
  jobStore: JobStore;
}

export const useStores = (): StoresHook => {
  const stores = useContext(MobXProviderContext);
  const { authStore, jobStore } = stores;
  return { authStore, jobStore };
};
