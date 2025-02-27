const app = require('./app');
const connection = require('./config/mongodb');
const User = require('./model/supplier.model');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).send('Hello World!.....!!!....');
});

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});