import {uuidv4} from "./utils";

class FakeUpload {
  constructor(result) {
    this.id = uuidv4();
    this.result = result;
  }

  isComplete() {
    return true;
  }

  cancel() {

  }
}

export default FakeUpload;