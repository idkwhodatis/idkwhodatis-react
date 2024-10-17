import router from '../router/index.jsx'
import store from '../utils/Store.jsx'
import bus from '../utils/EventBus.jsx'

import {AppBar,Toolbar,Typography,Button} from '@mui/material'

function TopBar(){
  return (
    <AppBar position="fixed">
      <Toolbar disableGutters sx={{minHeight:'60px !important'}}>
        <div style={{flexGrow:0.3}}></div>
        <Typography variant="h5" sx={{cursor:'default'}}>idkwhodatis.github.io</Typography>
        <div style={{flexGrow:3}}></div>
        <Button onClick={()=>toHome(true)} disableRipple color="inherit" sx={styles.button}>Home</Button>
        <Button onClick={()=>toHome(false)} disableRipple color="inherit" sx={styles.button}>Projects</Button>
        <Button onClick={toVue} disableRipple color="inherit" sx={styles.button}>Vue</Button>
        <Button onClick={toAbout} disableRipple color="inherit" sx={styles.button}>About</Button>
        <Button onClick={toRepo} disableRipple color="inherit" sx={styles.button}>Repo</Button>
        <div style={{flexGrow:1}}></div>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar

function toHome(home){
  if(router.state.location.pathname!='/idkwhodatis.github.io-react'){
    router.navigate('/').then(()=>{
      if(!home){
        setTimeout(()=>{
          bus.emit('scrollTo','projects');
        })
      }else{
        store.currSection='Home';
      }
    });
  }else{
    bus.emit('scrollTo',home);
  }
}

function toAbout(){
  if(router.state.location.pathname!='/idkwhodatis.github.io-react/about'){
    router.navigate('/about');
  }
}

function toVue(){
  window.location.href='https://idkwhodatis.github.io/';
}

function toRepo(){
  window.location.href='https://github.com/idkwhodatis/idkwhodatis.github.io-react';
}

const styles={
  button:{
    marginLeft:3,
    textTransform:'none'
  }
}