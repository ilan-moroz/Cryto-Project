# CRYPTO PROJECT

[Live Demo](https://moroz-crypto.netlify.app/)

## Table of Contents

- [General Info](#general-info)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)

## General Info

This is a cryptocurrency project that retrieves 100 coins from an API and displays them on the DOM. When the user clicks the "More Info" button, it fetches the price details of a specific coin from another API. When the user checks a coin it adds the coin the the live report chart and display the usd price in the chart(updates every 2 seconds). The user can add only 5 coins to live report chart, when 6 coin checked a modal pops up asking the user if he want to change a coin or cancel and not add the coin.

## Features

- Displays 100 coins from API.
- Search bar for searching for specific coins symbol.
- Allows users to fetch the price details of a specific coin from another API by clicking the "More Info" button.
- Responsive design with a parallax background.
- Loading spinner while fetching data.
- Modal for selecting a new coin to display.
- Checkbox for filtering the coins for adding the live chart.
- Allows users to add up to 5 coins to the live report chart at a time.
- Provides a live reports chart that displays the latest cryptocurrency prices in usd and updates every 2 seconds.

## Technologies

- HTML
- CSS
- Bootstrap
- JavaScript
- jQuery
- Chart.js

## Setup

To run this project, follow these steps:

1. Clone this repository to your local machine.
2. Open the index.html file in your web browser.

## Usage

- To view the list of 100 random coins, simply load the page.
- To see the price details of a specific coin, click the "More Info" button on a coin card.
- To add coins to live report chart, check the checkbox above the coin cards.
- To select a new coin to display, click the "Change Coin" button on the modal(after checking the 6 coin).
- To view the latest cryptocurrency prices, navigate to the "Live Reports" section.
