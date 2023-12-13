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
        // newsIdSmallList = newsIds.splice(0, 10)
        newsIds.forEach(newsId => {
            let itemUrl = `${apiUrl}${newsId}.json`
            axios
                .get(itemUrl)
                .then((response) => {
                    console.log(response.data)
                    createCard(response.data)
                })
        });
    }



    function createCard(item) {
        const mainCard = document.getElementById('main')
        let date = dateConversion(item.time)
        let cardImg = ""
        switch(item.type) {
            case 'job':
                cardImg = 'job'
                break
            case 'story':
                cardImg = 'logo'
                break
            case 'comment':
                cardImg = 'comment'
                break
            case 'poll':
                cardImg = 'poll'
                break
            case 'pollopt':
                cardImg = 'pollopt'
                break
        }

        const card = `
        <div class="card-warp card mb-3">
            <h5 class="card-header text-center">${date}</h5>
            <div class="card-body d-flex justify-content-around">
                <img class="card-logo col-3 mx-auto p-4" src="img/${cardImg}.svg" alt="img">
                <div class="card-main col-9 p-5">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">by ${item.by}</p>
                    <a href="${item.url}" class="btn btn-primary">read more</a>
                </div>
            </div>
        </div>
        `
        mainCard.insertAdjacentHTML("beforeend", card)
    }

    function dateConversion(unixTime) {
        let milliseconds = unixTime * 1000;
        let dateObject = new Date(milliseconds);
        const options = {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        };
        let date = dateObject.toUTCString('en-US', options).split(',').join(' ');
      
        return date;
      }



});