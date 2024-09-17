'use client'

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Head from 'next/head'; 
import Link from "next/link";
import { Grid, AppBar, Box, Container, Toolbar, Typography, Button } from "@mui/material";  

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout ({
      sessionID: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

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

      <Container>
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h2">Welcome to Flashcard SaaS</Typography>
          <Typography variant="h5">
            The easiest way to make flashcards from your text
          </Typography>
          <Button href="/generate" variant="contained" sx={{ mt: 2, bgcolor: "black", '&:hover': { bgcolor: '#555' } }}>
            Get Started
          </Button>
        </Box>

        <Typography variant="h4" >
          Features
        </Typography> 
        <Box sx={{ my: 6 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ border: '1px solid gray', padding: 2, borderRadius: 2, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                <Typography variant="h6">Easy Text Input</Typography><br />
                <Typography>Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
              </Grid>
            <Grid item xs={12} md={4} sx={{ border: '1px solid gray', padding: 2}}>
              <Typography variant="h6">Smart Flashcards</Typography><br />
              <Typography>Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ border: '1px solid gray', padding: 2, borderRadius: 2, borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}>
              <Typography variant="h6">Accessible Anywhere</Typography><br />
              <Typography>Create and access your flashcards from any device. Anytime. Anywhere.</Typography>
            </Grid>
          </Grid>
        </Box>
        

        <Typography variant="h4" >
          Pricing
        </Typography>
        <Box sx={{my: 6}}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} sx={{ border: '1px solid gray', padding: 4, borderRadius: 2, borderTopRightRadius: 0, borderBottomRightRadius: 0, alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">Standard Package</Typography><br />
              <Typography variant="h6" ><i>$5/Month</i></Typography><br />
              <Typography gutterBottom>All the standard features you need to study like a pro.</Typography>
              <Button variant="contained" sx={{ mt: 2, bgcolor: "black", '&:hover': { bgcolor: '#555' } }}>Choose Standard</Button>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ border: '1px solid gray', padding: 4, borderRadius: 2, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
              <Typography variant="h6">Premium Package</Typography><br />
              <Typography variant="h6"><i>$10/Month</i></Typography><br />
              <Typography gutterBottom>Get unlimited access to all the features Flashcards SaaS has to offer!</Typography>
              <Button variant="contained" sx={{ mt: 2, bgcolor: "black", '&:hover': { bgcolor: '#555' } }}
              onClick={handleSubmit}>
                Choose Premium
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
