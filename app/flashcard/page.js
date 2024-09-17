'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from "@/firebase"
import { useSearchParams } from "next/navigation"
import { Box, Grid, Container, Typography, Card, CardActionArea, CardContent, AppBar, Toolbar, Link, Button } from "@mui/material"

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
  
    const searchParams = useSearchParams()
    const search = searchParams.get('id')    

    useEffect(()=> {
        async function getFlashcard() {
            if (!search || !user) return 
            const docRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(docRef)
            const flashcards = []
            
            docs.forEach((doc) => {
                flashcards.push({id: doc.id, ...doc.data()})
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])  

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
           ...prev,
           [id]: !prev[id],
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    return (
        <>
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

                <Grid container spacing={3} sx={{mt: 4}}>
                    {flashcards.map((flashcard,index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent>
                                        <Box sx={{
                                            perspective: '1000px',
                                            '& > div' : {
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                width: '100%',
                                                height: '300px',
                                                boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                                transform: flipped[index] ? 'rotateX(-180deg)' : 'rotateX(0deg)',
                                            },
                                            '& > div > div' : {
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
                                                <div>
                                                    <Typography variant="h6" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>

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
