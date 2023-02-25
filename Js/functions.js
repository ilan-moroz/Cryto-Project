// API - CHANGED TO SHOW TOP 100 COINS
const cryptoCoins =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false'
// SECOND API
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

// FUNCTION getCoinsDisplay GETS 100 COINS FROM DATA AND RUNS displayCoin ON EACH COIN
const getCoinsDisplay = async () => {
  const data = await fetchCoins()
  for (let i = 0; i < 100; i++) {
    displayCoins.push(data[i])
    displayCoin(displayCoins[i], i)
  }
  return displayCoins
}

// FUNCTION displayCoin FOR APPENDING THE COINS WITH BOOTSTRAP CARD
const displayCoin = (coin, index) => {
  // MAKE DIFFERENT ID FOR EACH COLLAPSE
  let targetId = `coin-${index}-details`
  // MAKE DIFFERENT ID FOR EACH CHECKBOX
  let checkBoxId = `checkbox-${index}`
  // APPEND THE CARD THE COINS DIV
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
  // THE COINS THE USER SEARCHES
  let searchTerm = $('.search').val().toLowerCase()
  // IF EMPTY SEARCH SHOW ALL COINS
  if (!searchTerm) {
    $('.card').show()
    return
  }
  for (let index = 0; index < displayCoins.length; index++) {
    // FIND THE COIN SPECIFIC INDEX
    let card = $(`.card:eq(${index})`)
    // SHOW ALL COINS THAT EQUAL THE SEARCH VALUE
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

// FUNCTION fetchCoinsData GETS A SPECIFIC COIN DATA FROM THA API AND SAVE IN CACHE FOR 2 MIN
const fetchCoinsData = async (coinId) => {
  const cacheKey = `coin_${coinId}`
  const cache = await caches.open('coinsCache')
  const cachedResponse = await cache.match(cacheKey)
  // IF RESPONSE IS IN CACHE RESOLVE FROM CACHE AND NOT API
  if (cachedResponse) {
    const cachedData = await cachedResponse.json()
    return Promise.resolve(cachedData)
  }
  // IF RESPONSE NOT IN CACHE RESOLVE FROM API AND SAVE TO CACHE
  return new Promise((resolve, reject) => {
    $.get({
      url: cryptoInfo + coinId,
      success: (data) => {
        const response = new Response(JSON.stringify(data), {
          headers: { 'Cache-Control': 'max-age=120' },
        })
        cache.put(cacheKey, response)
        resolve(data)
        setTimeout(() => {
          cache.delete(cacheKey) // DELETE CACHE AFTER 2 MIN
        }, 120000)
      },
      error: (error) => {
        reject('Error while fetching details about the coin', error)
      },
    })
  })
}

// FUNCTION getCoinDetailsFromClick GET ID AND INDEX OF CLICKED COIN
const getCoinDetailsFromClick = (event) => {
  let coinIndex = $(event.target).closest('.card').index()
  let coinId = displayCoins[coinIndex].id.toLowerCase()
  coinData(coinId, coinIndex)
}

// FUNCTION coinData GETS SPECIFIC COIN DATA FROM THE API AND APPEND TO COLLAPSE
const coinData = async (coinId, coinIndex) => {
  let coinData = await fetchCoinsData(coinId)
  let targetId = `coin-${coinIndex}-details`
  $(`#${targetId}`).html(`
  <img class="collapseImg" src="${coinData.image.large}"/>
  USD:<br/> 1 ${coinData.name} = ${Number(
    coinData.market_data.current_price.usd,
  )} $<br/>
  EURO:<br/>  1 ${coinData.name} = ${Number(
    coinData.market_data.current_price.eur,
  )} €<br/>
  ILS:<br/>  1 ${coinData.name} = ${Number(
    coinData.market_data.current_price.ils,
  )} ₪`)
}

//FUNCTION checkBoxCheck ADDING AND REMOVING CHECKED COINS TO liveReportsArr ARRAY
const checkBoxCheck = (event) => {
  let checkBoxId = event.target.id
  let checkBoxIndex = checkBoxId.split('-')[1]
  if ($('#' + checkBoxId).is(':checked')) {
    if (liveReportsArr.length < 6) {
      liveReportsArr.push(displayCoins[checkBoxIndex])
    }
  } else {
    let arrIndex = liveReportsArr.indexOf(displayCoins[checkBoxIndex])
    liveReportsArr.splice(arrIndex, 1)
  }
  checkBoxCont()
}

// FUNCTION checkBoxCont ADD ALL SELECTED COINS TO ARRAY AND INJECT TO MODAL(SHOW MODAL AFTER 6 COINS SELECTED)
const checkBoxCont = () => {
  let howMuch = $('.form-check-input').filter(':checked').length
  if (howMuch >= 6) {
    $('.modal-body').html(`
    <div class="row">
    <div class="col-6">
      <h5>Live Report Coins</h5>
      <ul>
        <li>First Coin: ${liveReportsArr[0].name}</li>
        <li>Second Coin: ${liveReportsArr[1].name}</li>
        <li>Third Coin: ${liveReportsArr[2].name}</li>
        <li>Fourth Coin: ${liveReportsArr[3].name}</li>
        <li>Fifth Coin: ${liveReportsArr[4].name}</li>
      </ul>
    </div>
    <div class="col-6">
      <h5>The Extra Coin</h5>
      <ul>
      <li>Sixth Coin: ${liveReportsArr[5].name}</li>
      </ul>
    </div>
  </div>
    `)
    $('#coinsModal').modal('show')
  }
}

// FUNCTION modalCollapse ADDING OPTION TO CHANGE COINS IN MODAL
const modalCollapse = () => {
  // REMOVE ALL OPTIONS INSTEAD OF FIRST
  $('.replaceCoin option:not(:first-child)').remove()
  //  MAKE FIRST OPTION SELECTED
  $('.replaceCoin').val($('.replaceCoin option:first').val())
  // LOOP SELECTED COINS AND APPEND OPTIONS TO SELECT
  for (let i = 0; i < liveReportsArr.length - 1; i++) {
    const option = $('<option>')
      .val(liveReportsArr[i].name)
      .text(liveReportsArr[i].name)
    $('.replaceCoin').append(option)
  }
}

// FUNCTION changeCoin FOR CHANGING THE COINS IN LIVE REPORT
const changeCoin = () => {
  // CLOSE THE COLLAPSE
  $('#coinsCollapse').collapse('hide')
  // CLOSE THE MODAL
  $('#coinsModal').modal('hide')

  // $('.form-check-input[value="' + $('.replaceCoin').val() + '"]').prop(
  //   'checked',
  //   false,
  // )
  // REMOVE FROM ARRAY THE SELECTED COIN TO REMOVE
  for (let coin of liveReportsArr) {
    if (coin.name === $('.replaceCoin').val()) {
      liveReportsArr.splice(liveReportsArr.indexOf(coin), 1)
      break
    }
  }
  console.log(liveReportsArr)
}
