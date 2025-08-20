"use client"

import { useEffect, useRef, useState } from "react"

const useSpeechToText = (options) => {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const recognitionRef = useRef(null)

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.log("webkit  speech  recognition is not supported in this browser")
            return
        }
        // new instance of webkit speech recognition

        recognitionRef.current = new window.webkitSpeechRecognition()
        const recognition = recognitionRef.current
        recognition.interimReults = options.interimResults || false
        recognition.continuous = options.continuous || false
        recognition.lang = options.lang || "en-US"

        if ("webkitSpeechRecognition" in window) {
            const grammar = "#JSGF v1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;"
            const speechRecognitionList = new window.webkitSpeechGrammarList()
            speechRecognitionList.addFromString(grammar, 1)
            recognition.grammars = speechRecognitionList
        }

        recognition.onresult = (event) => {
            let text = ""
            for (let i = 0; i < event.results.length; i++) {
                text += event.results[i][0].transcript
            }
            setTranscript(text)
        }
        recognition.onerror = (event) => {
            console.log("error has occurred while recognition")
        }
        recognition.onend = () => {
            setIsListening(false)
        }
        return () => {
            recognition.stop()
        }


    }, [])

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start()
            setIsListening(true)
        }
    }

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
        }
    }

    return {
        isListening,
        transcript,
        startListening,
        stopListening
    }
}

export default useSpeechToText
