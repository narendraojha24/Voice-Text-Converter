import React, { useState } from "react";

const SavedTexts = ({ savedTexts, setSavedTexts }) => {
    const handleDownload = (text) => {
        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "saved_text.txt";
        link.click();
    };

    const handleEdit = (index, newText) => {
        const updatedTexts = [...savedTexts];
        updatedTexts[index].text = newText;
        setSavedTexts(updatedTexts);
    };

    const handleDelete = (index) => {
        const updatedTexts = savedTexts.filter((_, i) => i !== index);
        setSavedTexts(updatedTexts);
    };

    return (
        <div>
            <h2 style={{color:"white",height:30,}}>Saved Texts</h2>
            {savedTexts.length > 0 ? (
                savedTexts.map((saved, index) => (
                    <div key={index} style={{ border: "2px solid white", margin: "10px", padding: "10px",borderRadius:20 }}>
                        <p style={{color:"white",fontSize:20}}>{saved.text}</p>
                        <p style={{ fontSize: "0.6em", color: "gray" }}>Saved on: {saved.date}</p>
                        <select
                            onChange={(e) => {
                                const option = e.target.value;
                                if (option === "download") handleDownload(saved.text);
                                if (option === "edit") {
                                    const newText = prompt("Edit your text:", saved.text);
                                    if (newText) handleEdit(index, newText);
                                }
                                if (option === "delete") handleDelete(index);
                            }}
                        >
                            <option value="">Options</option>
                            <option value="download">Download</option>
                            <option value="edit">Edit</option>
                            <option value="delete">Delete</option>
                        </select>
                    </div>
                ))
            ) : (
                <p>No texts saved yet.</p>
            )}
        </div>
    );
};

export default SavedTexts;
