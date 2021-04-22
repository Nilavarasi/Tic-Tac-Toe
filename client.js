//read commands from cli
var readcommand=require("readcommand");
//connect to the server at localhost:5050
var socket = require("socket.io-client")(
  `http://localhost:5050/`
);


socket.on("event", function(data) {
  console.log(data);
});


socket.on("disconnect", function(data) {
  process.exit(0);
});


socket.on("msg", function (data) {
  console.log(data);
});


readcommand.loop(function(err, args, str, next) {
  if (args[0] == "r") { //Program will stop when the player types 'r'
    console.log("Exited");
    process.exit(0);
  }

  // Check the player is sending the number from 1 to 9
  if (args[0] <= 9 && args[0] >= 1) {
    socket.emit("entry", args[0]);
  } else {
    console.log("Invalid move, Cannot a make a move, Please choose number between 1-9.");
  }
  return next();
});
