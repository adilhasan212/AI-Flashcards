'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from "@/firebase"
import { useSearchParams } from "next/navigation"
import { Box, Grid, Container, Typography, Card, CardActionArea, CardContent, AppBar, Toolbar, Link, Button } from "@mui/material"

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser() // Retrieve user authentication state
    const [flashcards, setFlashcards] = useState([]) // Store flashcards for display
    const [flipped, setFlipped] = useState([]) // Track flipped state of each flashcard
  
    const searchParams = useSearchParams()
    const search = searchParams.get('id') // Get flashcard collection ID from URL params  

    // Fetch flashcards from Firestore when component mounts or dependencies change
    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return // Exit if no collection ID or user is not signed in
            
            // Reference to the specific flashcard collection in Firestore
            const docRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(docRef)
            const flashcardsArray = []

            // Retrieve flashcard data and store it in state
            docs.forEach((doc) => {
                flashcardsArray.push({ id: doc.id, ...doc.data() })
            })
            setFlashcards(flashcardsArray)
        }
        getFlashcard()
    }, [user, search]) // Runs whenever `user` or `search` changes

    // Handle card flip interaction
    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    // Prevent rendering if user data isn't loaded or user isn't signed in
    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    return (
        <>
            {/* Navigation Bar */}
            <AppBar maxWidth="100vw" position="static" sx={{ bgcolor: "black" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Flashcard SaaS
                    </Typography>
                    <Box sx={{ marginInline: 'auto' }}>
                        <Button href="/flashcards" color="inherit" sx={{ '&:hover': { bgcolor: '#555' } }}>
                            Collections
                        </Button>
                    </Box>
                    <Box sx={{ marginLeft: 'auto' }}>
                        <SignedOut>
                            <Button href='/sign-in' passHref='true' color="inherit" sx={{ '&:hover': { bgcolor: '#555' } }}>
                                Login
                            </Button>
                            <Button href='/sign-up' color="inherit" sx={{ '&:hover': { bgcolor: '#555' } }}>
                                Sign Up
                            </Button>
                        </SignedOut>
                        {/* Show user profile button when signed in */}
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="100vw">
                {/* Display Collection ID */}
                {search && (
                    <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
                        {search}
                    </Typography>
                )}

                {/* Display flashcards */}
                <Grid container spacing={3} sx={{ mt: 4 }}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent>
                                        {/* Flashcard flip animation */}
                                        <Box sx={{
                                            perspective: '1000px',
                                            '& > div': {
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                width: '100%',
                                                height: '300px',
                                                boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                                transform: flipped[index] ? 'rotateX(-180deg)' : 'rotateX(0deg)',
                                            },
                                            '& > div > div': {
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                backfaceVisibility: 'hidden',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 3,
                                                boxSizing: 'border-box',
                                                overflowY: 'auto',
                                            },
                                            '& > div > div:nth-of-type(2)': {
                                                transform: 'rotateX(-180deg)'
                                            },
                                        }}>
                                            <div>
                                                {/* Front of the flashcard */}
                                                <div>
                                                    <Typography variant="h6" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>

                                                {/* Back of the flashcard */}
                                                <div>
                                                    <Typography variant="h6" component="div">
                                                        {flashcard.back}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}
