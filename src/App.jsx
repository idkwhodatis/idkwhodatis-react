import {GlobalStyles} from "@mui/material";
import {RouterProvider} from 'react-router-dom'
import router from './router/index.jsx'
import TopBar from './components/TopBar.jsx'

function App(){
  return (
    <>
      <GlobalStyles styles={{body:{backgroundColor:'#1C1C1C'}}}/>
      <TopBar/>
      <div style={{display:'flex',paddingTop:60,width:'100%',flexDirection:'column'}}>
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
