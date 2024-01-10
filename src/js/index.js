// Importing required libraries and CSS files
const axios = require("axios");
const _get = require('lodash/get');

// Importing Bootstrap and custom CSS files
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../scss/style.scss";

// Setting up API endpoints
const API_ITEM = process.env.API_ITEM;
const API_ASK = process.env.API_ASK;
const API_TOP = process.env.API_TOP;
const API_JOB = process.env.API_JOB;
const API_LATEST = process.env.API_LATEST;
const API_SHOW = process.env.API_SHOW;

// Initializing variables
let newsIdList;
let newsIdShortList;
let firstId;
let urlId = "";

window.addEventListener('load', () => {

    getNewsIds(API_LATEST);

    // Defining the getNewsIds function to load more news items
    function getNewsIds(apiUrl) {
        // Hide the load more button and footer
        document.getElementById('loadMoreBtn').classList.add('d-none');
        document.getElementById('footer').classList.add('d-none');

        // Set the firstId to 0
        firstId = 0;

        // Fetch data from the API endpoint using axios
        axios
            .get(apiUrl)
            .then((response) => {
                // Get the news id list from the response
                newsIdList = response.data;

                // Create cards for each news item using the API_ITEM constant
                createCards(API_ITEM, newsIdList);
            })
            .catch(error => {
                // Log the error request
                console.log('No response received:', error.request);

                // Show the error modal
                const errorModal = document.getElementById('errorModal');
                errorModal.setAttribute('class', 'modal fade show');
                errorModal.style.display = 'block';
            });
    }

    // Defining the createCards function to create news cards
    function createCards(apiUrl, newsIds) {
        newsIdShortList = newsIds.splice(firstId, 10);
        newsIdShortList.forEach(newsId => {
            let itemUrl = `${apiUrl}${newsId}.json`;
            axios
                .get(itemUrl)
                .then((response) => {
                    const item = response.data;
                    const mainCard = document.getElementById('main');
                    // Extract the time, url, and type properties from the item data
                    const timeFixed = _get(response, 'data.time', 'unknow time');
                    const cardUrl = _get(response, 'data.url', 'no link');
                    const date = dateConversion(timeFixed);
                    const cardImg = item.type;
                    // Extract the time, url, and type properties from the item data
                    const cardClasses = cardUrl === 'no link' ? 'btn btn-primary d-none' : 'btn btn-primary';
                    // Create the card HTML and insert it into the main card element
                    const card = `
                        <div class="card-warp card mb-3">
                            <h5 class="fw-bold card-header text-center">${date}</h5>
                            <div class="card-body bgDark text-body d-flex justify-content-around">
                                <img class="card-logo col-3 mx-auto p-4" src="img/${cardImg}.svg" alt="img">
                                <div class="card-main col-9 p-5">
                                    <h5 class="card-title">${item.title}</h5>
                                    <p class="fst-italic card-text">by ${item.by}</p>
                                    <a href="${cardUrl}" target="blank" id="readmore" class="${cardClasses}">read more</a>
                                </div>
                            </div>
                        </div>
                        `;
                    mainCard.insertAdjacentHTML("beforeend", card);
                    // Hide the loading element, show the loadMoreBtn element, and show the footer element
                    document.getElementById('loading').classList.add('d-none');
                    document.getElementById('loadMoreBtn').classList.remove('d-none');
                    document.getElementById('footer').classList.remove('d-none');
                })
                .catch(error => {
                    console.log('No response from id:', error);
                    const errorModal = document.getElementById('errorModal');
                    errorModal.setAttribute('class', 'modal fade show');
                });
        });
    }
    // Function to convert a Unix timestamp to a formatted date string
    function dateConversion(unixTime) {
        // Convert Unix timestamp to milliseconds
        let milliseconds = unixTime * 1000;

        // Define an array of days and months
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // Create a new Date object using the milliseconds
        var date = new Date(milliseconds);

        // Get the day, month, year, hours, and minutes from the Date object
        var day = days[date.getDay()];
        var month = months[date.getMonth()];
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        // Format the time string with leading zeros if necessary
        var time = '- ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);

        // Return the formatted date string
        return day + ' ' + date.getDate() + ' ' + month + ' ' + year + ' ' + time;
    }

    // Add a click event listener to the clicked element
    const clickedTab = document.querySelector('.nav');
    clickedTab.onclick = (event) => {
        const toDel = document.getElementById('main');
        // Remove all child elements of 'toDel'
        while (toDel.firstChild) {
            toDel.removeChild(toDel.firstChild);
        }

        const target = event.target.closest('button');
        const inactive = document.querySelectorAll('.active');

        // Remove 'active' class from all inactive elements
        inactive.forEach((inactiveEl) => {
            inactiveEl.classList.remove('active');
        });

        // Add 'active' class to the clicked tab
        target.classList.add('active');

        urlId = target.id;

        // Get the news IDs based on the clicked tab
        switch (urlId) {
            case 'news':
                getNewsIds(API_LATEST);
                break;

            case 'top':
                getNewsIds(API_TOP);
                break;

            case 'ask':
                getNewsIds(API_ASK);
                break;

            case 'job':
                getNewsIds(API_JOB);
                break;
        }
    }

    // Add a click event listener to the loadMoreBtn element
    document.getElementById('loadMoreBtn').onclick = () => {
        // Show the loading element
        document.getElementById('loading').classList.remove('d-none');
        // Hide the loadMoreBtn element
        document.getElementById('loadMoreBtn').classList.add('d-none');
        // Call the createCards function with the API_ITEM and newsIdList arguments
        createCards(API_ITEM, newsIdList);
        // Increment the firstId variable by 10
        firstId += 10;
    };

    document.getElementById('app').classList.remove('d-none');

    // Select all elements with the data-bs-dismiss="modal" attribute and add a click event listener to them
    const closeModalButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');
    closeModalButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const modal = button.closest('.modal');
            modal.setAttribute('class', 'modal fade');
        });
    });

    const refreshBtn = document.getElementById('refresh');
    refreshBtn.onclick = () => location.reload();
});