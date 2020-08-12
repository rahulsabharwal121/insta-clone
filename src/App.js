import React ,{useState, useEffect} from 'react'
import './App.css';
import Post from './Posts.js'
import { db } from './firebase'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import {Button} from '@material-ui/core'

function getModalStyle() {
  const top = 50;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #fafafa',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, []);

  return (
    <div className="app">

      <Modal
      open={open}
      onclose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
            <h3>I am a Modal 🚀</h3>
        </div>
      </Modal>
  
    <div className="app_header">
      <img className="app_headerImage" src="/Assets/instalogo.svg"  alt="logo"/>
    </div>
    <Button onClick={()=>setOpen(true)}>
    Sign Up
    </Button>
    {
      posts.map(({id, post}) =>(

         <Post key={id} username={post.username} caption={" "+post.caption} imageurl={post.imageurl} />
  )) 
    }

    <h1>Start Instagram 🚀</h1>
    
    </div>
  );
}

export default App;
