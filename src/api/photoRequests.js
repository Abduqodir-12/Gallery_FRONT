import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const getPhotos = () => {
  return API.get(`/img`);
};

export const addPhoto = (formDate) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return API.post("/img", formDate, { headers: { token } });
};

export const deletePhoto = (id) => {
  const token = JSON.parse(localStorage.getItem('token'))
  return API.delete(`/img/${id}`, {headers: {token}})
}

export const updatePhoto = (id, formData) => {
  const token = JSON.parse(localStorage.getItem('token'))
  return API.put(`/img/${id}`, formData, {headers: {token}})
}