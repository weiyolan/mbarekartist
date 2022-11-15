const axios = require('axios');
const querystring = require("querystring");


const KEY = process.env.REACT_APP_API_KEY;
const TBL = process.env.REACT_APP_API_ID;

const unlike = async (event, context) => {

    return { 
        statusCode: 200,
        body: JSON.stringify('Hello, World'),
        ok:true
    };
}

module.exports = { unlike }
