const userRoutes = require('./user-routes');

module.exports = (app, db) => {
    userRoutes(app, db);
};
