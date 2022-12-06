import React,{useState,useEffect} from 'react'
import './artpiece.css';
import Button from 'react-bootstrap/Button';

const Artpiece = (props) => {

    let [likes,setLikes] = useState(props.likes);
    let [liked,setLiked] = useState(false);
    let [likeload,setLikeload] = useState(false);

    let [landscape,setLandscape] = useState(true);
    let [style,setStyle] = useState('landscape__card')

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
                body: JSON.stringify({id:props.artID})
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
                    body: JSON.stringify({id:props.artID})
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

    function handleLoad(img) {
        
        setLandscape(img.naturalWidth >= img.naturalHeight);
    } 

    useEffect(() => {
        //Set the right css style variable: 1 or 2 rows.
        setStyle(landscape?'landscape__card':'portrait__card')   

    }, [landscape])
    

    return (
        <div className={'artpiece__card ' + style}>
            <img src={props.src} onLoad={(e)=>handleLoad(e.target)} onClick={()=>{props.handleClick(props.myKey)}}/>
            
            {props.likeError && <Button onClick={plusOne} className='button'> 
                {likeload?(liked?'':'Liked '):(liked?'Liked ':'')}❤️{likes}
            </Button>}
        </div>
    )
}

export default Artpiece