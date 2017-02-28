/* global $ */

$(function () {
  $('.jquery-background-video').bgVideo({
    showPausePlay: false
  })

  var searchEl = $('#search')
  var formEl = $('form')
  var searchQuery

  searchEl.typed({
    stringsElement: $('#search-suggestions'),
    attr: 'placeholder',
    typeSpeed: 50,
    backDelay: 1000,
    loop: true
  })

  searchEl.on('change paste keyup', function () {
    var query = $(this).val()
    if (!query) return
    searchQuery = query
  })

  formEl.submit(function (event) {
    event.preventDefault()
    var url = 'https://market.windtoday.co/?query=' + searchQuery
    window.open(url)
  })
})
