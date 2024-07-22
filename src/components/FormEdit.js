import React, { useEffect, useState } from "react";
import { useRoute } from "../context/RouteProvider";
import { useApi } from "../context/ApiContext";
import Form from "./Form";

const FormEdit = () => {
  const { params, navigate } = useRoute();
  const { data, updateData } = useApi();
  const formId = params.id;
  const [initialFormData, setInitialFormData] = useState(null);

  useEffect(() => {
    const form = data.find((ele) => ele._id === formId);
    setInitialFormData(
      form
        ? form
        : {
            title: "",
            fields: [],
          }
    );
  }, [formId, data]);

  const handleSubmit = async (formData) => {
    await updateData(formId, formData);
    navigate("/");
  };

  if (!initialFormData) {
    return <div>Loading...</div>;
  }

  return (
    <Form
      initialFormData={initialFormData}
      onSubmit={handleSubmit}
      title="Edit Form"
    />
  );
};

export default FormEdit;
