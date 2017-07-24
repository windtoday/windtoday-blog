/* global $, StripeCheckout, swal */

function createCheckout (planId) {
  const overlay = $('body')
  return StripeCheckout.configure({
    key: 'pk_live_3Wuqx47tGykhuLnbJtFHto4W',
    image: 'https://blog.windtoday.co/logo.jpg',
    locale: 'auto',
    token: function (token) {
      overlay.loading({message: 'Processing...'})
      $.post('https://windtoday.now.sh/payment', {
        token: token, plan: planId
      }, function (res) {
        overlay.loading('stop')
        var status = res.status
        if (status === 'success') {
          swal('Payment received', 'we\'ve sent you the receipt', 'success')
        } else {
          swal('Something went wrong!', 'Please contact with info@windtoday.co', 'error')
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

$(function () {
  createPlan('.small-btn', {name: 'Small', amount: 1900, planId: 'small_v3'})
  createPlan('.medium-btn', {name: 'Medium', amount: 2600, planId: 'medium_v3'})
  createPlan('.large-btn', {name: 'Large', amount: 9900, planId: 'large_v3'})
})
