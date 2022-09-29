import AuthStore from "./AuthStore";
import JobStore from "./JobStore";

const authStore = new AuthStore();

const jobStore = new JobStore();

export { authStore, jobStore };
