import React, { useState } from "react";
import { useRoute } from "../context/RouteProvider";
import { useApi } from "../context/ApiContext";
import "../styles/FormView.css";

const FormView = () => {
  const { params } = useRoute();
  const { data } = useApi();
  const formId = params.id;
  const [formValues, setFormValues] = useState({});

  const form = data.find((ele) => ele._id === formId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessage = "";

    form.fields.forEach((field) => {
      const value = formValues[field.label] || "";

      switch (field.type) {
        case "text":
          if (value.length < 6) {
            isValid = false;
            errorMessage = `Text must be at least 6 characters long.`;
          }
          break;
        case "number":
          const numberValue = parseFloat(value);
          if (isNaN(numberValue) || numberValue <= 0) {
            isValid = false;
            errorMessage = "Please enter a number greater than 0.";
          }
          break;
        case "email":
          if (!/\S+@\S+\.\S+/.test(value)) {
            isValid = false;
            errorMessage = "Please enter a valid email address.";
          }
          break;
        case "date":
          if (isNaN(Date.parse(value))) {
            isValid = false;
            errorMessage = "Please enter a valid date.";
          }
          break;
        case "password":
          const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
          if (!passwordPattern.test(value)) {
            isValid = false;
            errorMessage =
              "Password must be at least 8 characters long and include at least one letter and one number.";
          }
          break;
        default:
          break;
      }

      if (field.required && value.trim() === "") {
        isValid = false;
        errorMessage = "This field is required.";
      }
    });

    if (!isValid) {
      alert(errorMessage);
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formValues).length === 0) {
      alert("All fields are required.");
    } else {
      const isValid = validateForm();
      if (isValid) {
        console.log(formValues);
        alert("Form Submitted. Thank you! Open console for form data.");
      }
    }
  };

  return (
    <div className="viewForm">
      <form onSubmit={handleSubmit}>
        <p className="viewFormTitle">{form && form.title}</p>
        <div className="viewFormFields">
          {form &&
            form.fields.map((field) => (
              <div key={field.id} className="viewFormField">
                <label>{field.label}</label>
                <input
                  type={field.type}
                  name={field.label}
                  value={formValues[field.label] || ""}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  className="viewFormInput"
                />
              </div>
            ))}
        </div>
        <div className="viewFormButtonContainer">
          <button type="submit" className="viewFormButton">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormView;
