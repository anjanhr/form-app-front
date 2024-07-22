import React from "react";
import editPic from "../assets/edit.png";
import deletePic from "../assets/delete.png";
import "../styles/FieldList.css"; 

const FieldList = ({ fields, startEditing, deleteField }) => {
  return (
    <div className="field-list-container">
      {fields.map((field) => (
        <div key={field.id} className="field-item">
          <input
            type="text"
            value={field.label}
            placeholder={field.placeholder ? field.placeholder : "Title"}
            readOnly
          />
          <img
            onClick={() => startEditing(field.id)}
            src={editPic}
            alt="Edit"
          />
          <img
            onClick={() => deleteField(field.id)}
            src={deletePic}
            alt="Delete"
          />
        </div>
      ))}
    </div>
  );
};

export default FieldList;
