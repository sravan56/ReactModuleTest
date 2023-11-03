import React, { useState, useEffect } from "react";
import doodle from "../images/doodle.png";
import lock from "../images/lock.png";
import sent from "../images/sent.png";

const Area = ({ groupItem, handleBack }) => {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (groupItem) {
      const savedNotes = JSON.parse(localStorage.getItem(groupItem.name)) || [];

      setNotes(savedNotes);
    }
  }, [groupItem]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${time}`;
  };
  const formatDate = (datestamp) => {
    const date = new Date(datestamp);
    const dateString = date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return `${dateString}`;
  };

  const handleNote = () => {
    if (noteText.trim() === "") {
      return;
    }
    if (groupItem) {
      const newNote = {
        text: noteText,
        timestamp: formatTime(Date.now()),
        datestamp: formatDate(Date.now()),
      };
      const updatedNotes = [...notes, newNote];
      localStorage.setItem(groupItem.name, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      setNoteText("");
    }
  };

  return (
    <div className="area">
      {groupItem ? (
        <div className="header">
          <span className="back" onClick={handleBack}>
            &larr;
          </span>
          <div
            className="group-circle"
            style={{ backgroundColor: groupItem.color, color: "white" }}
          >
            <h3>{groupItem.name.substring(0, 2)}</h3>
          </div>
          <div className="group-name">
            <h2>{groupItem.name}</h2>
          </div>
        </div>
      ) : (
        <div className="open-area">
          <img src={doodle} alt="doodle" />
          <h1>Pocket Notes</h1>
          <p>Send and receive message without keeping your phone online.</p>
          <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          <div className="e-to-e">
            <img src={lock} alt="lock"></img>
            <h3>end-to-end encrypted</h3>
          </div>
        </div>
      )}

      {groupItem && (
        <>
          <div className="show-area">
            {notes.map((note, index) => (
              <div key={index} className="note">
                <div>
                  <h6>{note.timestamp}</h6>
                  <h6>{note.datestamp}</h6>
                </div>
                <p>{note.text}</p>
              </div>
            ))}
          </div>
          <div className="note-area">
            <textarea
              placeholder="Enter your text here......."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <button className="sent-btn" onClick={handleNote}>
              <img src={sent} alt="sent-button"></img>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Area;
