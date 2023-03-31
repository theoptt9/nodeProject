'use strict';

const Nodemailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');
const Boom = require('boom');

module.exports = class MailerService extends Service {

    async sendAMail(to, subject, text) {

        const transporter = Nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const message = {
            from: process.env.MAIL_FROM_ADDRESS,
            to,
            subject,
            text
        };

        try {
            await transporter.sendMail(message);
        }
        catch (err) {
            throw Boom.badImplementation('Error during sending email', err);
        }
    }
    async sendWelcomeEmail(to, username) {

        await this.sendAMail(to, `Hello ${username}`, `Welcome to our movie website ${username}`);
    }

    async sendNewMovieEmail(title) {

        const { userService } = this.server.services();
        const users = await userService.getAll();
        const mailList = users.map((user) => user.mail);
        await this.sendAMail(mailList, `We have a new movie : ${title}`, `We have a new movie in our catalog : ${title}`);
    }

    async sendUpdateMovieEmail(title, movieId) {

        const { favoriteService } = this.server.services();
        const { userService } = this.server.services();
        const favorites = await favoriteService.getByMovieId(movieId);
        if (favorites.length === 0) {
            Boom.badRequest('No favorites for this movie');
        }

        const mailList = [];
        for (const favorite of favorites) {
            const user = await userService.getOneById(favorite.userId);
            mailList.push(user.mail);
        }

        await this.sendAMail(mailList, `We have an update for the movie : ${title}`, `We have an update for the movie : ${title}`);
    }
};
