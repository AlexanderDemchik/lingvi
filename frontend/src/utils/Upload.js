import * as tus from "tus-js-client";
import {uuidv4} from "./utils";
import axios from "axios";

class Upload extends tus.Upload {
  constructor(file, options) {
    super(file, options);
    this.id = uuidv4();
    this.onStart = options.onStart ? options.onStart : () => {};
    this.onAbort = options.onAbort ? options.onAbort : () => {};
  }

  async cancel() {
    this.abort();
    return axios.delete(this.url);
  }

  start() {
    this.onStart();
    return super.start();
  }

  abort() {
    this.onAbort();
    super.abort();
  }

  async get() {
    return (await axios.get(this.url)).data;
  }

  isComplete() {
    return this._offset === this._size;
  }
}

export default Upload;