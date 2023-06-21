const UserSchema = require("../models/user.schema");
const CitySchema = require("../models/city.schema");

class UserController {
  static async Register(req, res) {
    try {
      let city = await CitySchema.findOne({ _id: req.body.cityId });

      if (!city) {
        return res.status(404).json({
          status: "failed",
          message: "Not Exist On Collection City",
        });
      }

      let hobbiesReq = [];

      for (let x = 0; x < req.body.hobbies.length; x++) {
        hobbiesReq.push(req.body.hobbies[x]);
      }

      let reqData = {
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        cityId: city._id,
        hobbies: hobbiesReq,
      };

      if (reqData.password != reqData.confirm_password) {
        res.status(500).json({
          status: "failed",
          message: "not macth password",
        });
      }

      let data = new UserSchema(reqData);

      let resp = await data.save();
      if (!resp) {
        return res.status(500).json({
          status: "failed",
          message: "Register Failed",
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

  static Login(req, res) {
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    const { email, password } = req.body;

    // Validasi email
    if (!isValidEmail(email)) {
      return res.status(401).json({
        email: "string, non well-formatted email",
        password: "string",
      });
    }

    // Validasi password
    if (typeof password !== "string") {
      return res.status(401).json({
        email: "string, non well-formatted email",
        password: "string",
      });
    }

    console.log(email, password);

    UserSchema.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            error: "User not found",
            message: "User with the provided email not found",
          });
        }
        return user;
      })
      .then((user) => {
        if (user.password !== password) {
          return res.status(401).json({
            email: "string, non well-formatted email",
            password: "string",
          });
        }
        // Validasi password
        if (user.password !== password) {
          return res.status(401).json({
            email: "string, non well-formatted email",
            password: "string",
          });
        }

        let date = new Date();
        user.last_login = date;

        user.save();

        return res.status(200).json({
          status: "success",
          data: user,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          message: "Internal Server Error",
        });
      });
  }
  static async GetAllUser(req, res) {
    try {
      const data = await UserSchema.find();
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

  static async GetUser(req, res) {
    try {
      const id = req.params.id;

      let data = await UserSchema.findOne({ _id: id });
      if (!data) {
        return res.status(404).json({
          error: "User not found",
          message: "User with the provided ID not found",
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

  static async UpdatePassword(req, res) {
    try {
      const { email, password, new_password } = req.body;

      let data = await UserSchema.findOne({ email: email });

      if (data.last_login === null) {
        return res.status(201).json({
          status: "failed",
          message: "please login first",
        });
      }

      if (data.password !== password) {
        return res.status(201).json({
          status: "failed",
          message: "Current Password Does Not Macth",
        });
      }

      data.password = new_password;

      await data.save();

      return res.status(200).json({
        status: "succees",
        message: "Change Password Succees",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Status Internal Server Error",
      });
    }
  }

  static async DeleteAccount(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      let result = await UserSchema.deleteOne({
        _id: id,
      });

      if (!result) {
        return res.status(404).json({
          error: "User not found",
          message: "User with the provided ID not found",
        });
      }

      return res.status(200).json({
        status: "Delete Account Success",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = UserController;
