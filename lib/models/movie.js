'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {
    static get tableName() {

        return 'movie';
    }
    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(3).example('Harry Potter and the Philosopher\'s Stone').description('The title of the movie'),
            description: Joi.string().min(5)
                .example('Harry Potter is a British-American film series based on the Harry Potter novels by author ' +
                    'J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films, ' +
                    'beginning with Harry Potter and the Philosopher\'s Stone (2001) and culminating with Harry ' +
                    'Potter and the Deathly Hallows – Part 2 (2011).').description('The description of the movie'),
            releaseDate: Joi.date().example('2001-11-16').description('The release date of the movie'),
            director: Joi.string().min(5).example('Chris Columbus').description('The director of the movie'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }
};
