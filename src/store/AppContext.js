import { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [imageBaseUrl, SetImageBaseUrl] = useState("");

  fetch("https://api.themoviedb.org/3/configuration", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((data) =>
      SetImageBaseUrl(
        data.images.base_url +
          data.images.backdrop_sizes.find((element) => element === "w780")
      )
    );

  const contextValue = {
    imageBaseUrl,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
