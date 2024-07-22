import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/form/fetch`
      );
      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.message || "Response error");
      setData(responseData);
    } catch (error) {
      alert("Error fetching data:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createData = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/form/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.message || "Response error");
      setData((prevData) => [...prevData, formData]);
      await fetchData();
      alert(responseData.message || "Form submitted successfully");
    } catch (e) {
      alert("Error creating data:", e.message);
    }
  };

  const updateData = async (id, formData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/form/modify/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.message || "Response error");
      setData((prevData) =>
        prevData.map((item) => (item._id === id ? responseData : item))
      );
      await fetchData();
      alert(responseData.message || "Form updated successfully");
    } catch (e) {
      alert("Error updating data:", e.message);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/form/destroy/${id}`,
        {
          method: "DELETE",
        }
      );
      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.message || "Response error");
      setData((prevData) => prevData.filter((item) => item._id !== id));
      await fetchData();
      alert(responseData.message || "Form deleted successfully");
    } catch (e) {
      alert("Error deleting data:", e.message);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        data,
        fetchData,
        createData,
        updateData,
        deleteData,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
