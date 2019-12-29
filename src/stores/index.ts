import { configure } from "mobx";
import { AuthStore } from "./auth.store";

configure({ enforceActions: "observed" });

export default {
  auth: new AuthStore()
};
