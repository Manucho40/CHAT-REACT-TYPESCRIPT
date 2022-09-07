const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const getWelcome = asyncHandler(async(req,res) => {
    res.status(200).json(req.user)
})

const getUser  = asyncHandler( async(req, res, next) =>{
    try {
        const users = await User.find({_id: {$ne: req.params.id}}).select([
            "_id",
            "pseudo",
            "email",
            "avatar"
        ])
        res.status(200).json(users)
    } catch (ex) {
        next(ex)
    }
    // const users = await User.find()
       
    // res.status(200).json(users)
})

const registerUser = asyncHandler(async(req, res) => {
    const {pseudo, email, password, avatar} = req.body;
    //Vérifier si les champs sont remplits
    if(!pseudo || !email || !password){
        res.status(400)
        throw new Error('Svp remplissez tous les champs!')
    }
    //Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('Email existe dejà')
    }
    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        pseudo,
        email: email.toLowerCase(),
        password: hashedPassword,
        avatar,
    })
    const toke = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = toke;
    await user.save();
    if(user){
        res.status(201).json({
            _id: user.id,
            pseudo: user.pseudo,
            email: user.email,
            token: user.token,
            avatar: user.avatar
          })
    }else{
        res.status(400)
        throw new Error('Invalid User data')
    }
    
})

const loginUser = asyncHandler( async(req, res)  => {
        const {pseudo, password}= req.body;
        if(!(pseudo && password)){
            res.status(400).send("Tous les champs sont requis");
        }
        const user = await User.findOne({pseudo});
        
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                { user_id: user._id, pseudo },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
              user.token = token;
              res.status(200).json(user); 
        }else{
            res.status(400)
            throw new Error('Les identifiants ne correspondent pas !')
    
        }        
    

    
})

const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);

    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    await user.remove();
    res.status(200).json({id: req.params.id})

})

module.exports = {
    getWelcome,
    getUser,
    registerUser,
    loginUser,
    deleteUser
}