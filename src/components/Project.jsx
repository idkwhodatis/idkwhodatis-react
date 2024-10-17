import {useState,forwardRef} from 'react';

import {Card,CardMedia,CardContent,CardActions,IconButton,Chip,Dialog,Typography,Box,Grow} from '@mui/material';
import {OpenInNew} from '@mui/icons-material'

const Transition=forwardRef((props,ref)=>{return <Grow ref={ref} {...props}/>;});

function Project({project}){
  const [imgDialog,setImgDialog]=useState(false);

  const date=project.date.format('MMM D, YYYY');
  const preview=project.preview==='none'?'/projects/preview/none.jpg':'/projects/preview/'+project.name+project.preview;

  const toggleDialog=()=>{
    setImgDialog(!imgDialog);
  }

  return (
    <>
      <Card sx={{backgroundColor:'secondary.main',maxWidth:'100%'}}>
        {project.category==='music'?(
            <iframe src={project.preview} style={{aspectRatio:'4/3',width:'100%',height:'auto',borderRadius:'8px',border:'none'}} allow="autoplay;encrypted-media" allowFullScreen/>
          ):(
            <Box sx={{ position: 'relative' }}>
              <CardMedia onClick={toggleDialog} component="img" image={preview} sx={{aspectRatio:'4/3',borderRadius:'8px',objectFit:'contain'}}/>
              <Box sx={{position:'absolute',bottom:0,right:0,backgroundColor:'rgba(0,0,0,0.5)',color:'white',padding:'16px',borderRadius:'4px 0 0 0'}}>
                <Typography variant="subtitle2">{date}</Typography>
              </Box>
            </Box>
          )
        }

        <CardContent sx={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:0,paddingLeft:0.2}}>
          <Typography variant="h6" color='text' sx={{maxWidth:'80%',wordWrap:'break-word',paddingLeft:'10px'}}>
            {project.name}
          </Typography>
          <CardActions>
            <IconButton onClick={()=>openURL(project.repo)} disableRipple sx={styles.button}>
              <OpenInNew/>
            </IconButton>
          </CardActions>
        </CardContent>

        <CardContent sx={{paddingTop:0}}>
          <Box sx={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
            {project.tags.map((t)=>(<Chip key={t} label={t} size="small" sx={{backgroundColor:'#e0e0e0',color:'black'}}/>))}
          </Box>
          <Typography variant="body2" color='text' sx={{paddingTop:1,textAlign:'left'}}>{project.description}</Typography>
        </CardContent>
      </Card>

      <Dialog open={imgDialog} onClose={toggleDialog} maxWidth="100vw" TransitionComponent={Transition} PaperProps={{style:{backgroundColor:'transparent'}}}>
        <img onClick={toggleDialog} src={preview} alt={project.name} style={{width:'80vw',height:'95vh',maxWidth:'80vw',maxHeight:'95vh',objectFit:'contain'}}/>
      </Dialog>
    </>
  )
}

export default Project

function openURL(url){
  window.open(url,'_blank');
}

const styles={
  button:{
    color:'white',
    transition:'background-color 0.3s ease',
    '&:hover':{backgroundColor:'#444444'},
    '&:active':{backgroundColor:'#555555'},
  }
}