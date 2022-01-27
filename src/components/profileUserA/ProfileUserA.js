import './profileUserA.css';
import '../../App.css';

import { useState, useEffect } from 'react'
import {firebase, logout, firestore, getCurrentUser} from '../../firebase';
import username from '../../pictures/username.svg';
import { useNavigate } from 'react-router-dom';
import Tweet from '../tweet/Tweet';

// imgs//
import horse from '../../pictures/horse.jpg';
import arrow from '../../pictures/arrow.svg';
import imglogout from '../../pictures/imglogout.svg';

function ProfileUserA() { 

    let navigate =useNavigate();
    const [post, setPost]= useState ("")
    const [isDark, setIsDark]= useState (false);
    const [favorite, setFavorites]= useState ("")
    const [comments,setComments] = useState([]);

    const onClickLogout = (e)=>{
        logout()
        navigate('/')
      }

    const onClickBack =(e) =>{
        navigate ('/feed')
    }

    const handlePost =(e) =>{
        setIsDark (!isDark)
        firestore
        .collection('comments')
        .where("user", "==", user.uid)
        .get()
        .then((snapshot)=>{
            const tweets = snapshot.docs.map(
                (doc) => {
                  return {
                    ...doc.data(),
                    id: doc.id,
                  };
                })
        setComments (tweets)
        })
        
    }

    const handleFavorite = async () => {
        setIsDark (!isDark) 
        const likes = await firestore.collection('likes').where("userId", "==", user.uid).get()
        console.log (likes.docs)
        const newComments = await Promise.all ( 
            likes.docs.map(async (doc)=>{ 
                const commentId = doc.data().commentId
                const userId = doc.userId
                const otherComment = await firestore.doc(`comments/${commentId}`).get()

                return {
                    ...otherComment.data(),id:otherComment.id
                }
            })

        )
        console.log (newComments)
        setComments (newComments)
        
    }

    let user = getCurrentUser()

    const [color, setColor]= useState ("")
    const [ userName, setUserName]= useState ("")
    

    useEffect(()=>{
        if (user !== null){
            firestore
            .doc(`users/${user.uid}`)
            .get()
            .then((snapshot)=>{
             setColor(snapshot.data().color)
             setUserName (snapshot.data().username)
            })
        }else {navigate('/login')}
      },[]);



    return (
        <>
        <div className='containerFeed'>
            <div className="userheader">
                <button type="button" className='backbutton' onClick={onClickBack}>
                    <div className="userheader">
                        <img src={arrow} className='arrow'></img>
                        <img src={username} className="userprofile"></img>
                    </div>
                </button>
                <a  type="button" className="buttonLogout" onClick={onClickLogout}>
                    Log out
                        <img src={imglogout} className='imglogout'></img>
                </a>
            </div>
            <div className="blackspace">
                <img src={horse} className={`photo border-${color}`}></img>
                <div className={`usercolor ${color}`}>{userName}</div>
                <div className="tabsbuttons">
                    <button 
                        type="button" 
                        onClick={handlePost} 
                        className={`tabs ${isDark ? 'tabs-light': 'tabs'}` }
                        >POSTS
                    </button>
                    <button 
                        type="button" 
                        onClick={handleFavorite} 
                        className={`tabs ${isDark ? 'tabs': 'tabs-light'}` }
                        >FAVORITES
                    </button>
                </div>
            </div>
            {comments.map((comment) => {
        return (
          <Tweet 
          comment={comment}/>
        );
      }
    )} 
        </div>
        </>
    )
}
export default ProfileUserA;