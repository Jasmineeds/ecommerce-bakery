const validator = require('validator')
const zxcvbn = require('zxcvbn') // test password strong or weak by score 0-4
const userService = require('../services/userService')
const { CError } = require('../middleware/error-handler')

const userController = {

  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const { status, message, token, user } = await userService.signIn(email, password)
      return res.json({
        status,
        message,
        token,
        user
      })
    } catch (error) {
      next(error)
    }
  },

  signUp: async (req, res, next) => {
    try {
      const { firstName, lastName, gender, email, password, termsAgreement } = req.body
      // Error: required items
      if (!email || email.trim() === '') throw new CError('email is required', 400)
      if (!validator.isEmail(email)) throw new CError('email is invalidated', 400)
      if (!password || password.trim() === '') throw new CError('password is required', 400)
      // Error: limitation
      if (firstName.length > 50 || lastName.length > 50) throw new CError('exceed word limit', 400)
      if (!['male', 'female', 'other', ''].includes(gender)) throw new CError('gender input error', 400)
      // Error: agreement checkbox
      if (!termsAgreement) throw new CError('must agree to it', 400)

      const { status, message, token, user } = await userService.signUp(firstName, lastName, gender, email, password)
      return res.json({
        status,
        message,
        token,
        user
      })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = userController