import React from "react";
import { useRoute } from "../context/RouteProvider";
import { useApi } from "../context/ApiContext";
import "../styles/Home.css";

const Home = (props) => {
  const { navigate } = useRoute();
  const { data, deleteData } = useApi();

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome to Form Application</h1>
        <h4>This is a simple Form App</h4>
        <button className="create-btn" onClick={() => navigate("/form/create")}>
          Create New Form
        </button>
        <hr />
      </div>
      <div className="form-list">
        {data.length !== 0 ? (
          data.map((ele) => (
            <div className="form-item" key={ele._id}>
              <p>{ele.title}</p>
              <button
                className="view-btn"
                onClick={() => navigate(`/form/${ele._id}`)}
              >
                View
              </button>
              <button
                className="edit-btn"
                onClick={() => navigate(`/form/${ele._id}/edit`)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteData(ele._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="message">You have no forms created yet.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
