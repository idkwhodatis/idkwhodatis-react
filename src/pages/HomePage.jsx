import {useEffect,useRef} from 'react';
import {proxy,useSnapshot} from 'valtio'
import ky from 'ky';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import '../assets/App.css'
import {Typography,Stack,IconButton,Box,Tabs,Tab,Grid2,Fab,Zoom,useScrollTrigger} from '@mui/material'
import {ArrowDownward,KeyboardArrowUp} from '@mui/icons-material'

import Project from '../components/Project.jsx'
import store from '../utils/Store.jsx'
import bus from '../utils/EventBus.jsx'

dayjs.extend(customParseFormat);
const Grid=Grid2;

const state=proxy({
  tab:'all',
  projects:[],
  software:[],
  game:[],
  music:[],
  scrollOffset:0,
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

const refs={
  home:null,
  project:null,
  scroll:null
}

function HomePage(){
  const snap=useSnapshot(state)

  const homeRef=useRef(null);
  const projectRef=useRef(null);
  const scrollRef=useRef(null);
  refs.home=homeRef;
  refs.project=projectRef;
  refs.scroll=scrollRef;

  const fabTrigger=useScrollTrigger({threshold:150});

  useEffect(()=>{
    if(state.projects.length==0){
      fetchProjects();
    }
    state.scrollOffset=0;

    const elScroll=refs.scroll.current;
    if(elScroll){
      elScroll.addEventListener('scroll',scrollSectionHandler);
    }

    const elHome=refs.home.current;
    if(elHome){
      elHome.addEventListener('wheel',(event)=>{scrollHandler(event,false)},{passive:false});
    }
    const elProject=refs.project.current;
    if(elProject){
      elProject.addEventListener('wheel',(event)=>{scrollHandler(event,true)},{passive:false});
    }

    bus.on('scrollTo',(home)=>{
      if(home==='projects'){
        scrollTo(false,false)
      }else{
        scrollTo(home)
      }
    });

    return ()=>{
      if(elScroll){
        elScroll.removeEventListener('scroll',scrollSectionHandler);
      }
      if(elHome){
        elHome.removeEventListener('wheel',(event)=>{scrollHandler(event,false)});
      }
      if(elProject){
        elProject.removeEventListener('wheel',(event)=>{scrollHandler(event,true)});
      }

      bus.all.clear();
    }
  },[]);

  return (
    <>
      <section ref={refs.home} style={styles.section}>
        <Stack direction='column' sx={{width:'100%',justifyContent:"center",alignItems:"center"}}>
          <div style={{flexGrow:2.8}}></div>
          <Typography variant='h1' color='text' sx={{cursor:'default',fontWeight:500}}>idkwhodatis</Typography>
          <div style={{flexGrow:3}}></div>
          <IconButton onClick={()=>scrollTo(false)} disableRipple color='text' sx={{position:'absolute',bottom:20}}>
            <ArrowDownward/>
          </IconButton>
        </Stack>
      </section>
      
      <Box ref={refs.scroll} className='scrollable-section' sx={{overflowY:'auto',height:'100vh',color:'white',borderRadius:'8px'}}>
        <section ref={refs.project} style={{height:'100vh'}}>
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

          <Zoom in={fabTrigger} unmountOnExit>
            <Fab onClick={()=>scrollTo(true)} color='primary' sx={{position:'fixed',bottom:18,right:18,transition:'background-color 0.3s ease','&:hover':{backgroundColor:'#3b3b3b'}}}>
              <KeyboardArrowUp/>
            </Fab>
          </Zoom>
        </section>
      </Box>
    </>
  )
}

export default HomePage

function scrollTo(toHome,smooth=true){
  let pos;
  if(toHome&&store.currSection!='Home'){
    pos=0;
    window.scrollTo({top:pos,behavior:'smooth'});
    store.currSection='Home';
  }else if(!toHome&&store.currSection!='Projects'){
    const el=refs.project.current;
    if(el){
      pos=el.getBoundingClientRect().top+state.scrollOffset-60;
    }
    if(smooth){
      window.scrollTo({top:pos,behavior:'smooth'});
    }else{
      window.scrollTo({top:pos});
    }
    store.currSection='Projects';
  }
}

function scrollSectionHandler(){
  const el=refs.scroll.current;
  if(el){
    state.scrollOffset=el.scrollTop;
  }
}

function scrollHandler(event,home){
  if(home){
    console.log(event.deltaY);
    console.log(state.scrollOffset);
    if(event.deltaY<0&&state.scrollOffset==0){
      event.preventDefault();
      scrollTo(true);
    }
  }else{
    if(event.deltaY>0){
      event.preventDefault();
      scrollTo(false);
    }
  }
}

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