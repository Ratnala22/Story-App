import { useState } from 'react'
import './App.css'
import ButtonAppBar from './components/header'
import ButtonFn from './components/Button'
import { Button, ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import TextField from '@mui/material/TextField'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import StoryPage from './StoryPage'
import { Description } from '@mui/icons-material'
import axios from 'axios';

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  }
});

function HomePage() {
  const options = ["Action", "Adventure", "Cars", "Comedy", "Dementia", "Demons", "Drama", "Fantasy", "Game", "Historical", "Horror", "Magic", "Martial Arts", "Military", "Music", "Mystery", "Parody", "Romance", "Sci-Fi", "Super Natural", "Sports", "Super Power", "Thriller"];
  const durations = ["Short", "Medium", "Long"];
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

  const navigate = useNavigate();

  async function handleStory() {
    navigate("/story", {
      state: {
        isLoading: true,
        genre: selectedGenre
      }
    });
  }

  return (
    <div style={{ 
      height: "100vh",
      backgroundColor: '#121212',
      position: 'relative',
      background: 'linear-gradient(135deg, #121212 0%, #1a1a1a 100%)',
      overflow: 'hidden'
    }}>
      <ButtonAppBar />
      <div style={{ 
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
        overflow: 'auto'
      }}>
        <div>
          <h2 style={{ 
            color: "#90CAF9",
            fontSize: '2.2rem',
            fontFamily: "'Playfair Display', serif",
            fontWeight: '600',
            textShadow: '0 2px 4px rgba(33, 150, 243, 0.3)',
            marginBottom: '16px',
            background: 'linear-gradient(45deg, #90CAF9 30%, #64B5F6 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px'
          }}>Duration</h2>
          <div style={{ 
            display: "flex", 
            gap: "16px", 
            flexWrap: "wrap",
            marginBottom: '24px'
          }}>
            {durations.map((duration) => (
              <ButtonFn 
                key={duration} 
                onClickHandler={() => setSelectedDuration(duration)}
                isdisable={selectedDuration === duration} 
                label={duration} 
              />
            ))}
          </div>

          <h2 style={{ 
            color: "#90CAF9",
            fontSize: '2.2rem',
            fontFamily: "'Playfair Display', serif",
            fontWeight: '600',
            textShadow: '0 2px 4px rgba(33, 150, 243, 0.3)',
            marginBottom: '16px',
            background: 'linear-gradient(45deg, #90CAF9 30%, #64B5F6 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px'
          }}>Genre</h2>
          <div style={{ 
            display: "flex", 
            gap: "16px", 
            flexWrap: "wrap",
            marginBottom: '24px'
          }}>
            {options.map((option) => (
              <ButtonFn 
                key={option} 
                onClickHandler={() => setSelectedGenre(option)} 
                isdisable={option === selectedGenre} 
                label={option} 
              />
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          flex: 1,
          justifyContent: 'center'
        }}>
          <TextField
            multiline
            maxRows={4}
            placeholder="Enter Description...."
            variant="outlined"
            value={selectedDescription}
            onChange={(e) => setSelectedDescription(e.target.value)}
            // inputProps={{
            //   style: {
            //     height: "70px",
            //   },
            // }}
            sx={{
              width: '600px',
              maxWidth: '90%',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(30, 30, 30, 0.9)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(8px)',
                '& fieldset': {
                  borderColor: 'rgba(33, 150, 243, 0.2)',
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: '#2196f3',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196f3',
                  borderWidth: '2px',
                  boxShadow: '0 0 20px rgba(33, 150, 243, 0.2)',
                },
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.4)',
                }
              },
              '& .MuiOutlinedInput-input': {
                padding: '16px',
                fontSize: '1rem',
                lineHeight: '1.5',
                color: 'rgba(255, 255, 255, 0.9)'
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleStory}
            sx={{
              fontSize: '1.1rem',
              padding: '12px 40px',
              borderRadius: '8px',
              backgroundColor: '#2196f3',
              color: '#fff',
              textTransform: 'none',
              boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)',
              '&:hover': {
                backgroundColor: '#1976d2',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 25px rgba(33, 150, 243, 0.6)',
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return(
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/story' element={<StoryPage/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;

