const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const getWelcome = asyncHandler(async(req,res) => {
    res.status(200).send("Welcome 🙌 ");
})
const getUser = asyncHandler( async(req, res) =>{
    const users = await User.find()
       
    res.status(200).json(users)
})

const postUser = asyncHandler(async(req, res) => {
    const {pseudo, email, password} = req.body;
    //Vérifier si les champs sont remplits
    if(!pseudo || !email || !password){
        res.status(400)
        throw new Error('Svp remplissez tous les champs!')
    }
    //Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User existe dejà')
    }
    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        pseudo,
        email: email.toLowerCase(),
        password: hashedPassword,
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
    console.log(user.token)
    if(user){
        res.status(201).json(user)
    }else{
        res.status(400)
        throw new Error('Invalid User data')
    }
    
})

const loginUser = asyncHandler( async(req, res)  => {
    try {
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
        }

    res.status(400).send("Invalid Credentials");
        
    } catch (err) {
        console.log(err);
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
    postUser,
    loginUser,
    deleteUser
}