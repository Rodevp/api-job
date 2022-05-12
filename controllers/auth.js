const UserModel = require('../models/user.js')

const register = async (req, res) => {

    const user = await User.create({ ...req.body })
    const token = UserModel.createJWT()
    return res.status(201).json({ user: { name: user.name }, token })

}

const login = async (req, res) => {
    
    const { email, password } = req.body
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }
    
    const user = await User.findOne({ email })
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' })
    }
    
    const isPasswordCorrect = await user.comparePassword(password)
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid Credentials' })
    }
    
    const token = UserModel.createJWT()
    return res.status(201).json({ user: { name: user.name }, token })

}


module.exports = {
    register,
    login
}