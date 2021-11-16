"use strict";

const faker = require("faker");

const PORT = process.env.PORT || 3020;
const io = require("socket.io")(PORT);

io.on("connection", (socket) => {
  console.log("socket is connected", socket.id);
});

const caps = io.of("/caps");

let time;

caps.on("connection", (socket) => {
  console.log(`client ${socket.id} is connected to  name space: ${caps}`);

  socket.on("pickUp", (payload) => {
      const event = "pickUp";
      time = new Date();
    console.log("EVENT", { event, time, payload });
    caps.emit("pickUp", payload);
  });

  socket.on("in-transit", (payload) => {
    const event = "in-transit";
    time = faker.date.soon();
  console.log("EVENT", { event, time, payload });
  caps.emit('in-transit', payload);
  });

  socket.on("delivered", (payload) => {
   const event = "delivered";
   time = faker.date.future();
  console.log("EVENT", { event, time, payload });
  caps.emit('delivered',payload);
  });
});

