import { createContext, useContext, useState } from "react";

const InfoContext = createContext();

export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("account") || null));
  const [modal, setModal] = useState(false);
  const [postId, setPostId] = useState(null); 
  const [photoData, setPhotoData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalFoto, setModalFoto] = useState(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const exit = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  const value = {
    currentUser, setCurrentUser,
    exit,
    serverUrl,
    modal, setModal,
    postId, setPostId,
    photoData, setPhotoData,
    searchTerm, setSearchTerm,
    modalFoto, setModalFoto
  };

  return (
    <InfoContext.Provider value={value}>
      {children}
    </InfoContext.Provider>
  );
};
