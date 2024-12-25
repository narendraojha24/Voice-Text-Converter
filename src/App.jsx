import React, { useState } from "react";
import SavedTexts from "./SavedTexts";
import './App.css';


const VoiceToText = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [savedTexts, setSavedTexts] = useState([]);

    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.continuous = true;

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            setText((prev) => prev + " " + transcript);
        };

        recognition.onerror = (event) => console.error(event.error);
        recognition.onend = () => setIsListening(false);

        recognition.start();
    };

    const stopListening = () => setIsListening(false);

    const clearText = () => setText("");

    const saveText = () => {
        const date = new Date();
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        setSavedTexts([...savedTexts, { text, date: formattedDate }]);
        setText(""); // Clear after saving
    };

    return (
        <div>
            <h1>Voice to Text Converter</h1>
            <button onClick={startListening} disabled={isListening}>Start</button>
            <button onClick={stopListening} disabled={!isListening}>Stop</button>
            <button onClick={clearText} disabled={!text}>Clear</button>
            <button onClick={saveText} disabled={!text}>Save Text</button>
            <textarea value={text} readOnly rows="10" cols="50" />
            <SavedTexts savedTexts={savedTexts} setSavedTexts={setSavedTexts} />
        </div>
    );
};

export default VoiceToText;
