import './tweet.css';

import { useEffect, useState } from 'react';
import { firestore, getCurrentUser } from '../../firebase';
import { useNavigate } from 'react-router-dom';

// imgs//
import horse from '../../pictures/horse.jpg'
import garbage from '../../pictures/garbage.svg'
import love from '../../pictures/love.svg'
import emptylove from '../../pictures/emptylove.svg';

function Tweet({comment}){


    let navigate =useNavigate();
    let user = getCurrentUser()
    const { id, likes } = comment;

    const [color, setColor]= useState ("")  
    const [ userName, setUserName]= useState ("")
    const [liked, setLiked] = useState(false);
    const [eraser, setEraser] = useState (null)
    const [likeCount, setLikeCount]= useState(likes)

    const month = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];

    const checkLike = async () => {
      const doc = await firestore.doc(`likes/${user?.uid}-${comment.id}`).get();
      const isLiked = doc.data();
  
      if (!!isLiked) {
        setLiked(true);
      }
    };
    
    useEffect(()=>{
      firestore
      .doc(`users/${comment.user}`)
      .get()
      .then((snapshot)=>{
       setColor(snapshot.data().color)
       setUserName (snapshot.data().username)
      })

      checkLike();
    },[]);
    
      const handleDelete =() => {
        firestore.doc(`comments/${id}`).delete();
        setEraser("")

        firestore.collection ("likes")
        .where("commentId", "==", id)
        .get()
        .then ((snapshot)=>{
          snapshot.forEach((doc)=>{
            doc.ref.delete();
          })
        })
      };
      

      const handleLike = async () => {
        firestore
          .doc(`comments/${comment.id}`)
          .update({ likes: liked ? likes - 1 : likes + 1 });
          
    
        const docRef = `likes/${user.uid}-${comment.id}`;
        if (liked) {
          firestore.doc(docRef).delete();
          setLiked(false);
        } else {
          firestore.doc(docRef).set({ userId: user.uid, commentId: comment.id });
          setLiked(true);
        }
      };


      const commentDate = (date) => {
      const tweetDate = new Date(date)

        return `${tweetDate.getDate()} ${month[tweetDate.getMonth()]}`
      }

  return (
    <div className="borders" key={comment.id}>
    <div className="cardComments">
        <img src={horse} className={`horsereplay border-${color}`}></img>
        <span className={`userfeed ${color}`}>{userName}</span>
        <span className="date"> - {commentDate (comment.date)}.</span>
        {comment.user === user?.uid ? (
          <a onClick={handleDelete}>
          <img src={garbage} className="eraser"></img>
        </a>) : (
          <></>
        )}
    </div>
      <div className="commentsfeed">{comment.comment}</div> 
      <div className="likes">
        <a 
          type="button"
          onClick={handleLike}>
          {liked ? 
          <img src={love} className='emptylove'></img>
          : 
          <img src={emptylove} className='love'></img>}
        </a>
        <span>{comment.likes}</span>
      </div>
  </div>
  );
}

export default Tweet;