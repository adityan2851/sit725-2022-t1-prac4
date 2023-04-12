var express = require('express');
var app = express();
const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://adhi2851:Adityan.28@cluster0.yuckdqn.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
let dbCollection;

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function dbConnection(collectionName) {
    client.connect(err => {
        dbCollection = client.db().collection(collectionName);
        if (!err) {
            console.log('DB Connected');
            console.log(dbCollection);
        } else {
            console.log(err);
        }
    });
}

function insert(dog, callback) {
    dbCollection.insertOne(dog, callback);
}

function getAllDogs(callback) {
    dbCollection.find().toArray(callback);
}

app.get('/api/dogs',(req,res) => {
    getAllDogs((error, result) => {
        if (error) {
            res.json({statusCode:400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'Successfully'});
        }
    });
    //res.json({statusCode: 200, data: cardList, message:"Success"})
});

app.post('/api/dogs', (req, res) => {
    let dog = req.body;
    insert(dog, (err, result) => {
        if (err) {
            res.json({statusCode:400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'Dog successfully added'});
        }
    });
});

var port = process.env.port || 5500;
app.listen(port,()=>{
    console.log('App listening to: ' + port);
    dbConnection('Dogs');
})
