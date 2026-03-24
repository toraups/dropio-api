import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();

class Context {
  // Store a value
  static setContext(value, cb) {
    asyncLocalStorage.run(value, cb);
  }

  // Retrieve a value
  static getContext() {
    return asyncLocalStorage.getStore();
  }
}

export default Context;
