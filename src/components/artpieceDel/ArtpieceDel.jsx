import React,{useState,useContext,useEffect} from 'react'
import './artpieceDel.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {AuthContext} from '../../components';

const ArtpieceDel = (props) => {
    let {token} = useContext(AuthContext);
    
    let [deleted, setDeleted] = useState(false);
    let [deleteload, setDeleteload] = useState(false);

    // useEffect(()=>{
    //     console.log('Was I really deleted? Here is my ID:' + props.artID)
    // })

    const deleteArt = () => {
        async function tryDelete() {
            axios.delete(`http://localhost:4000/api/${props.artID}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`,
                }
            }).then((res)=>{
                console.log('Art successfully deleted!');
                console.log(res);
                setDeleted(true);
                setDeleteload(false);
                // props.setOutdated(true);

            }).catch((e)=>{
                setDeleteload(false);
                alert('❌Error! Try logging in again. ❌ \n Message: ' + e)
                console.log('Not able to delete!');
                console.log(e);
            })
        }
        if (!deleteload) {
            setDeleteload(true);
            tryDelete();
        }
    }

    return (
        <div className={deleted?'deleted artpiece__card card__delete':'artpiece__card card__delete'} 
            // key={props.key}
            style={deleteload?{opacity:0.5}:{opacity:1}}>
            <img src={props.src}/>
            <Button className="art__deleted button" id="deleted" onClick={deleteArt}>
                <span>&times;</span>
            </Button>
        </div>
    )
}

export default ArtpieceDel