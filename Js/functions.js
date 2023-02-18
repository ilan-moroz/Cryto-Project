// APIS
const cryptoCoins = 'https://api.coingecko.com/api/v3/coins/list'
const cryptoInfo = 'https://api.coingecko.com/api/v3/coins/'

// EMPTY ARRAY FOR THE DISPLAYED COINS AND LIVE REPORTS
let displayCoins = []
let liveReportsArr = []

// FUNCTION fetchCoins GETS THE COINS FROM THA API
const fetchCoins = async () => {
  return new Promise((resolve, reject) => {
    $.get({
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
const getCoinsDisplay = async () => {
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
const displayCoin = (coin, index) => {
  let targetId = `coin-${index}-details`
  let checkBoxId = `checkbox-${index}`
  $('.coins').append(`
    <div class="card border-warning text-warning bg-transparent ">
      <div class="card-header border-warning d-flex justify-content-between">
        ${coin.symbol}
        <div class="form-check form-switch d-inline-block m-1 p-0">
          <input class="form-check-input" id ="${checkBoxId}" type="checkbox"/>
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
const filterCoins = () => {
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
const parallax = () => {
  $(window).scroll(function () {
    let scroll = $(window).scrollTop()
    $('.parallax').css({
      'background-position-y': -scroll * 0.5 + 'px',
    })
  })
}

// FUNCTION fetchCoinsData GETS THE COINS DATA FROM THA API
const fetchCoinsData = async (coinName, coinSymbol) => {
  return new Promise((resolve, reject) => {
    $.get({
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

// FUNCTION getCoinDetailsFromClick GET NAME,SYMBOL AND INDEX OF CLICKED COIN
const getCoinDetailsFromClick = (event) => {
  let coinIndex = $(event.target).closest('.card').index()
  let coinSymbol = displayCoins[coinIndex].symbol.toLowerCase()
  let coinName = displayCoins[coinIndex].name
    .toLowerCase()
    .split(' ')
    .join('-')
    .split('.')
    .join('-')
    .split('[')[0]
    .split('(')[0]
  console.log(coinName)
  coinData(coinName, coinSymbol, coinIndex)
}

// FUNCTION coinData GETS SPECIFIC COIN DATA FROM THE API AND APPEND TO COLLAPSE
const coinData = async (coinName, coinSymbol, coinIndex) => {
  let coinData = await fetchCoinsData(coinName, coinSymbol)
  let targetId = `coin-${coinIndex}-details`
  $(`#${targetId}`).html(`
  <img class="collapseImg" src="${coinData.image.large}"/>
  USD:<br/> 1 ${coinData.name} = ${Number(
    coinData.market_data.current_price.usd,
  )}$<br/>
  EURO:<br/>  1 ${coinData.name} = ${Number(
    coinData.market_data.current_price.eur,
  )}€<br/>
  ILS:<br/>  1 ${coinData.name} = ${Number(
    coinData.market_data.current_price.ils,
  )}₪`)
}

//FUNCTION checkBoxCheck ADDING AND REMOVING CHECKED COINS TO liveReportsArr ARRAY
const checkBoxCheck = (event) => {
  let checkBoxId = event.target.id
  let checkBoxIndex = checkBoxId.split('-')[1]
  if ($('#' + checkBoxId).is(':checked')) {
    if (liveReportsArr.length < 5) {
      liveReportsArr.push(displayCoins[checkBoxIndex])
    }
  } else {
    let arrIndex = liveReportsArr.indexOf(displayCoins[checkBoxIndex])
    liveReportsArr.splice(arrIndex, 1)
  }
  checkBoxCont()
}

// FUNCTION checkBoxCont DISABLE ALL UNSELECTED COINS AND INJECT TO MODAL
const checkBoxCont = () => {
  let howMuch = $('.form-check-input').filter(':checked').length
  if (howMuch >= 5) {
    $('.form-check-input').not(':checked').attr('disabled', true)
    $('.modal-body').html(`
    1 Coin : ${liveReportsArr[0].name}</br>
    2 Coin : ${liveReportsArr[1].name}</br>
    3 Coin : ${liveReportsArr[2].name}</br>
    4 Coin : ${liveReportsArr[3].name}</br>
    5 Coin : ${liveReportsArr[4].name}
    `)
    $('#coinsModal').modal('show')
  } else {
    $('.form-check-input').not(':checked').attr('disabled', false)
  }
}

// FUNCTION modalCollapse ADDING OPTION TO CHANGE COINS IN MODAL
const modalCollapse = () => {
  for (let i = 0; i < liveReportsArr.length; i++) {
    const option = $('<option>')
      .val(liveReportsArr[i].name)
      .text(liveReportsArr[i].name)
    $('.replaceCoin').append(option)
  }
  for (let i = 0; i < displayCoins.length; i++) {
    const option = $('<option>')
      .val(displayCoins[i].name)
      .text(displayCoins[i].name)
    $('.replaceCoinWith').append(option)
  }
}
