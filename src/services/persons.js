import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then((response) => response.data);

const add = (newObj) =>
  axios.post(baseUrl, newObj).then((response) => response.data);

const discard = (id) => {
  return axios.delete(`${baseUrl}/${id}`).catch((error) => {
    console.log("delete failed...");
  });
};

const services = { getAll, add, update, discard };

export default services;
