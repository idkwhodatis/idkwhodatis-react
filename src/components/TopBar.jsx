import {AppBar,Toolbar,Typography,Button} from '@mui/material'

function TopBar(){
  return (
    <AppBar position="fixed">
      <Toolbar disableGutters sx={{minHeight:'60px !important'}}>
        <div style={{flexGrow:0.3}}></div>
        <Typography variant="h5" sx={{cursor:'default'}}>idkwhodatis.github.io</Typography>
        <div style={{flexGrow:3}}></div>
        <Button disableRipple color="inherit" sx={styles.button}>Home</Button>
        <Button disableRipple color="inherit" sx={styles.button}>Projects</Button>
        <Button disableRipple color="inherit" sx={styles.button}>Vue</Button>
        <Button disableRipple color="inherit" sx={styles.button}>About</Button>
        <Button disableRipple color="inherit" sx={styles.button}>Repo</Button>
        <div style={{flexGrow:1}}></div>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar

const styles={
  button:{
    marginLeft:2,
    textTransform:'none'
  }
}