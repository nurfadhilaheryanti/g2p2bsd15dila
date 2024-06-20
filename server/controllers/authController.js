const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class AuthController {
  static async register(req, res, next) {
    try {
      console.log(req.body);
      const { email, password, fullName, profilePict, phoneNumber } = req.body;
      const user = await User.create({ email, password, fullName, profilePict, phoneNumber});

      res.status(201).json({
        message: "Success create new user",
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      next(error); 
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: "InvalidLogin" }; 

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) throw { name: "LoginError" }; 

      if (!compare(password, user.password)) throw { name: "LoginError" };

      const payload = {
        id: user.id,
        email: user.email
      };
      
      const token = signToken(payload);
      // console.log(token, '<<<<');

      res.status(200).json({
        token,
        email: user.email,
        fullName: user.fullName,
        profilePict: user.profilePict,
        phoneNumber: user.phoneNumber
      });
    } catch (error) {
      next(error);
    }
  }

  // static async googleLogin(req, res, next) {
  //   try {
  //     const { token } = req.headers;
  //     const client = new OAuth2Client();

  //     const ticket = await client.verifyIdToken({
  //       idToken: token,
  //       audience: process.env.GOOGLE_CLIENT_ID,
  //     });

  //     const payload = ticket.getPayload();

  //     const [user, created] = await User.findOrCreate({
  //       where: {
  //         email: payload.email,
  //       },
  //       defaults: {
  //         fullName: payload.name,
  //         email: payload.email,
  //         password: "password_google",
  //         profilePict: "this is your profile pict",
  //         phoneNumber: "https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",
  //       },
  //       hooks: false,
  //     });

  //     const access_token = signToken({
  //       id: user.id,
  //       email: user.email,
  //     });

  //     res.status(200).json({ access_token });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = AuthController;
