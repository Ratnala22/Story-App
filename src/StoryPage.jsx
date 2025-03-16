import { useLocation, useNavigate } from "react-router-dom";
import { use, useEffect, useState } from "react";
import axios from "axios";
import ButtonFn from "./components/Button";
import { CircularProgress, Container, Box, Typography, Grid } from '@mui/material'

function StoryPage() {
    const location = useLocation();

    const [storyParts, setStoryParts] = useState([]);
    const [options, setOptions] = useState([]);
    const [image, setImage] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [continuationLoading, setContinuationLoading] = useState(false);

    useEffect(() => {
        async function fetchInitialStory() {
            try {
                if (location.state?.isLoading && location.state?.genre) {
                    const response = await axios.post("http://localhost:3000/startStory", {
                        genre: location.state.genre
                    });
                    setStoryParts([response.data.story]);
                    if (response.data.image) {
                        setImage([response.data.image]);
                    }
                    const newOptions = extractOptions(response.data);
                    setOptions(newOptions);
                }
            } catch (error) {
                console.error("Error starting story: ", error);
            } finally {
                setInitialLoading(false);
            }
        }
        fetchInitialStory();
    }, [location.state]);

    async function handleOptionSelect(option) {
        try {
            setContinuationLoading(true);
            const response = await axios.post("http://localhost:3000/generateOptions", { option });
            setStoryParts((prevParts) => [...prevParts, response.data.story]);
            setImage((prevImages) => [...prevImages, response.data.image]);
            const newOptions = extractOptions(response.data);
            setOptions(newOptions);
        } catch (error) {
            console.error("Error generating story: ", error);
        } finally {
            setContinuationLoading(false);
        }
    }

    function extractOptions(data) {
        return Object.keys(data)
            .filter((key) => key.startsWith("option"))
            .map((key) => data[key])
            .filter((option) => option);
    }

    if (initialLoading) {
        return (
            <div style={{ 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <CircularProgress size={60} />
                <h2>Generating your story...</h2>
            </div>
        );
    }

    if (!storyParts.length) {
        return <h2 style={{ textAlign: "center" }}>End of the Story. Please start a new story from HomePage</h2>
    }

    return (
        <Container maxWidth="lg" sx={{ 
            padding: { xs: '20px', md: '40px' },
            backgroundColor: '#1a1a1a',
            minHeight: '100vh',
            color: 'white'
        }}>
            <Typography
                variant="h2"
                sx={{
                    textAlign: 'center',
                    mb: 4,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    color: 'white'
                }}
            >
                Here's Your Story
            </Typography>
            <StoryContent storyParts={storyParts} storyImages={image} />
            {continuationLoading ? (
                <Box sx={{ 
                    textAlign: 'center', 
                    padding: '20px',
                    marginTop: '20px'
                }}>
                    <CircularProgress size={40} />
                    <Typography>Generating next part of your story...</Typography>
                </Box>
            ) : (
                <StoryOptions options={options} onOptionSelect={handleOptionSelect} />
            )}
        </Container>
    )
}

function StoryContent({ storyParts, storyImages }) {
    return (
        <Box sx={{ margin: { xs: '0 10px', md: '0 20px' } }}>
            {storyParts.map((part, index) => (
                <Grid 
                    container 
                    key={index}
                    spacing={4}
                    direction={index % 2 === 0 ? 'row' : 'row-reverse'}
                    sx={{
                        mb: 6,
                        alignItems: 'center',
                    }}
                >
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                lineHeight: 1.6,
                                padding: { xs: '10px', md: '20px' },
                            }}
                        >
                            {part}
                        </Typography>
                    </Grid>
                    {storyImages[index] && (
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    padding: { xs: '10px', md: '20px' },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={`data:image/png;base64,${storyImages[index]}`}
                                    sx={{
                                        width: '100%',
                                        maxWidth: '400px',
                                        height: 'auto',
                                        aspectRatio: '400/350',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                                    }}
                                />
                            </Box>
                        </Grid>
                    )}
                </Grid>
            ))}
        </Box>
    );
}

function StoryOptions({ options, onOptionSelect }) {
    return (
        <Grid 
            container 
            spacing={3}
            sx={{ 
                justifyContent: "center",
                margin: "40px 0",
                padding: { xs: '0 10px', md: '0 20px' }
            }}
        >
            {options.map((option) => (
                <Grid item xs={12} md={6} key={option}>
                    <Box
                        onClick={() => onOptionSelect(option)}
                        sx={{
                            maxWidth: '400px',
                            margin: '0 auto',
                            padding: '25px',
                            border: '2px solid #3f51b5',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: '#3f51b5',
                            color: 'white',
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                                transform: 'translateY(-3px)',
                                backgroundColor: '#303f9f',
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
                            }
                        }}
                    >
                        <Typography>{option}</Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default StoryPage;