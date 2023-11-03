import React, { useState } from "react";
import Modal from "../components/Modal.js";

const Sidebar = ({ group, onGroupClick, onCreateGroup }) => {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(true);
    console.log(modal);
  };
  const handleCloseModal = () => setModal(false);

  return (
    <div className="sidebar">
      <h1>Pocket Notes</h1>
      <button className="add-btn" onClick={handleModal}>
        + Create Notes group
      </button>

      <Modal
        show={modal}
        handleClose={handleCloseModal}
        handleCreateGroup={onCreateGroup}
      />
      <div className="sidebar-main">
        <ul>
          {group.map((item, index) => (
            <li key={index}>
              <div className="group" onClick={() => onGroupClick(item)}>
                <div
                  className="group-circle"
                  style={{ backgroundColor: item.color, color: "white" }}
                >
                  <h3>{item.name.substring(0, 2)}</h3>
                </div>
                <div className="group-name">
                  <h2>{item.name}</h2>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
