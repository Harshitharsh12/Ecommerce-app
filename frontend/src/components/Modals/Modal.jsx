import React from "react";

const Modal = ({ handleSubmit, name, setName, setVisible, header, footer }) => {
  return (
    <div
      onClick={() => {
        setVisible(false);
      }}
      className="Modal"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <h4> {header}</h4>
        <hr
          style={{
            color: "white",
            border: "1.8px solid #FFFFFF",
            marginLeft: "-15px",
          }}
        />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              style={{
                padding: "2px",
                borderRadius: "4px",
              }}
            />
            <button
              style={{
                marginLeft: "8px",
                background: "blue",
                paddingRight: "4px",
                paddingLeft: "4px",
                color: "white",
                borderRadius: "4px",
              }}
            >
              {footer}
            </button>
          </div>
          <hr
            style={{
              color: "white",
              border: "1.8px solid #FFFFFF",
              marginLeft: "-15px",
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
