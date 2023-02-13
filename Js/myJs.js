// RUN FUNCTION getCoinsDisplay && parallax ON PAGE LOAD
$(function () {
  getCoinsDisplay()
  parallax()
})

// ON INPUT && ON CLICK EVENTS THAT TRIGGER filterCoins FUNCTION FOR USER SEARCH
$(function () {
  $('.search').on('input', filterCoins)
  $('.btn').on('click', filterCoins)
})

$(function () {
  $('.coins').on('click', '.moreInfo', getCoinsInfo)
})
