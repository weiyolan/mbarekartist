const axios = require('axios');
const querystring = require("querystring");

const KEY = process.env.REACT_APP_API_KEY;
const TBL = process.env.REACT_APP_API_ID;

const handler = async (event, context) => {

    const params = querystring.parse(event.body);
    console.log(params);

    // console.log(`https://api.airtable.com/v0/appfB05UOD1hI2FE4/art/${id}`)
    let [name, oldlikes] = await axios.get(`https://api.airtable.com/v0/${TBL}/art/${id}`, {
        headers: {Authorization: `Bearer ${KEY}`}}).then((resp)=>{
        // console.log('name and oldlikes fetched')
        // console.log('name: ' + resp.data.fields.name + ', oldlikes: ' + resp.data.fields.likes)
        return [resp.data.fields.name, resp.data.fields.likes]
    }).catch(e=>{return e});

    let newData = {
        records:[
            {
                id: id,
                fields:{
                    name: name,
                    likes: oldlikes+1
                }
            }
    ]};

    let response = await axios.patch(`https://api.airtable.com/v0/${TBL}/art`, newData , {headers: {
            Authorization: `Bearer ${KEY}`, 
            "Content-Type": "application/json"
        }})
        //.then((resp)=>{console.log(resp); return resp}).catch(e=>e)
    return response


    return { 
        statusCode: 200,
        body: JSON.stringify('Hello, World'),
        ok:true
    };
}

module.exports = { handler }
