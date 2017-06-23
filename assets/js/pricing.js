/* global $, StripeCheckout, swal */

$(function () {
  function createCheckout (planId) {
    return StripeCheckout.configure({
      key: 'pk_live_3Wuqx47tGykhuLnbJtFHto4W',
      image: 'https://blog.windtoday.co/logo.jpg',
      locale: 'auto',
      token: function (token) {
        $.post('https://windtoday.now.sh/payment', {
          token: token, plan: planId
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
  }

  function createPlan (selector, opts) {
    var checkout = createCheckout(opts.planId)
    window.addEventListener('popstate', checkout.close)

    $(selector).click(function (evt) {
      evt.preventDefault()
      checkout.open({
        name: 'Windtoday Marketplace',
        description: opts.name + ' Plan',
        amount: opts.amount,
        currency: 'eur'
      })
    })
  }

  createPlan('.small-btn', {name: 'Small', amount: 1900, planId: 'small_v2'})
  createPlan('.medium-btn', {name: 'Medium', amount: 2600, planId: 'medium'})
  createPlan('.large-btn', {name: 'Large', amount: 9900, planId: 'large'})
})
