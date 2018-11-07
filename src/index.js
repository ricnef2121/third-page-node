//creamos una constante la cual tiene la caracteristica de que
//puede ser accedida desde cualquier parte de nuestra aplicacion

const express = require('express');
const app = express();
const path = require('path')
const morgan = require('morgan');
const mongoose = require('mongoose');
const colors = require('colors')
    /**
     * colors:
     * black, red ,green, yellow, blue,magenta, cyan, white, gray, grey
     * background colors:
     * bgBlack ,bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite
     * styles:
     * reset, bold, dim,italic, underline, inverse, hidden, strikethrough
     * extras:
     * rainbow, zebra, america, trap, random
     */


/**seetings */
//el primer parametro es para definir una variable
//mientras que el segundo parametro corresponde al valor de la
// variable anteriormente creada
app.set('port', 3000);

/********************** */
/**Conexion a base de datos */
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('Db connected'.magenta))
    .catch(err => console.log(err));


//configuramos nuestro motor de plantillas para que
//reconosca los archivos html, ejs renderizara los archivos html
app.engine('html', require('ejs').renderFile);
/**el primer parametro es para el motor de vista
 * , y en el segundo parametro le decimos que motor se plantilla
 * se va utilizar
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware: es una funcion que se jecuta antes de llegar
// a las rutas
app.use(morgan('dev'));
//este metodo se encarga de entender los datos enviados desde un 
//formulario
app.use(express.urlencoded({ extended: false })) //colocamos el extended: false por que solo se estara enviando texto desde el formulario



/**routes */
app.use(require('./routes/index'));


//static files
app.use(express.static(path.join(__dirname, 'public')))




/**listening the server */
app.listen(app.get('port'), () => {
    //console.log('Server on port', app.get('port'));
    console.log(`Server on Port ${app.get('port')}`.blue);
})