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


    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = usetState(null)

    useEffect (() =>{
        const fetchCheckoutSession = async ()=> {
            if (!session_id) return

            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()
                if (res.ok) {
                    setSesstion(sessionData)
                }
                else {
                    setError(sessionData.error)
                }
            }
            catch {
                setError ("An error occurred.")
            }
            finally {
                setLoading(false)
            }
        }

        fetchCheckoutSession() 
    }, [session_id])

    if (loading) {
        return (
            <Container maxWidth="100vw" sx={{textAlign: 'center', mt: 4,}}>
                <Typography variant="h6"> Loading... </Typography>
            </Container>
        )
    }

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
                session.payment_status === "paid" ? (
                    <>
                    <Typography variant='h4'> Thank you for purchasing! </Typography>
                    <Box sx={{mt:22}}>
                        <Typography variant="h6"> Session ID: {session_id} </Typography>
                        <Typography variant="body1"> We have recieved your payment. You will recieve an email with the order details shortly. </Typography>
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

