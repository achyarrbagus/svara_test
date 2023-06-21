const CitySchema = require("../models/city.schema");

class CityController {
  static async CreateCity(req, res) {
    try {
      let reqData = {
        name: req.body.name,
      };

      let data = new CitySchema(reqData);

      let resp = await data.save();
      if (!resp) {
        return res.status(500).json({
          status: "failed",
          message: "Create City Failed",
        });
      }

      return res.status(201).json({
        status: "success",
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
        message: "Status Internal Server Error",
      });
    }
  }

  static async GetAllCity(req, res) {
    try {
      const data = await CitySchema.find();
      if (!data) {
        return res.status(404).json({
          error: error,
          message: "Data Not Found",
        });
      }
      return res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = CityController;
