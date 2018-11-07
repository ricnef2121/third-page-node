const Task = require('../models/tasks')

const index = async(req, res) => {
    const tasks = await Task.find();
    //console.log(tasks)
    res.render('index.html', {
        tasks
    })
};

const insert = async(req, res) => {
    const task = new Task(req.body);
    await task.save();
    //console.log(new Task(req.body));
    //console.log(req.body);
    //res.send('recibido');
    res.redirect('/')
};


//const delete=

module.exports = {
    index,
    insert
}

//textchar