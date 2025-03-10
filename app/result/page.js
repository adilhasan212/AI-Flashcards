'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import getStripe from "@/utils/get-stripe"
import { useSearchParams } from "next/navigation"
import { Card, CardActionArea, CardContent, Grid, Typography, AppBar, Toolbar, Link, Box, Button, Container } from "@mui/material"

const ResultPage = ()=> {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    // State variables to manage loading status, session data, and errors
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = usetState(null) // Holds any errors that occur during the fetch

    useEffect (() =>{
        const fetchCheckoutSession = async ()=> {
            if (!session_id) return // Exit early if there's no session ID

            try {
                // Fetch checkout session details from the API
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()

                if (res.ok) {
                    setSesstion(sessionData) // Store session details
                }
                else {
                    setError(sessionData.error) // Store error message if request fails
                }
            }
            catch {
                setError ("An error occurred.") // Handle network or unexpected errors
            }
            finally {
                setLoading(false) // Ensure loading state is disabled after request finishes
            }
        }

        fetchCheckoutSession() 
    }, [session_id]) // Runs whenever session_id changes

    // Show a loading message while waiting for session data
    if (loading) {
        return (
            <Container maxWidth="100vw" sx={{textAlign: 'center', mt: 4,}}>
                <Typography variant="h6"> Loading... </Typography>
            </Container>
        )
    }

    // Display an error message if session retrieval fails
    if (error) {
        return (
        <Container maxWidth="100vw" sx ={{textAlign: 'center', mt: 4, }}>
            <Typography variant="h6"> {error} </Typography>
        </Container>

        )
    }

    return (
        <Container maxWidth="100vw" sx={{textAlign: 'center', mt: 4}}>
            {
                session.payment_status === "paid" ? ( // Check if payment was successful
                    <>
                    <Typography variant='h4'> Thank you for purchasing! </Typography>
                    <Box sx={{mt:22}}>
                        <Typography variant="h6"> Session ID: {session_id} </Typography>
                        <Typography variant="body1"> We have received your payment. You will receive an email with the order details shortly. </Typography>
                    </Box>
                    </>
                ) : (
                    <>
                    <Typography variant='h4'> Payment Failed </Typography>
                    <Box sx={{mt:22}}>
                        <Typography variant="h6"> Session ID: {session_id} </Typography>
                        <Typography variant="body1"> Payment unsuccessful, please try again. </Typography>
                    </Box>
                    </>
                )}
        </Container>
    )
}
