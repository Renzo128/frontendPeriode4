import React from "react";

const Message = ({
  mess,
  index,
  edit_value,
  showinput,
  update,
  delete_value,
  isDisabled,
  sender,
  currentUser,
}) => {
  let messenger = true; // kijken of dat jij degene bent die het bericht heeft verstuurd
  if (currentUser === sender) {
    messenger = true;
  } else {
    messenger = false;
  }
  return (
    <div className="text-center" id={index + "div"}>
      {messenger ? ( // bericht verwijderen / updaten
        <div key={index} className="text-left">
          <button
            onClick={() => edit_value(index)}
            className="button"
            name="edit"
            disabled={isDisabled}
          >
            Edit
          </button>{" "}
          <button
            onClick={() => delete_value(index)}
            className="button"
            name="delete"
            disabled={isDisabled}
          >
            Delete
          </button>{" "}
          <div id={index + "delete"}>{mess}</div>
          {showinput ? (
            <p>
              <input id={index + "input"} type="tekst" defaultValue={mess} />
              <button
                onClick={() =>
                  update(index, document.getElementById(index + "input").value)
                }
              >
                Save
              </button>
            </p>
          ) : null}
        </div>
      ) : (
        <div key={index} className="text-right">
          {mess}
          {
            // bericht van andere gebruiker
          }
        </div>
      )}
    </div>
  );
};
export default Message;
