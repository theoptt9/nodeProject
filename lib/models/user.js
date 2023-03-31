'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('The firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('The lastname of the user'),
            password: Joi.string().min(8).example('secretPassword').description('The password of the user'),
            mail: Joi.string().min(8).email().example('john.doe@mail.fr').description('The mail of the user'),
            username: Joi.string().min(3).example('JohnDoe').description('The username of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            scope: Joi.string().valid('admin', 'user').example('user').description('The scope of the user')
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.scope = 'user';
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }
    static get jsonAttributes() {

        return ['scope'];
    }

};
