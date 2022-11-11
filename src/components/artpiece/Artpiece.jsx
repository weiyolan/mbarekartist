import React,{useState} from 'react'
import './artpiece.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Artpiece = (props) => {

    let [likes,setLikes] = useState(props.likes);
    let [liked,setLiked] = useState(false);
    let [likeload,setLikeload] = useState(false);

    const plusOne = () => {
        // let prevLike = likes;
        async function tryLike() {
            axios.put(`http://localhost:4000/api/like/${props.artID}`).then((res)=>{
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
            axios.put(`http://localhost:4000/api/unlike/${props.artID}`).then((res)=>{
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