'use client'

// Import necessary dependencies
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { doc, getDoc, setDoc, collection } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { Card, CardActionArea, CardContent, Grid, Typography, AppBar, Toolbar, Link, Box, Button } from "@mui/material"
import { Container } from "@mui/system"
import { Cedarville_Cursive } from "next/font/google"

export default function Flashcard() {
    const router = useRouter();
    const { isLoaded, isSignedIn, user } = useUser() // Retrieve user authentication state
    const [flashcards, setFlashcards] = useState([]) // Store flashcard collections

    // Fetch user's flashcard collections from Firestore when the component mounts
    useEffect(() => {
        async function getFlashcards() {
            if (!user) return // Exit if user is not signed in

            const docRef = doc(collection(db, 'users'), user.id) // Reference to the user's document
            const docSnap = await getDoc(docRef) // Fetch document data

            if (docSnap.exists()) {
                // Retrieve flashcard collections if they exist
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                // Initialize an empty flashcard collection if none exists
                await setDoc(docRef, { flashcards: [] })
            }
        }

        getFlashcards()
    }, [user]) // Re-run when user changes

    // Prevent rendering if user data isn't loaded or user isn't signed in
    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    // Redirect to flashcard details page when a collection is clicked
    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <>
            {/* Navigation Bar */}
            <AppBar maxWidth="100vw" position="static" sx={{ bgcolor: "black" }}>
                <Toolbar>
                    <Link href="/" passhref='true' legacyBehavior sx={{ color: "white", textDecoration: "none", cursor: "pointer" }}>
                        <Typography variant="h6" sx={{ flexGrow: 1 }} >
                            Flashcard SaaS
                        </Typography>
                    </Link>
                    <Box sx={{ marginLeft: 'auto' }}>  
                        <Button href="/flashcards" color="inherit" sx={{ '&:hover': { bgcolor: '#555' } }}>
                            Collections
                        </Button>
                        <Button href='/sign-up' color="inherit" sx={{ '&:hover': { bgcolor: '#555' } }}>
                            Login
                        </Button>
                        <Button href='/sign-up' color="inherit" sx={{ '&:hover': { bgcolor: '#555' } }}>
                            Sign Up
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            
            {/* Flashcard Collections */}
            <Container maxWidth="md">
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
                    <Typography variant="h4">Flashcard Collections</Typography>
                </Box>

                {/* Display list of flashcard collections */}
                <Grid container spacing={3} sx={{ mt: 4 }}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {flashcard.name}
                                        </Typography>
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
