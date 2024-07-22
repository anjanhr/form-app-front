import React, { useState, useEffect } from "react";
import FieldEditor from "./FieldEditor";
import FieldList from "./FieldList";
import editPic from "../assets/edit.png";
import "../styles/Form.css";

const Form = ({ initialFormData, onSubmit, title }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [editorFieldId, setEditorFieldId] = useState(null);
  const [showTitleEditor, setShowTitleEditor] = useState(false);
  const [showFieldOptions, setShowFieldOptions] = useState(false);

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const addField = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      fields: [
        ...prevData.fields,
        {
          id: Date.now(),
          type: type,
          label: "",
          placeholder: "",
        },
      ],
    }));
  };

  const startEditingField = (id) => {
    setShowTitleEditor(false);
    setEditorFieldId(id);
  };

  const deleteField = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      fields: prevData.fields.filter((field) => field.id !== id),
    }));
  };

  const updateField = (e, id) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      fields: prevData.fields.map((field) =>
        field.id === id ? { ...field, [name]: value } : field
      ),
    }));
  };

  const updateTitle = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };

  const validateForm = () => {
    if (formData.title === "") {
      alert("Form title is required");
    } else if (formData.title.length > 30) {
      alert("Form title is too long");
    } else if (formData.fields.length === 0) {
      alert("At least one input field is required");
    } else {
      const result = formData.fields.filter((field) => {
        return field.label === "" || field.placeholder === "";
      });
      if (result.length !== 0) {
        alert("All fields must have a title and placeholder");
      } else {
        onSubmit(formData);
        setFormData({ title: "", fields: [] });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
  };

  return (
    <div className="form-container">
      <p className="form-title">{title}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-main">
          <div className="form-section">
            <div className="form-header">
              <h4>
                {formData.title || "Untitled Form"} &nbsp;
                <img
                  style={{ width: "20px", height: "20px" }}
                  className="edit-icon"
                  onClick={() => setShowTitleEditor(true)}
                  src={editPic}
                  alt="Edit"
                />
              </h4>
            </div>
            <hr />
            <FieldList
              fields={formData.fields}
              startEditing={startEditingField}
              deleteField={deleteField}
            />
            {showFieldOptions && (
              <div className="field-options">
                <button type="button" onClick={() => addField("text")}>
                  Text
                </button>
                <button type="button" onClick={() => addField("number")}>
                  Number
                </button>
                <button type="button" onClick={() => addField("email")}>
                  Email
                </button>
                <button type="button" onClick={() => addField("password")}>
                  Password
                </button>
                <button type="button" onClick={() => addField("date")}>
                  Date
                </button>
              </div>
            )}
            <button
              type="button"
              className="toggle-field-options"
              onClick={() => setShowFieldOptions(!showFieldOptions)}
            >
              {showFieldOptions ? "Close Add Input" : "Add Input"}
            </button>
          </div>
          <div className="form-section">
            <h4> Form Editor </h4>
            <hr />
            {showTitleEditor ? (
              <>
                <h5>Title</h5>
                <input
                  className="title-field"
                  type="text"
                  name="title"
                  value={formData.title}
                  placeholder="Form Title"
                  onChange={updateTitle}
                />
              </>
            ) : (
              formData.fields
                .filter((field) => field.id === editorFieldId)
                .map((field) => (
                  <FieldEditor
                    key={field.id}
                    field={field}
                    handleChange={updateField}
                  />
                ))
            )}
          </div>
        </div>
        <div className="form-footer">
          <button type="submit" className="submit-button">
            {title === "Create New Form" ? "Create Form" : "Update Form"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
