import React, { useState } from "react";

const Modal = ({ show, handleClose, handleCreateGroup }) => {
  const [groupname, setGroupName] = useState("");
  const [groupcolor, setGroupColor] = useState("");

  const colors = [
    { label: "hex1", value: "#B38BFA" },
    { label: "hex2", value: "#FF79F2" },
    { label: "hex3", value: "#43E6FC" },
    { label: "hex4", value: "#F19576" },
    { label: "hex5", value: "#0047FF" },
    { label: "hex6", value: "#6691FF" },
  ];
  const handleCreate = () => {
    if (groupname && groupcolor) {
      handleCreateGroup({ name: groupname, color: groupcolor });
      setGroupName("");
      setGroupColor("");
      handleClose();
    }
  };
  return (
    <div className={`note-modal${show ? " show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Create New Notes group</h2>
        <div className="modal-body">
          <label>Group Name</label>
          <input
            type="text"
            placeholder="Enter your group name...."
            value={groupname}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          />
        </div>

        <div className="color-options">
          <label>Choose colour</label>
          {colors.map((color) => (
            <div
              key={color.value}
              className={`color-circle ${
                groupcolor === color.value ? "selected" : ""
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => setGroupColor(color.value)}
            ></div>
          ))}
        </div>
        <button className="primary" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Modal;
