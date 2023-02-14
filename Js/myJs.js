$(function () {
  // RUN FUNCTION getCoinsDisplay ON PAGE LOAD
  getCoinsDisplay()

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
  $('.coins').on('click', '.moreInfo', getCoinsInfo)

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
