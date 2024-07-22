import React from "react";
import { useRoute } from "../context/RouteProvider";
import { useApi } from "../context/ApiContext";
import Form from "./Form";

const FormCreate = () => {
  const { navigate } = useRoute();
  const { createData } = useApi();

  const initialFormData = {
    title: "",
    fields: [],
  };

  const handleSubmit = async (formData) => {
    await createData(formData);
    navigate("/");
  };

  return (
    <Form
      initialFormData={initialFormData}
      onSubmit={handleSubmit}
      title="Create New Form"
    />
  );
};

export default FormCreate;
