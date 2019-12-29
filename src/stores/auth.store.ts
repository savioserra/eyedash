import { observable, computed, action, runInAction } from "mobx";

export class AuthStore {
  @observable
  token: string = "";

  @observable
  loading: boolean = false;

  @computed
  get authenticated(): boolean {
    return Boolean(this.token);
  }

  @action
  async login() {
    this.loading = true;

    setTimeout(
      () =>
        runInAction("login", () => {
          this.loading = false;
        }),
      5e3
    );
  }
}
