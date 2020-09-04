const express = require('express');
const bodyParser = require('body-parser');

const API_URL_PREFIX = '/api';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

const glueApps = {
    "message": "OK",
    "applications": [
        {
            "name": "appA",
            "details": {
                "url": "/app-a/index.html"
            }
        },
        {
            "name": "appB",
            "details": {
                "url": "/app-b/index.html"
            }
        }
    ]
};

app.get(`${API_URL_PREFIX}/glue-apps`, (req, res) => {
    res.json(glueApps);
});

const port = process.env.PORT || 4224;

app.listen(port, function (error) {
    if (error) {
        throw error;
    }
    console.log(`Server listens at: ${port}`);
});
