const express = require('express'); //Affectation de la librairie express dans la constante express.
const router = express.Router() // Affectation de la méthode Router() dans la constante router.
const auth = require("../middleware/auth");
// Utilisation du destructuring pour affecter les fonctions exporté du controllers userController dans des constantes
const {getUserAll, getUser, registerUser, loginUser, deleteUser, getWelcome, searchUser} = require('../controllers/userController')
router.get('/userAll', getUserAll)
router.get('/users/:id', getUser)
router.post('/user', registerUser)
router.post('/user/login', loginUser)
router.delete('/user/:id', deleteUser)
router.get("/user/welcome", auth, getWelcome)
router.get("/user/welcome", auth, getWelcome)
router.get('/users/', searchUser)

module.exports = router;