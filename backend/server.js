const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
const routes = require("./routes/routes")
app.use(express.urlencoded({extended:false})) 
const http = require('http').Server(app);

const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:4200', // Replace with the origin of your frontend application
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  });

mongoose.connect("mongodb+srv://ad:1234@cluster0.4ppooxl.mongodb.net/chat",{
        useUnifiedTopology: true,
        useNewUrlParser: true,
})
    .then(() =>{
        console.log("DB Connected");
    })
    .catch((err) =>{
        console.log(err);
    })

    app.use(express.json())
    app.use(routes);
    app.use(cors())

   

    const users = [];
    const messages = [];
    
    io.on('connection', (socket) => {
      console.log('New client connected');
    
      // Handle the joinChat event
      socket.on('joinChat', (username) => {
        console.log(`User ${username} joined the chat`);
    
        const user = { id: socket.id, name: username };
        users.push(user);
    
        // Emit the users event to update the client with the current user list
        io.emit('users', users);
      });
    
      // Handle the sendMessage event
      socket.on('sendMessage', (data) => {
        console.log(`Message received: ${data.content}`);
    
        const message = {
          sender: data.sender,
          receiverId: data.receiverId,
          content: data.content
        };
    
        messages.push(message);
    
        
        io.emit('newMessage', message);
      });
    
      
      socket.on('disconnect', () => {
        console.log('Client disconnected');
    
        // Remove the user from the user list
        const index = users.findIndex((user) => user.id === socket.id);
        if (index !== -1) {
          users.splice(index, 1);
        }
    
        // Emit the users event to update the client with the updated user list
        io.emit('users', users);
      });
    });
    
    
      http.listen(5000, () => {
        console.log('Server is running on port 5000');
      });
      