const axios = require('axios');
// const querystring = require("querystring");

const KEY = process.env.REACT_APP_API_KEY;
const TBL = process.env.REACT_APP_API_ID;

const handler = async (event, context) => {
    let records = [];
    
    let newArt = JSON.parse(event.body).newArt;

    console.log("============LENGTH============")
    if (newArt.length >10) {
        return { 
            statusCode: 400,
            data: `You tried to register ${newArt.length} new items. Max number of new Art pieces at the same time is 10.`,
            ok: false
        };
    }
    // console.log(newArt.length)

    for (const artName of newArt) {
        records.push({
                fields:{
                    name: artName,
                    likes: 0
                }
            });
    }

    let newData = JSON.stringify({records: records});
    // let newData = {records: records};

    // console.log(newArt)
    // console.log(newData)
 
    
    let response = await axios.post(`https://api.airtable.com/v0/${TBL}/art`, newData, {headers: {
        Authorization: `Bearer ${KEY}`, 
        "Content-Type": "application/json"
    }}).then((resp)=>{console.log(resp); return resp}).catch(e=>e)
    
    console.log('=======================')
    console.log('FINAL RESPONSE: ')
    console.log(response)

    return { 
        statusCode: response.status,
        data: JSON.stringify(response.data),
        ok: true
    };

}

module.exports = { handler }
