"use strict";
/**
 * message controller
*/

const { factories } = require('@strapi/strapi');
const { createCoreController } = factories;

module.exports = createCoreController('api::message.message', ({ strapi }) => ({
    // Extend the core controller
    ...createCoreController('api::message.message'),

    // Custom method to get recent messages
    async getRecentMessages(ctx) {
        try {
            const messages = await strapi.entityService.findMany('api::message.message', {
                sort: { createdAt: 'desc' },
                limit: 50, // Get last 50 messages
                populate: ['sender'], // If you have a relation to a user model
            });

            ctx.body = messages.reverse(); // Reverse to get oldest first
        } catch (err) {
            ctx.body = err;
            ctx.status = 500;
        }
    },

    // Custom method to create a message
    async createMessage(ctx) {
        try {
            const { content, sender } = ctx.request.body;

            if (!content || !sender) {
                ctx.status = 400;
                return ctx.body = { error: 'Content and sender are required' };
            }

            const message = await strapi.entityService.create('api::message.message', {
                data: {
                    content,
                    sender,
                    publishedAt: new Date(), // If you're using draft/publish system
                },
            });

            console.log(message);

            strapi.io.emit('message', message);

            ctx.body = message;
            return ctx;
        } catch (err) {
            ctx.body = err;
            ctx.status = 500;
        }
    },
}));