'use client'

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { doc, writeBatch, collection, getDoc } from 'firebase/firestore'
import { useState } from "react"
import { db } from "@/firebase"

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    // Submit text to generate flashcards using AI
    const handleSubmit = async () => {
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
        .then((res) => res.json())
        .then((data) => setFlashcards(data))  
    }

    // Handle card flip interaction
    const handleCardClick = (id) => {
        setFlipped((prev) => ({
           ...prev,
           [id]: !prev[id],
        }))
    }

    // Handle opening/closing of save dialog
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    // Save generated flashcards to Firestore
    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name')
            return
        }

        // Initialize a Firestore batch operation for atomic writes
      const batch = writeBatch(db)

      // Reference the user's document in Firestore
      const userDocRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(userDocRef)

      if (docSnap.exists()) {
          // Retrieve existing flashcard collections or initialize an empty array
          const collections = docSnap.data().flashcards || []

          // Check if a collection with the same name already exists
          if (collections.find((f) => f.name === name)) {
              alert("A flashcard collection with this name already exists.")
              return
          } else {
              // Add new collection name and update Firestore
              collections.push({ name })
              batch.set(userDocRef, { flashcards: collections }, { merge: true })
          }
      } else {
          // Create a new document with the first flashcard collection
          batch.set(userDocRef, { flashcards: [{ name }] })
      }

        // Save individual flashcards
        const colRef = collection(userDocRef, name)  
        flashcards.forEach(flashcard => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }
}
