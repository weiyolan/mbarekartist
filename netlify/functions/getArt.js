const axios = require('axios');
const querystring = require("querystring");

const KEY = process.env.REACT_APP_API_KEY;
const TBL = process.env.REACT_APP_API_ID;

const getArt = async (event, context) => {

    const params = querystring.parse(event.body);

    console.log('TESTTTT')
    console.log(params)
    
    function rename(loc, oldname, index) {
        let artName = `art-${1000000+index}`;
        let newLocation = loc.split('/');
        newLocation.pop().push(artName);
        newLocation = newLocation.join('/');
        // console.log(artName);
        // console.log(newLocation);
    }

    // async function importAll(r) {
    //     let newArt = [];
    //     let info = await axios.get("https://api.airtable.com/v0/appfB05UOD1hI2FE4/art", {
    //         headers: {Authorization: "Bearer keyoGVRavQjrgVp6e"}}).then((resp)=>{
    //         // console.log(resp.data.records)
    //         return resp.data.records})

    //     for (const [index, item] of r.keys().entries()) {
    //         // TEST FOR NEW ART TO BE CREATED
    //         // NOT DOING ANYTHING FOR NOW: ONLY IN CASE OF NEW ART IN FUTURE
    //         // if (item.replace('./','').split('-')[0] !== 'art') {rename(r(item),item,index)}
    //         let artName =  item.replace('./','');
    //         let artInfo = info.filter((art)=>{return art.fields.name === artName})[0];
    //         const art = {
    //             artImage : r(item),
    //             name : artName,
    //             likes : artInfo.fields.likes,
    //             id : artInfo.id
    //         };
    //         newArt.push(art);
    //     };

    //     return newArt
    // };

    try {
        console.log('TRY STATEMENT')
        // const imagesAll = await importAll();
        return { 
            statusCode: 200,
            body: JSON.stringify('Hello, World'),
            ok:true
        }; 
    } catch (err) {
        return {
                statusCode: 404,
                body: err.toString(),
                ok:false
            };
    };
}

module.exports = { getArt }
