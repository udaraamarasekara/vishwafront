import axios from 'axios';
import Url from './Url';

export default axios.create({
    baseURL: Url,

    headers:{
      'X-Requested-With':'XMLHttpRequest',
      'Accept':'Application/json',

    },
    withCredentials: true,
  });