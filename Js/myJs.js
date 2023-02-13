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

// LOADING SPINNER ON PAGE LOAD
$(document).ready(function () {
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
})
