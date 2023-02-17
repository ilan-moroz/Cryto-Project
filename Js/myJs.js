$(function () {
  // RUN FUNCTION getCoinsDisplay ON PAGE LOAD
  getCoinsDisplay().catch((error) => {
    console.error('Error while fetching and displaying coins:', error)
  })

  // RUN FUNCTION parallax ON PAGE LOAD
  parallax()

  // ON INPUT && ON CLICK EVENTS THAT TRIGGER filterCoins FUNCTION FOR USER SEARCH
  $('.search').on('keydown', function (event) {
    if (event.keyCode === 13) {
      filterCoins()
    }
  })
  $('.btn').on('click', filterCoins)

  // ON CLICK EVENT FOR getCoinsInfo FUNCTION
  $('.coins').on('click', '.moreInfo', async function () {
    // GET coinSymbol AND coinName OF THE COINS THE USER CLICKED
    let coinIndex = $(this).closest('.card').index()
    let targetId = `coin-${coinIndex}-details`
    let coinSymbol = displayCoins[coinIndex].symbol.toLowerCase()
    let coinName = displayCoins[coinIndex].name
      .toLowerCase()
      .split(' ')
      .join('-')
      .split('.')
      .join('-')
      .split('[')[0]
      .split('(')[0]
    // RUN fetchCoinsData WITH coinSymbol AND coinName OF THE CLICKED COIN
    let coinData = await fetchCoinsData(coinName, coinSymbol)
    // Create the HTML content for the coin details and append it to the collapse element
    let coinDetailsHtml = `
    <img class="collapseImg" src="${coinData.image.large}"/>
    USD:<br/> 1 ${coinData.name} = ${Number(
      coinData.market_data.current_price.usd,
    )}$<br/>
    EURO:<br/>  1 ${coinData.name} = ${Number(
      coinData.market_data.current_price.eur,
    )}€<br/>
    ILS:<br/>  1 ${coinData.name} = ${Number(
      coinData.market_data.current_price.ils,
    )}₪`
    $(`#${targetId}`).html(coinDetailsHtml)
  })

  // function getCoinDetailsFromClick() {
  //   let coinIndex = $(this.target).closest('.card').index()
  //   let coinSymbol = displayCoins[coinIndex].symbol.toLowerCase()
  //   let coinName = getFormattedCoinName(
  //     displayCoins[coinIndex].name
  //       .toLowerCase()
  //       .split(' ')
  //       .join('-')
  //       .split('.')
  //       .join('-')
  //       .split('[')[0]
  //       .split('(')[0],
  //   )
  //   coinData(coinName, coinSymbol, coinIndex)
  // }

  // async function coinData(coinName, coinSymbol, coinIndex) {
  //   let coinData = await fetchCoinsData(coinName, coinSymbol)
  //   let coinDetailsHtml = `
  //   <img class="collapseImg" src="${coinData.image.large}"/>
  //   USD:<br/> 1 ${coinData.name} = ${Number(
  //     coinData.market_data.current_price.usd,
  //   )}$<br/>
  //   EURO:<br/>  1 ${coinData.name} = ${Number(
  //     coinData.market_data.current_price.eur,
  //   )}€<br/>
  //   ILS:<br/>  1 ${coinData.name} = ${Number(
  //     coinData.market_data.current_price.ils,
  //   )}₪`
  //   let targetId = `coin-${coinIndex}-details`
  //   $(`#${targetId}`).html(coinDetailsHtml)
  // }

  // LOADING SPINNER
  $(document).mousemove(function (event) {
    $('#spinner').css({
      left: event.pageX,
      top: event.pageY,
    })
  })
  $(document).ajaxStart(function () {
    $('#spinner').show()
  })
  $(document).ajaxStop(function () {
    $('#spinner').hide()
  })

  // PREVENT FORM FROM SUBMIT
  $('.form').submit(function (event) {
    event.preventDefault()
  })

  //SHOW ALL COINS ON NAVBAR COINS CLICK
  $('ul li a')
    .first()
    .on('click', function () {
      $('.card').show()
    })
})
