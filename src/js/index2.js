const axios = require("axios");
// const _ = require("lodash");
const _get = require('lodash/get');

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../scss/style.scss";

window.addEventListener('load', () => {
    createCard()
    createCard()
    createCard()


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
                    // console.log(response.data);
                })
            // createCard()
        });
    }


    function createNewElement(elTag, elParent, elId, elClasses, elContent) {
        const element = document.createElement(elTag)

        if (elId) {
            element.setAttribute('id', elId)
        }

        if (elClasses) {
            element.classList.add(...elClasses);
        }

        if (elContent) {
            element.innerHTML = elContent;
        }


        const selected = document.querySelector(elParent)
        selected.appendChild(element);


    }

    function createCard() {
        createNewElement('div', '#main', 'card-wrap', ['card-wrap', 'card', 'mb-3'])
        createNewElement('h5', '#card-wrap', 'card-header', ['card-header', 'text-center'], '10 settembre 2023')
        createNewElement('div', '#card-wrap', 'card-body', ['card-body', 'd-flex', 'justify-content-around'])
        createNewElement('img', '#card-body', 'card-logo', ['card-logo', 'col-3', 'mx-auto', 'p-4'])
        const imgSel = document.getElementById('card-logo')
        imgSel.src = 'img/logo.svg'
        createNewElement('div', '#card-body', 'card-main', ['card-main', 'card-text', 'col-9', 'p-5'])
        createNewElement('h5', '#card-main', 'card-title', ['card-title'], 'Windows 1000 released')
        createNewElement('p', '#card-main', 'card-auth', ['card-auth', 'card-text'], 'by Paolo')
        createNewElement('a', '#card-main', 'card-link', ['card-link', 'btn', 'btn-primary'], 'read more')
        const linkSel = document.getElementById('card-link')
        linkSel.href = '#'

        // createNewElement('div', '.container', ['card-wrap', 'card', 'mb-3'], '')

        // createNewElement('h5', '.card-wrap', ['card-header', 'text-center'], '10 settembre 2023')

        // createNewElement('div', '.card-wrap', ['card-body', 'd-flex', 'justify-content-around'], '')

        // createNewElement('img', '.card-body', ['card-logo', 'col-3', 'mx-auto', 'p-4'], '')
        // createNewElement('div', '.card-body', ['card-main', 'col-9', 'p-5'], '')

        // createNewElement('h5', '.card-main', ['card-title'], 'Windows 1000 released')
        // createNewElement('p', '.card-main', ['card-text'], 'by Paolo')

        // createNewElement('a', '.card-main', ['btn', 'btn-primary'], 'read more')

    }




});