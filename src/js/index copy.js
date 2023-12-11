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

    function createCard() {
        const cardContainer = document.querySelector('.main')

        const cardWrap = document.createElement('div')
        cardWrap.setAttribute('class', 'card-warp card mb-3')

        const cardHead = document.createElement('h5')
        cardHead.setAttribute('class', 'card-header text-center')
        const headText = document.createTextNode('10 settembre 2023')
        cardHead.appendChild(headText)

        const cardBody = document.createElement('div')
        cardBody.setAttribute('class', 'card-body d-flex justify-content-around')
        const cardImg = document.createElement('img')
        cardImg.setAttribute('class', 'col-3 mx-auto p-4')
        cardImg.setAttribute('src', 'img/logo.svg')
        cardImg.setAttribute('alt', 'img')
        const cardMain = document.createElement('div')
        cardMain.setAttribute('class', 'card-text col-9 p-5')
        const cardTitle = document.createElement('h5')
        cardTitle.setAttribute('class', 'card-title')
        const titleText = document.createTextNode('Windows 1000 released')
        cardTitle.appendChild(titleText)
        const cardAuth = document.createElement('p')
        cardAuth.setAttribute('class', 'card-text')
        const authText = document.createTextNode('by Paolo')
        cardAuth.appendChild(authText)
        const cardLink = document.createElement('a')
        cardLink.setAttribute('href', '#')
        cardLink.setAttribute('class', 'btn btn-primary')
        const link = document.createTextNode('read more')
        cardLink.appendChild(link)
        
        cardMain.appendChild(cardTitle)
        cardMain.appendChild(cardAuth)
        cardMain.appendChild(cardLink)
        cardBody.appendChild(cardImg)
        cardBody.appendChild(cardMain)
        cardWrap.appendChild(cardHead)
        cardWrap.appendChild(cardBody)
        cardContainer.appendChild(cardWrap)
    }




});