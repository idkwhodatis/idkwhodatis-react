import {useEffect} from 'react';
import {proxy,useSnapshot} from 'valtio'
import ky from 'ky';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import '../assets/App.css'
import {Typography,Stack,IconButton,Box,Tabs,Tab,Grid2} from '@mui/material'
import {ArrowDownward} from '@mui/icons-material'

import Project from '../components/Project.jsx'

dayjs.extend(customParseFormat);

const Grid=Grid2;

const state=proxy({
  tab:'all',
  projects:[],
  software:[],
  game:[],
  music:[],
  get display(){
    switch(this.tab){
      case 'all':
        return this.projects
      case 'software':
        return this.software
      case 'game':
        return this.game
      case 'music':
        return this.music
    }
  }
});

function HomePage(){
  const snap=useSnapshot(state)

  useEffect(()=>{
    fetchProjects();
    console.log(state.projects);
  },[]);

  return (
    <>
      <section style={styles.section}>
        <Stack direction='column' sx={{width:'100%',justifyContent:"center",alignItems:"center"}}>
          <div style={{flexGrow:2.8}}></div>
          <Typography variant='h1' color='text' sx={{cursor:'default',fontWeight:500}}>idkwhodatis</Typography>
          <div style={{flexGrow:3}}></div>
          <IconButton disableRipple color='text' sx={{position:'absolute',bottom:20}}>
            <ArrowDownward/>
          </IconButton>
        </Stack>
      </section>
      
      <Box sx={{overflowY:'auto',height:'100vh',color:'white',borderRadius:'8px'}}>
        <section style={{height:'100vh'}}>
          <Box sx={{display:'flex',justifyContent:'center',boxShadow:3}}>
            <Tabs value={snap.tab} textColor='inherit' TabIndicatorProps={{style:{backgroundColor:'#FFFFFF'}}} onChange={(event,value)=>{state.tab=value;}}>
              <Tab disableRipple label="All" value="all" sx={styles.tab}/>
              <Tab disableRipple label="Software" value="software" sx={styles.tab}/>
              <Tab disableRipple label="Game" value="game" sx={styles.tab}/>
              <Tab disableRipple label="Music" value="music" sx={styles.tab}/>
            </Tabs>
          </Box>
          
          <Grid container spacing={6} sx={{paddingX:10,paddingY:2,justifyContent:'center'}}>
            {snap.display.length>0?snap.display.map(p=><Grid key={p.id} size={2.8}><Project project={p}/></Grid>):<p>Loading Projects</p>}
          </Grid>
        </section>
      </Box>
    </>
  )
}

export default HomePage

async function fetchProjects(){
  try{
    const projects=await ky.get('/projects/projects.json').json();
    let id=0;
    for(let i in projects){
      try{
        const project=await ky.get('/projects/'+projects[i]+'.json').json();
        project.id=id;
        project.name=projects[i];
        project.date=dayjs(project.date,'M.D.YYYY');
        state.projects.push(project);
        id++;
      }catch(e){
        console.error('Error fetching '+projects[i]+'.json'+e);
      }
    }
  }catch(e){
    console.error('Error fetching projects.json'+e);
  }
  state.projects.sort((a,b)=>b.date-a.date);
  state.software=state.projects.filter(i=>i.category==='software');
  state.game=state.projects.filter(i=>i.category==='game');
  state.music=state.projects.filter(i=>i.category==='music');
}

const styles={
  section:{
    display:'flex',
    height:'calc(100vh - 60px)',
    width:'100%'
  },
  tab:{
    textTransform:'none',
    transition:'background-color 0.3s ease',
    '&:hover':{backgroundColor:'#444444'},
    '&:active':{backgroundColor:'#555555'},
  }
}