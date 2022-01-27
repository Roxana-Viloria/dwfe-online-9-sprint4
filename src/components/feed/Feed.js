import './feed.css';
import '../../App.css';

import { useEffect, useState } from 'react';
import { firestore, getCurrentUser } from '../../firebase';
import Tweet from '../tweet/Tweet'
import { useNavigate } from 'react-router-dom';

// imgs//
import horse from '../../pictures/horse.jpg'
import smallLogo from '../../pictures/smalllogo.svg'
import devs from '../../pictures/devs.svg'
import united from '../../pictures/united.svg'

function Feed() { 

    let navigate =useNavigate();
    let user = getCurrentUser()

    const continueClick = (e)=>{
        navigate('/profileusera')
    }
    
   
    const [comments,setComments] = useState([]);
    const [comment, setComment] = useState({
      user: user !== null ?  user.uid : "",
      id:"",
      comment:"",
      likes: 0
    })

    const [color, setColor]= useState ("")  
    const [ userName, setUserName]= useState ("")
    const [text, setText]= useState ("")   
    
    const tweetsListener = () =>
    firestore.collection("comments").orderBy("date", "desc").onSnapshot(
      (snapshot) => {
        setComments([])
        const tweets = snapshot.docs.map(
          (doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          },
          () => {
            console.error("Sucedio un error");
          }
        );
        console.log(tweets)
        setComments(tweets);
      },
      (error) => {
        console.error(error);
      }
    );

    useEffect(()=>{
      if (user !== null) {
        firestore
      .doc(`users/${user.uid}`)
      .get()
      .then((snapshot)=>{
       setColor(snapshot.data().color)
       setUserName (snapshot.data().username)
      })

      const unsuscribeTweets = tweetsListener();
        return()=>{
          unsuscribeTweets()
        } 
      } else {navigate('/login')}
      
    },[]);
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        const date = new Date()
        const auxComment = {
          ...comment,
          date: date.getTime()
        }
        const enviarComment = firestore.collection ("comments").add(auxComment);
    
        const collRef = await enviarComment;
    
        const docRef = await collRef.get()
        console.log(docRef.id);
        
        const result = docRef.data();
        
        const tweet ={
          ...result, 
          id:docRef.id
        }

    
        setComments([tweet, ...comments]);

        setText("")
      };
    
      const handleChange = (e) => {
        const { value, name } = e.target;
        setText (value)
        const newComment = {
            ...comment,
          [name]: value, 
        }
        setComment(newComment);
      }
    
      
    return (
        <>
        <div>
            <div className="header">
                <a type="button" onClick={continueClick}>
                    <img src={horse} className={`horse border-${color}`}></img>
                </a>
                <img src={smallLogo} className="imgs"></img>
                <div>
                    <img src={devs} className="devs"></img>
                    <img src={united} className="united"></img>
                </div>
            </div>
            <div className="write">
                <img src={horse} className={`horsewriting border-${color}`}></img>
                    <textarea 
                    type="text" 
                    placeholder="what's happening?" 
                    className="writing" 
                    onChange={handleChange} 
                    name="comment"
                    value={text}
                    ></textarea>
                <p className="characteres">200 max.</p>
                <div className="post button">
                    <button type="button" className=" post button" onClick={handleSubmit}>POST</button>
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
export default Feed;