const axios = require("axios");
// const _ = require("lodash");
const _get = require('lodash/get');

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../scss/style.scss";

const API_ITEM = process.env.API_ITEM; //https://hacker-news.firebaseio.com/v0/item/
const API_ASK = process.env.API_ASK;
const API_TOP = process.env.API_TOP;
const API_JOB = process.env.API_JOB;
const API_LATEST = process.env.API_LATEST;
const API_SHOW = process.env.API_SHOW;

let newsIdList
let newsIdShortList
let firstId

window.addEventListener('load', () => {

    getNewsIds(API_LATEST)

    document.getElementById('loadMoreBtn').onclick = () => {
        document.getElementById('loading').classList.remove('d-none');
        document.getElementById('loadMoreBtn').classList.add('d-none');
        getCards(API_ITEM, newsIdList)
        firstId += 10
    };

    let urlId = ""
    const clickedTab = document.querySelector('.nav');
    clickedTab.onclick = (event) => {
        const toDel = document.getElementById('main')
        while (toDel.firstChild) {
            toDel.removeChild(toDel.firstChild);
        }
        const target = event.target.closest('button');
        const inactive = document.querySelectorAll('.active')
        inactive.forEach((inactiveEl) => {
            inactiveEl.classList.remove('active')
        })
        target.classList.add('active')
        target ? urlId = target.id : urlId = null;
        switch (urlId) {
            case 'news':

                getNewsIds(API_LATEST)
                break;

            case 'top':
                getNewsIds(API_TOP)
                break;

            case 'ask':
                getNewsIds(API_ASK)
                break;

            case 'job':
                getNewsIds(API_JOB)
                break;
        }

    }


    function getNewsIds(apiUrl) {
        firstId = 0
        axios
            .get(apiUrl)
            .then((response) => {
                newsIdList = response.data;
                getCards(API_ITEM, newsIdList)
                //verificare
                document.getElementById('app').classList.remove('d-none');
            })
    }

    function getCards(apiUrl, newsIds) {

        newsIdShortList = newsIds.splice(firstId, 10)
        newsIdShortList.forEach(newsId => {
            let itemUrl = `${apiUrl}${newsId}.json`
            axios
                .get(itemUrl)
                .then((response) => {
                    console.log(response.data)
                    const item = response.data
                    const mainCard = document.getElementById('main')
                    const timeFixed = _get(response, 'data.time', 'senza orario')
                    let date = dateConversion(timeFixed)
                    let cardImg = ""
                    switch (item.type) {
                        case 'job':
                            cardImg = 'job'
                            break
                        case 'story':
                            cardImg = 'story'
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
                })

            document.getElementById('loading').classList.add('d-none');
            document.getElementById('loadMoreBtn').classList.remove('d-none');
        });
    }

    function dateConversion(unixTime) {
        let milliseconds = unixTime * 1000;
        var days = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
        var months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
        var date = new Date(milliseconds);
        var day = days[date.getDay()];
        var month = months[date.getMonth()];
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var time = '- ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
        return day + ' ' + date.getDate() + ' ' + month + ' ' + year + ' ' + time;
    }



});