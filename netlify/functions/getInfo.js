const axios = require('axios');
const querystring = require("querystring");

const KEY = process.env.REACT_APP_API_KEY;
const TBL = process.env.REACT_APP_API_ID;

const handler = async (event, context) => {
    // const array = JSON.parse(event.body);
    // console.log('ARRAY')
    // console.log(event.body)

    // console.log(array);
    // console.log(params)
    
    // function rename(loc, oldname, index) {
    //     let artName = `art-${1000000+index}`;
    //     let newLocation = loc.split('/');
    //     newLocation.pop().push(artName);
    //     newLocation = newLocation.join('/');
    //     // console.log(artName);
    //     // console.log(newLocation);
    // }
 
    try {

        let info = await axios.get(`https://api.airtable.com/v0/${TBL}/art`, {
            headers: {Authorization: `Bearer ${KEY}`}}).then((resp)=>{
            // console.log(resp.data.records)
            // console.log('===========================')
            return resp.data.records})

        return { 
            statusCode: 200,
            body: JSON.stringify(info),
            ok: true
        }
        
    } catch (err) {
        // console.log(err.cause)
        return {
                statusCode: 404,
                body: JSON.stringify(err.cause),
                ok: false
            };
    };
}

module.exports = { handler }
