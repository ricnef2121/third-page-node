//volvemos a importar express por que necesitamos uno de sus modulos
const express = require('express');
//Router sirve para crear multiples rutas y mantenerlas 
//en archivos separados
//la siguiente constante es el encargado de crear las rutas
const router = express.Router();

const Task = require('../models/tasks')


//importamos funcionalidades
//controllers
const IndexController = require('../controllers/index');

//primer para metro es la ruta para index(default page)
//segundo parametro es la funcionalidad
router.get('/', IndexController.index)

router.post('/add', IndexController.insert)

router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await Task.remove({ _id: id });
    res.redirect('/');
})

router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit.html', {
        task
    });
})

router.post('/edit/:id', async(req, res) => {
    const { id } = req.params;
    await Task.update({ _id: id }, req.body);
    res.redirect('/')
})


module.exports = router;