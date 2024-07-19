const usersRouter = require('./users');
const filmsRouter = require('./films');
const cmtsRouter = require('./cmts');
const adminRouter = require('./admin');
const testRouter = require('./test');

function route(app) {
    app.use('/users', usersRouter);

    app.use('/films', filmsRouter);

    app.use('/admin', adminRouter);

    app.use('/cmts', cmtsRouter);

    app.use('/test', testRouter);
}
module.exports = route;
