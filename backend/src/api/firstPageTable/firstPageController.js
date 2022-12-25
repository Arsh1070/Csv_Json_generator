import { Controller } from "../../helper/common/index.js";
import FirstPageService from "./firstPageService.js";
import handleResponse from "../../service/response.js";
import FirstPageTable from "./firstPageModel.js";

class FirstPageController extends Controller {
  constructor(service, name) {
    super(service, name);
    this.saveFormData = this.saveFormData.bind(this);
    this.getFirstPageTableResults = this.getFirstPageTableResults.bind(this);
    this.updateTableRow = this.updateTableRow.bind(this);
  }

  async saveFormData(req, res, next) {
    try {
      let existingEmail = await FirstPageTable.findOne({
        email: req.body.email,
      });
      if (existingEmail) {
        return handleResponse.existing(res, existingEmail);
      } else {
        const result = await this.service.create(req.body);
        return handleResponse.success(res, result);
      }
    } catch (e) {
      next(e);
    }
  }

  async getFirstPageTableResults(req, res, next) {
    try {
      req.query["filter"] = {};
      req.query["skip"] = req.query.offset || 0;
      let result = await this.service.findAll(req.query);
      return handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }

  async updateTableRow(req, res, next) {
    try {
      let id = req.body._id;
      await this.service.update(id, req.body);
      return handleResponse.success(res);
    } catch (e) {
      next(e);
    }
  }

  async deleteTableRow(req, res, next) {
    try {
      let id = req.body._id;
      // const result = await this.service.remove(id);
      const result = await FirstPageTable.findOneAndDelete({ _id: id });
      return handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
}

export default new FirstPageController(FirstPageService, "FirstPageTable");
