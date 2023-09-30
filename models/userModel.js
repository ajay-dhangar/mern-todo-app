const  User = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()


const SignUp = async (req,res)=>{
    const data = req.body

    const {email, password} = data

    try {
        const existingUser  = await User.findOne({email})

        if(existingUser){
            return res.status(402).json({message : 'User already registered'})

        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({email, password:hashedPassword})
        await newUser.save()

        const token = jwt.sign({UserId : newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'2d'} )

        return res.status(201).json({message:'User Successfully registered',email,token})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error Occured while Registration'})
    }

}

const Login = async(req,res)=>{
    const data = req.body

    const {email, password} = data

    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message:'User not found'})
        }

        const passwordMatch = await bcrypt.compare(password,user.password)

        if(!passwordMatch){
            return res.status(401).json({message:'Invalid Credential'})
        }

        const token = jwt.sign({user : user._id}, process.env.JWT_SECRET_KEY, {expiresIn:'2d'})

        return res.status(200).json({message:'User Logged In', email,token})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'error occured while log in'})
    }
}



module.exports = {SignUp,Login}