const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;

const errorCont = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes.routes);
app.use(publicRoutes);

app.use(errorCont.getError404);

mongoConnect(() => {
    app.listen(process.env.PORT || 8000);
});