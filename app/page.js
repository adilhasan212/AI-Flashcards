'use client'

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Head from 'next/head'; 
import Link from "next/link";
import { Grid, AppBar, Box, Container, Toolbar, Typography, Button } from "@mui/material";  

export default function Home() {
  // Function to handle checkout session creation and redirect to Stripe
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000' // Change this to production URL when deployed
      },
    })
    
    const checkoutSessionJson = await checkoutSession.json()

    // Handle error cases
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    // Retrieve Stripe instance and redirect to checkout
    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
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
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
