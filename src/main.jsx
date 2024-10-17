import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createTheme,ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import App from './App.jsx'
import './assets/index.css'
import ReactGA from "react-ga4";

const theme=createTheme({
  palette:{
    primary:{
      main:'#1C1C1C',
    },
    secondary:{
      main:'#2B2B2B',
    },
    teritary:{
      main:'#3A3A3A'
    },
    text:{
      main:'#FFFFFF',
    },
  },
  typography:{
    fontFamily:'Inter,sans-serif',
    allVariants:{
      fontFeatureSettings:"'liga' 1,'calt' 1",
    },
  },
});

ReactGA.initialize('G-72TN0WS6GH');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App/>
    </ThemeProvider>
  </StrictMode>
)
