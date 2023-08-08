import axios from "axios";

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers:{
        Accept: "application/json"
    },
    params: {
        api_key: '426e72dfbf10a501fe5a5ba65b9722ce'
    }
})