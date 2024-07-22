import React from "react";
import "../styles/FieldEditor.css";

const FieldEditor = ({ field, handleChange }) => {
  return (
    <div>
      <h4 className="field-title">{field.type}</h4>
      <label>Title</label>
      <br />
      <input
        className="field-input"
        type="text"
        name="label"
        value={field.label}
        placeholder="Title"
        onChange={(e) => handleChange(e, field.id)}
      />
      <br />
      <br />
      <label>Placeholder</label>
      <br />
      <input
        className="field-input"
        type="text"
        name="placeholder"
        value={field.placeholder}
        placeholder="Placeholder"
        onChange={(e) => handleChange(e, field.id)}
      />
    </div>
  );
};

export default FieldEditor;
