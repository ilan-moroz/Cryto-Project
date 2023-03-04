$(function () {
  // RUN FUNCTION getCoinsDisplay ON PAGE LOAD
  getCoinsDisplay().catch((error) => {
    console.error('Error while fetching and displaying coins', error)
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

  // ON CLICK EVENT FOR SHOWING MORE INFO ABOUT THE COINS
  $('.coins').on('click', '.moreInfo', function (event) {
    if ($(event.target).attr('aria-expanded') === 'true') {
      getCoinDetailsFromClick(event)
    }
  })

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

  // ONCLICK EVENT FOR CHECKBOX
  $('.coins').on('click', 'input[type="checkbox"]', function (event) {
    checkBoxCheck(event)
  })

  // ONCLICK EVENT FOR COLLAPSE IN MODAL
  $('#changeCoin').on('click', function () {
    modalCollapse()
  })

  // ONCLICK EVENT FOR CHANGE COINS IN MODAL COLLAPSE
  $('.approveChange').on('click', function () {
    changeCoin()
  })

  // ONCLICK EVENT FOT MODAL CLOSE BUTTON WHEN USER WANT TO CANCEL COIN CHANGE
  $('#closeModal').on('click', function () {
    modalCancel()
  })

  // Add the "active" class to the current nav item
  $('.nav-link').each(function () {
    var url = window.location.href
    if ($(this).attr('href') == url) {
      $(this).addClass('active')
    }
  })
  // Remove the "active" class from other nav items
  $('.nav-link').not('.active').removeClass('active')
  // Update the "active" class when the user clicks a nav item
  $('.nav-link').click(function () {
    $('.nav-link').removeClass('active')
    $(this).addClass('active')
  })

  // CREATE CANVAS CHART
  $('#liveReportChart').CanvasJSChart(chart)

  // HIDE THE LIVE REPORTS & ABOUT ON DEFAULT
  $('#liveReports').hide()
  $('#about').hide()

  //SHOW ALL COINS ON NAVBAR COINS CLICK AND HIDE ALL OTHER DIV
  $('.coinsNav').on('click', function () {
    showSection('.card')
  })

  //SHOW LIVE REPORTS AND HIDE ALL OTHER DIV
  $('.liveReportNav').on('click', function () {
    showSection('#liveReports')
  })

  //SHOW LIVE REPORTS AND HIDE ALL OTHER DIV
  $('.aboutNav').on('click', function () {
    showSection('#about')
  })
})
