import axios from 'axios';
import { fakeAuth } from "../views/auth";
import { URL } from "../config";


export const request = (option) => {
    let config = {
        headers: {'Authorization': "Bearer " + fakeAuth.token}
    }
    // console.log(fakeAuth)
    option.url = URL + option.url
    return axios({
        ...config,
        ...option
    }).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    })
}