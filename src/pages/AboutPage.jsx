import {useEffect} from 'react';
import store from '../utils/Store.jsx'

function AboutPage(){
  useEffect(()=>{
    store.currSection='About'
  },[]);

  return <div>About</div>
}

export default AboutPage