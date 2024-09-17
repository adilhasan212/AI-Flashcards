import { SignIn, SignUp } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Link, Toolbar, Typography } from "@mui/material";

export default function SignUpPage() {
    return ( 
    <>
        <AppBar maxWidth="100vw" position="static" sx={{ bgcolor: "black" }}>
            <Toolbar>
                <Link href="/" passHref legacyBehavior sx={{ color: "white", textDecoration: "none" }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Flashcard SaaS
                    </Typography>
                </Link>
                
                <Box sx={{ marginLeft: 'auto' }}>  
                    <Button color="inherit" sx={{ '&:hover': { bgcolor: '#555' } }}>
                        <Link href="/sign-in" passHref sx={{ color: "white", textDecoration: "none" }}> 
                            Login
                        </Link>
                    </Button>
                    <Button color="inherit" sx={{ '&:hover': { bgcolor: '#555' } }}>
                        <Link href="/sign-up" passHref sx={{ color: "white", textDecoration: "none" }}>
                            Sign Up
                        </Link>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
        <br />
        <Box display="flex" justifyContent="center" alignItems="center">
            <Typography  fontSize="2.5em" gutterBottom>
                Sign Up
            </Typography>
        </Box>
        <Box 
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
            <SignUp />
        </Box>
        <br />
        <br />
    </>
    );
}
