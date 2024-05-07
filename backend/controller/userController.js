const mongoose  = require("mongoose")
const employees = require("./userModel")

const getData =  (req,res) =>{
     employees.find().then((results) =>{
        console.log(results);
        res.json(results)
     })
       
}

const postData = (req,res) =>{
    const {name,address} = req.body;
    const newUser = new employees({name:name,address:address})
    newUser.save()
    .then(() => {
      res.status(201).json({ message: 'User added successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to add user' });
      console.log(error);
    });

}

const patchData = (req,res) =>{
    
    const {name,address} = req.body;
    const id = req.params.id;
    employees.findByIdAndUpdate(id,{name:name,address:address})
    .then(() => {
        res.status(201).json({ message: 'User updated successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to update user' });
        console.log(id);
        console.log(error);
      })
}
const getByName = async (req, res) => {
  const { name } = req.query;

  try {
    const user = await employees.findOne({ name });
    if (user) {
      res.json([user]);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const removeData = (req,res) =>{
    const id = req.params.id;
    employees.findByIdAndDelete(id).then(() =>{
        res.status(201).json({ message: 'User deleted successfully' });
    })
}

module.exports = {getData,postData,patchData,removeData,getByName}