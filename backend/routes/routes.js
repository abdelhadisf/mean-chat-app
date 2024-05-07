const express = require('express')

const userController = require('../controller/userController.js')
const bodyParser = require("body-parser"); 
var bp = bodyParser.urlencoded({ extended: false }); 
const cors = require('cors')
const router = express.Router();
router.use(cors({ origin: 'http://localhost:4200', // Set the allowed origin
 // Set the allowed HTTP methods
allowedHeaders: ['Content-Type', 'Authorization'], // Set the allowed headers
credentials: true}))

router.get("/user/getAll",userController.getData);
router.post("/users",userController.postData);
router.get('/api/users', userController.getByName);

router.patch("/user/update/:id",userController.patchData);
router.delete("/user/delete/:id",userController.removeData);

module.exports = router