const express = require('express');
const htmlRoute = require('./routes/htmlRoutes.js');
const apiRoute = require('./routes/apiRoutes.js');
const path = require('path');


const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoute);
app.use('/', htmlRoute);
//read and write file then post and get to push to webpage
app.post('/api/notes', (req, res) => {
    let createdNotes = JSON.parse(fs.readFileSync('./develop/db/db.json', 'utf8'))
   
    let newNote = req.body
     ///might need id later
     createdNotes.push(newNote);
     fs.writeFileSync('./develop/db/db.json', createdNotes);
     res.json(createdNotes)
})

app.get('/api/notes', (req, res) => {
res.sendFile(path.join(__dirname, './develop/db/db.json'))
})


app.listen(PORT, () => console.log('listening on PORT'));