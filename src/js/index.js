const axios = require("axios");
// const _ = require("lodash");
const _get = require('lodash/get');

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../scss/style.scss";

window.addEventListener('load', () => {

    const API_ITEM = process.env.API_ITEM;
    const API_ASK= process.env.API_ASK;
    const API_TOP= process.env.API_TOP;
    const API_JOB= process.env.API_JOB;
    const API_LATEST= process.env.API_LATEST;
    const API_SHOW= process.env.API_SHOW;


    getNews(API_LATEST)
    

    function getNews(api) {
        axios
            .get(api)
            .then((response) => {
                console.log(response.data);
            })
    }

   });