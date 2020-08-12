import React ,{useState, useEffect} from 'react'
import './App.css';
import Post from './Posts.js'
import { db, auth } from './firebase'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import {Button, Input} from '@material-ui/core'
import Main from './Main';


function App() {
 return (
   <Main />
 )
}

export default App;
