import axios from "axios";

//this instance will be used by next getServerSideProps to make requests to the server
export const axiosServerInstance = axios.create({
  baseURL: process.env.HOST,
  timeout: 1500,
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
});

//this instance will be used by react on the frontend
export const axiosClientInstance = axios.create({
  baseURL: "",
  timeout: 1500,
  withCredentials: true,
  headers: {
    "content-type": "applicatoin/json",
  },
});
