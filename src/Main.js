import React ,{useState, useEffect} from 'react'
import Post from './Posts.js'
import { db, auth } from './firebase'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import {Button, Input} from '@material-ui/core'

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

function Main() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const[email, setEmail] = useState('');
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[user,setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser);
        setUser(authUser);

        if(authUser.displayName){

        }else{
          return authUser.updateProfile({
            displayName: username,
          })
        }
      }else{
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }

  }, [user, username])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false);
  }

  const SignIn = (event) => {
      event.preventDefault()

      auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

      setOpenSignIn(false) 
  }

  return (
    <div className="app">

      <Modal
      open={open}
      onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
      <form className="app__signup"> 
      <center>
          <img className="app_headerImage" src="/Assets/instalogo.svg"  alt="logo"/>
          </center>
          
          <Input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}/>
          
          <Input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
          
          <Input
          placeholder="Password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

          <Button onClick={signUp}>Sign Up</Button>
      </form>
        </div>
      </Modal>

      <Modal
      open={openSignIn}
      onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
      <form className="app__signup"> 
      <center>
          <img className="app_headerImage" src="/Assets/instalogo.svg"  alt="logo"/>
          </center>
          
          <Input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
          
          <Input
          placeholder="Password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

          <Button onClick={SignIn}>Login</Button>
      </form>
        </div>
      </Modal>
  
    <div className="app_header">
      <img className="app_headerImage" src="/Assets/instalogo.svg"  alt="logo"/>
    </div>
    {user ? (
            <Button onClick={()=> auth.signOut()}>
                Logout
            </Button>
    ): 
    <div>            
        <Button onClick={()=>setOpenSignIn(true)}>
        Login
        </Button>
        <Button onClick={()=>setOpen(true)}>
        Sign Up
        </Button>
    </div>
        }
    {
      posts.map(({id, post}) =>(

         <Post key={id} username={post.username} caption={" "+post.caption} imageurl={post.imageurl} />
  )) 
    }

    <h1>Start Instagram 🚀</h1>
    
    </div>
  );
}

export default Main;
