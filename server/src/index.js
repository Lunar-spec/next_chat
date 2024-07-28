'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    let { Server } = require("socket.io");

    let io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "*",
      },
    });

    strapi.io = io;

    const activeUsers = new Set();

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('join', ({ username }) => {
        console.log(`${username} joined the chat`);
        socket.username = username;
        activeUsers.add(username);

        io.emit('updateActiveUsers', Array.from(activeUsers));
      });

      socket.on('sendMessage', async ({ username, text }) => {
        try {
          const message = await strapi.controllers['api::message.message'].createMessage({
            request: {
              body: {
                content: text,
                sender: username,
              }
            }
          });
          console.log('Message created via socket:', message);
        } catch (error) {
          console.error('Error saving message:', error);
        }
      });

      socket.on('disconnect', () => {
        if (socket.username) {
          activeUsers.delete(socket.username);

          io.emit('updateActiveUsers', Array.from(activeUsers));
        }
      });
    });

    strapi.io = io;

  }
};
