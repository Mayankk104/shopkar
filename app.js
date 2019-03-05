const path        = require('path');

const express     = require('express'),
      bodyParser  = require('body-parser'),
      app         = express();

const errorController = require('./controllers/error'),
      shopRoutes = require('./routes/shop'),
      adminRoute = require('./routes/admin')


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoute);
app.use(shopRoutes);
app.use(errorController.getError);


app.listen(3000,()=>{console.log('Server is running...')});
