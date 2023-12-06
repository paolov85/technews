const axios = require("axios");
// const _ = require("lodash");
const _get = require('lodash/get');

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../scss/style.scss";

window.addEventListener('load', () => {

    const API_ITEM = process.env.API_ITEM; //https://hacker-news.firebaseio.com/v0/item/
    const API_ASK = process.env.API_ASK;
    const API_TOP = process.env.API_TOP;
    const API_JOB = process.env.API_JOB;
    const API_LATEST = process.env.API_LATEST;
    const API_SHOW = process.env.API_SHOW;

    let newsIdList
    let newsIdSmallList
    getNewsIds(API_LATEST)
    getItem(API_ITEM, newsIdSmallList)

    function getNewsIds(apiUrl) {
        axios
        .get(apiUrl)
        .then((response) => {
            newsIdList = response.data;
            getItem(API_ITEM, newsIdList)
        })
    }

    function getItem(apiUrl, newsIds) {
        newsIdSmallList = newsIds.splice(0, 10)
        newsIdSmallList.forEach(newsId => {
            let itemUrl = `${apiUrl}${newsId}.json`
            axios
            .get(itemUrl)
            .then((response) => {
                console.log(response.data);
                createCard()
            })
        });
    }

    function createCard () {
        const cardContainer = document.querySelector('.main')
        const cardWrap = document.createElement('div')
        cardWrap.setAttribute('class', 'card mb-3')
        cardContainer.appendChild(cardWrap)
        const cardBody = document.createElement('div')
        cardBody.setAttribute('class', 'card mb-3')
    }   




});