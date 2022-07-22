const express = require('express'); //Affectation de la librairie express dans la constante express.
const router = express.Router() // Affectation de la méthode Router() dans la constante router.
const auth = require("../middleware/auth");
// Utilisation du destructuring pour affecter les fonctions exporté du controllers userController dans des constantes
const {getUser, postUser, loginUser, deleteUser, getWelcome} = require('../controllers/userController')
router.get('/user', getUser)
router.post('/user', postUser)
router.post('/user/login', loginUser)
router.delete('/user/:id', deleteUser)
router.post("/welcome", auth, getWelcome)
module.exports = router;