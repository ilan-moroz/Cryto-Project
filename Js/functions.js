// APIS
const cryptoCoins = 'https://api.coingecko.com/api/v3/coins/list'
const cryptoInfo = 'https://api.coingecko.com/api/v3/coins/'

// EMPTY ARRAY FOR THE DISPLAYED COINS
let displayCoins = []

//FUNCTION getCoinsDisplay GETS 100 RANDOM COINS FROM THE API AND APPEND TO THE HTML
function getCoinsDisplay() {
  $.get(cryptoCoins, (data) => {
    for (let i = 0; i < 100; i++) {
      let random = Math.floor(Math.random() * data.length) + 1
      displayCoins.push(data[random])
      $('.coins').append(`
          <div class="card border-warning text-warning bg-transparent ">
            <div class="card-header border-warning d-flex justify-content-between">
              ${displayCoins[i].symbol}
              <div class="form-check form-switch d-inline-block m-1 p-0">
             <input class="form-check-input" type="checkbox">
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">${displayCoins[i].name}</h5>
            </div>
            <div class="card-footer bg-transparent">
              <button type="button" class="btn btn-warning moreInfo data-bs-toggle="collapse"
              data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">More Info</button>
            </div>
          </div>
        `)
    }
  })
}

// FUNCTION filterCoins FOR DISPLAYING THE COINS USER SEARCHES
function filterCoins() {
  for (let index = 0; index < displayCoins.length; index++) {
    let card = $(`.card:eq(${index})`)
    if (
      !displayCoins[index].name
        .toLowerCase()
        .includes($('.search').val().toLowerCase()) &&
      !displayCoins[index].symbol
        .toLowerCase()
        .includes($('.search').val().toLowerCase())
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

// FUNCTION getCoinsInfo GETS DATA ABOUT SPECIFIC COIN FROM API
function getCoinsInfo() {
  let coinSymbol = displayCoins[
    $(this).closest('.card').index()
  ].symbol.toLowerCase()
  let coinName = displayCoins[$(this).closest('.card').index()].name
    .toLowerCase()
    .split(' ')
    .join('-')
    .split('.')
    .join('-')
    .split('[')[0]
    .split('(')[0]
  if (coinName[coinName.length - 1] === '-') {
    coinName = coinName.slice(0, -1)
  }
  console.log(coinName)
  $.ajax({
    url: cryptoInfo + coinName,
    success: (data) => {
      coinsInfo(data)
    },
    error: () => {
      $.get(cryptoInfo + coinSymbol, (data) => {
        coinsInfo(data)
      })
    },
  })
}

function coinsInfo(data) {
  $('html').append(`
    <img src="${data.image.small}"/>
    <h5>${data.name}</h5>
    USD: 1 ${data.name} = ${Number(data.market_data.current_price.usd)} $
    EURO: 1 ${data.name} = ${Number(data.market_data.current_price.eur)} €
    ILS: 1 ${data.name} = ${Number(data.market_data.current_price.ils)} ₪
    `)
}

/* <div class="collapse" id="collapseExample">
  <div class="card card-body">
    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
  </div>
</div> */
