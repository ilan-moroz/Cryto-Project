// APIS
const cryptoCoins = 'https://api.coingecko.com/api/v3/coins/list'
const cryptoInfo = 'https://api.coingecko.com/api/v3/coins/'

// EMPTY ARRAY FOR THE DISPLAYED COINS
let displayCoins = []

// FUNCTION fetchCoins GETS THE COINS FROM THA API
async function fetchCoins() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: cryptoCoins,
      success: (data) => {
        resolve(data)
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

// FUNCTION getCoinsDisplay GETS 100 RANDOM COINS FROM DATA AND RUNS displayCoin ON EACH COIN
async function getCoinsDisplay() {
  $('#spinner').show()
  const data = await fetchCoins()
  for (let i = 0; i < 100; i++) {
    let random = Math.floor(Math.random() * data.length) + 1
    displayCoins.push(data[random])
    displayCoin(displayCoins[i], i)
  }
  $('#spinner').hide()
  return displayCoins
}

// FUNCTION displayCoin FOR APPENDING THE COINS WITH BOOTSTRAP CARD
function displayCoin(coin, index) {
  let targetId = `coin-${index}-details`
  $('.coins').append(`
    <div class="card border-warning text-warning bg-transparent ">
      <div class="card-header border-warning d-flex justify-content-between">
        ${coin.symbol}
        <div class="form-check form-switch d-inline-block m-1 p-0">
          <input class="form-check-input" type="checkbox"/>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">${coin.name}</h5>
      </div>
      <div class="card-footer bg-transparent">
        <button type="button" class="btn btn-warning moreInfo" data-bs-toggle="collapse" 
        data-bs-target="#${targetId}" aria-expanded="false" aria-controls="${targetId}">More Info</button>
        <div class="collapse" id="${targetId}">
        </div>
      </div>
    </div>
  `)
}

// FUNCTION filterCoins FOR DISPLAYING THE COINS USER SEARCHES
function filterCoins() {
  let searchTerm = $('.search').val().toLowerCase()
  if (!searchTerm) {
    $('.card').show()
    return
  }
  for (let index = 0; index < displayCoins.length; index++) {
    let card = $(`.card:eq(${index})`)
    if (
      displayCoins[index].name.toLowerCase() !== searchTerm &&
      displayCoins[index].symbol.toLowerCase() !== searchTerm
    ) {
      card.hide()
    } else {
      card.show()
    }
  }
}

// FUNCTION parallax FOR SCROLLING
function parallax() {
  $(window).scroll(function () {
    let scroll = $(window).scrollTop()
    $('.parallax').css({
      'background-position-y': -scroll * 0.5 + 'px',
    })
  })
}

// FUNCTION fetchCoinsData GETS THE COINS DATA FROM THA API
async function fetchCoinsData(coinName, coinSymbol) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: cryptoInfo + coinName,
      success: (data) => {
        resolve(data)
      },
      error: () => {
        $.get(cryptoInfo + coinSymbol, (data) => {
          resolve(data)
        }).catch((error) => {
          reject('Sorry no information about this coin', error)
        })
      },
    })
  })
}

// TEMPORARY FUNCTION
// function coinsInfo(data) {
//   $('html').append(`
//     <img src="${data.image.small}"/>
//     <h5>${data.name}</h5>
//     USD: 1 ${data.name} = ${Number(data.market_data.current_price.usd)} $
//     EURO: 1 ${data.name} = ${Number(data.market_data.current_price.eur)} €
//     ILS: 1 ${data.name} = ${Number(data.market_data.current_price.ils)} ₪
//     `)
// }
