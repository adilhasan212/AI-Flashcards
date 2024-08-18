import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Head from 'next/head'; 
import { Grid, AppBar, Box, Container, Toolbar, Typography, Button } from "@mui/material";  // Import Button from MUI

export default function Home() {
  return (
    <>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static" sx={{ width: "100%", bgcolor: "black" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" sx={{ '&:hover': { bgcolor: '#555' } }}>Login</Button>
            <Button color="inherit" sx={{ '&:hover': { bgcolor: '#555' } }}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container>
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h2">Welcome to Flashcard SaaS</Typography>
          <Typography variant="h5">
            The easiest way to make flashcards from your text
          </Typography>
          <Button variant="contained" sx={{ mt: 2, bgcolor: "black", '&:hover': { bgcolor: '#555' } }}>
            Get Started
          </Button>
        </Box>

        <Typography variant="h4" >
          Features
        </Typography> 
        <Box sx={{ my: 6 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ border: '1px solid gray', padding: 2, borderRadius: 2 }}>
                <Typography variant="h6">Easy Text Input</Typography><br />
                <Typography>Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
              </Grid>
            <Grid item xs={12} md={4} sx={{ border: '1px solid gray', padding: 2, borderRadius: 2 }}>
              <Typography variant="h6">Smart Flashcards</Typography><br />
              <Typography>Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ border: '1px solid gray', padding: 2, borderRadius: 2 }}>
              <Typography variant="h6">Accessible Anywhere</Typography><br />
              <Typography>Create and access your flashcards from any device. Anytime. Anywhere.</Typography>
            </Grid>
          </Grid>
        </Box>
        

        <Typography variant="h4" >
          Pricing
        </Typography>
        <Box sx={{my: 6}}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ border: '1px solid gray', padding: 2, borderRadius: 2 }}>
              <Typography variant="h6">Standard Package</Typography><br />
              <Typography>Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ border: '1px solid gray', padding: 2, borderRadius: 2 }}>
              <Typography variant="h6">Pro Package</Typography><br />
              <Typography>Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ border: '1px solid gray', padding: 2, borderRadius: 2 }}>
              <Typography variant="h6">Premium Package</Typography><br />
              <Typography>Create and access your flashcards from any device. Anytime. Anywhere.</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
