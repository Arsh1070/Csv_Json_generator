import { Controller } from "../../helper/common/index.js";
import handleResponse from "../../service/response.js";
import SecondPageService from "./secondPageService.js";

class SecondPageController extends Controller {
  constructor(service, name) {
    super(service, name);
    this.saveTableData = this.saveTableData.bind(this);
    this.getAllTableResults = this.getAllTableResults.bind(this);
  }

  async saveTableData(req, res, next) {
    try {
      const result = await this.service.saveData(req);
      return handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
  async getAllTableResults(req, res, next) {
    try {
      req.query["filter"] = {};
      req.query["skip"] = req.query.offset || 0;
      let result = await this.service.findAll(req.query);
      return handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
}

export default new SecondPageController(SecondPageService, "SecondPageTable");
