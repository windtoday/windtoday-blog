/* global $, StripeCheckout, swal */

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

$(function () {
  var handler = StripeCheckout.configure({
    key: 'pk_live_3Wuqx47tGykhuLnbJtFHto4W',
    image: 'http://windtoday.co/assets/img/logo.jpg',
    locale: 'auto',
    token: function (token) {
      $.post('https://windtoday-payment-tbimdwiaxb.now.sh/payment', {
        token: token, plan: 'small'
      }, function (res) {
        var status = res.status
        if (status === 'success') {
          swal('Payment received', 'Now you\'re part of the ecosystem', 'success')
        } else {
          swal('Oops...', 'Something went wrong!', 'error')
        }
      })
    }
  })

  function createPlan (selector, opts) {
    var description = opts.name + ' Plan'
    var amount = opts.amount

    $(selector).click(function (evt) {
      evt.preventDefault()
      handler.open({
        name: 'Windtoday Marketplace',
        description: description,
        amount: amount,
        currency: 'eur'
      })
    })
  }

  createPlan('.small-btn', {name: 'Small', amount: 1199})
  createPlan('.medium-btn', {name: 'Medium', amount: 2399})
  createPlan('.large-btn', {name: 'Large', amount: 6999})

  window.addEventListener('popstate', function () {
    handler.close()
  })
})
