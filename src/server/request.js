import axios from "axios";
import {ENDPOINT, TOKEN } from "../consts";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const token = Cookies.get(TOKEN)

const request = axios.create({
    baseURL: ENDPOINT,
    timeout: 10000,
    headers:{
        Authorization: `Bearer ${token}`
    }
})

request.interceptors.response.use( response => response, 
    function (error) {
        toast.error(error.response.data.message)
        return Promise.reject(error);
  });

export default request