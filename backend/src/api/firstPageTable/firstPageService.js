import { Service } from "../../helper/common/index.js";
import FirstPageTable from "./firstPageModel.js";

class FirstPageService extends Service {
  constructor(model) {
    super(model);
  }
}

export default new FirstPageService(FirstPageTable);
