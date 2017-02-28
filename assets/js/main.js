/* global $ */

$(function () {
  var searchEl = $('#search')
  var suggestionsEl = $('#search-suggestions')
  var formEl = $('form')
  var searchQuery

  searchEl.typed({
    stringsElement: suggestionsEl,
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
