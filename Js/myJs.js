// RUN FUNCTION getCoinsDisplay && parallax ON PAGE LOAD
$(function () {
  getCoinsDisplay()
  parallax()
})

// ON INPUT && ON CLICK EVENTS THAT TRIGGER filterCoins FUNCTION FOR USER SEARCH
$(function () {
  $('.search').on('keydown', function (event) {
    if (event.keyCode === 13) {
      filterCoins()
    }
  })
  $('.btn').on('click', filterCoins)
})

// ON CLICK EVENT FOR getCoinsInfo
$(function () {
  $('.coins').on('click', '.moreInfo', getCoinsInfo)
})

// LOADING SPINNER
$(function () {
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
