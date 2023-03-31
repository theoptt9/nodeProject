'use strict';

const {Service} = require('@hapipal/schmervice');
const Boom = require('boom');

module.exports = class FavoriteService extends Service {
    async create(userId, movieId) {

        const {Favorite} = this.server.models();

        const currentFavorite = await Favorite.query().findOne({userId, movieId});
        if (currentFavorite) {
            return Boom.badRequest('You already have this movie in your favorites');
        }

        return await Favorite.query().insertAndFetch({userId, movieId});
    }

    getAll() {

        const {Favorite} = this.server.models();

        return Favorite.query();
    }

    async delete(userId, movieId) {

        const {Favorite} = this.server.models();

        const currentFavorite = await Favorite.query().findOne({userId, movieId});
        if (!currentFavorite) {
            return Boom.badRequest('You don\'t have this movie in your favorites');
        }

        await Favorite.query().delete().where({userId, movieId});
        return {success: 'Movie deleted from your favorites'};
    }

    getByMovieId(movieId) {

        const {Favorite} = this.server.models();
        return Favorite.query().where({movieId});
    }

    deleteByMovieId(movieId) {

        const {Favorite} = this.server.models();
        return Favorite.query().delete().where({ movieId });
    }

    deleteByUserId(userId) {

        const { Favorite } = this.server.models();
        return Favorite.query().delete().where({ userId });
    }
};
