import React from "react";
import { useRoute } from "../context/RouteProvider";
import Home from "./Home";
import FormCreate from "./FormCreate";
import FormEdit from "./FormEdit";
import FormView from "./FormView";
import NotFound from "./NotFound";

const Container = () => {
  const { route } = useRoute();

  const renderRoute = () => {
    if (route === "/") {
      return <Home />;
    } else if (route === "/form/create") {
      return <FormCreate />;
    } else if (route.startsWith("/form/")) {
      const segments = route.split("/");
      const id = segments[2];
      const isEdit = segments[3] === "edit";

      if (id && isEdit) {
        return <FormEdit />;
      } else if (id) {
        return <FormView />;
      } else {
        return <NotFound />;
      }
    }
    return <NotFound />;
  };

  return <div>{renderRoute()}</div>;
};

export default Container;
