const { User } = require("../models");

class Controller {
  static async readUser(req, res, next) {
    try {
      const user = await User.findOne({
        attributes: {exclude: ['password']},
        where: {
          email: req.loginInfo.email
        }
      })
      if(!user) throw {name: "NotFound"}
      console.log(user);

      res.status(200).json({
        user
      })

    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;
