import {proxy,useSnapshot} from 'valtio'

import {Card,CardMedia,CardContent,CardActions,IconButton,Chip,Dialog,Typography,Box} from '@mui/material';
import {OpenInNew} from '@mui/icons-material'

const state=proxy({
  imgDialog:false
});

function Project({project}){
  const snap=useSnapshot(state);

  const date=project.date.format('MMM D, YYYY');
  const preview=project.preview==='none'?'/projects/preview/none.jpg':'/projects/preview/'+project.name+project.preview;

  return (
    <>
      <Card sx={{backgroundColor:'secondary.main',maxWidth:'100%'}}>
        {project.category==='music'?(
            <CardMedia component="video" src={project.preview} controls sx={{aspectRatio:'4/3'}}/>
          ):(
            <CardMedia component="img" image={preview} sx={{aspectRatio:'4/3',borderRadius:'8px',objectFit:'contain'}}>
              {/* <Box sx={{position:'absolute',bottom:0,right:0,padding:'8px',background:'rgba(0,0,0,0.5)'}}>
                <Typography variant="subtitle2">{project.date.format('MMM D, YYYY')}</Typography>
              </Box> */}
            </CardMedia>
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

      <Dialog open={snap.imgDialog} fullWidth maxWidth="md">
        <CardMedia component="img" image={project.preview} sx={{ borderRadius: '8px', maxWidth: '75vw', maxHeight: '80vh' }} />
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