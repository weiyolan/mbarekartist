import React,{useState} from 'react'
import './artpiece.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Artpiece = (props) => {

    let [likes,setLikes] = useState(props.likes);
    let [liked,setLiked] = useState(false);
    let [likeload,setLikeload] = useState(false);


    // async function unlike(id) {
    //     let [name, oldlikes] = await axios.get(`https://api.airtable.com/v0/appfB05UOD1hI2FE4/art/${id}`,{headers: {Authorization: "Bearer keyoGVRavQjrgVp6e"}}).then((resp)=>{
    //         return [resp.data.fields.name, resp.data.fields.likes]
    //     }).catch(e=>e);

    //     let newData = {records:[
    //         {id: id,
    //         fields:{
    //             name: name,
    //             likes: oldlikes-1
    //         }}
    //     ]};
        
    //     axios.patch(`https://api.airtable.com/v0/appfB05UOD1hI2FE4/art`, newData, {
    //         headers: {
    //             Authorization: "Bearer keyoGVRavQjrgVp6e", 
    //             "Content-Type": "application/json"
    //         }}).then((res)=>{return res}).catch(e=>e)
    // };

    const plusOne = () => {
        // let prevLike = likes;
        async function tryLike() {
            // axios.put(`http://localhost:4000/api/like/${props.artID}`).then((res)=>{
            // like(props.artID)
            fetch('/.netlify/functions/like', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(props.artID)
            }).then((res)=>{    
                setLiked(true);
                setLikeload(false)
                console.log('Artpiece liked!');
                console.log(res);
            }).catch(e=>{
                setLikes(l=>l-1);
                setLikeload(false)
                console.log('Unable to like.')
                console.log(e)
            })
        }

        async function tryUnlike() {
            // axios.put(`http://localhost:4000/api/unlike/${props.artID}`).then((res)=>{
            fetch('/.netlify/functions/unlike', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(props.artID)
                }).then((res)=>{    
                setLiked(false);
                setLikeload(false);
                console.log('Artpiece unliked!');
                console.log(res);
            }).catch(e=>{
                setLikes(l=>l+1);
                setLikeload(false);
                console.log('Unable to unlike.')
                console.log(e)
            })
        }
        
        if (!likeload) {
            if (!liked) {
                setLikes(l=>l+1);
                setLikeload(true)
                tryLike()
            } else {
                setLikes(l=>l-1);
                setLikeload(true)
                tryUnlike()
            }
        }
    }

    return (
        <div className='artpiece__card'>
            <img src={props.src} onClick={()=>{props.handleClick(props.myKey)}}/>
            <Button onClick={plusOne} className='button'> 
                {liked && 'Liked '}❤️{likes}
            </Button>
        </div>
    )
}

export default Artpiece