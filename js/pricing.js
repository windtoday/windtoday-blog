/* global $, StripeCheckout, swal */

$(function () {
  var handler = StripeCheckout.configure({
    key: 'pk_live_3Wuqx47tGykhuLnbJtFHto4W',
    image: 'https://windtoday.co/logo.jpg',
    locale: 'auto',
    token: function (token) {
      $.post('https://windtoday.now.sh/payment', {
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

  createPlan('.small-btn', {name: 'Small', amount: 1200})
  createPlan('.medium-btn', {name: 'Medium', amount: 2400})
  createPlan('.large-btn', {name: 'Large', amount: 7000})

  window.addEventListener('popstate', handler.close)
})
