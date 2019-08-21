
$(document).ready(function() {
  $("#submit-button").removeAttr("disabled");
  $("#payment-form").submit(function(event) {
    // disable the submit button to prevent repeated clicks
    $('#submit-button').attr("disabled", "disabled");
    $('#submit-button').text('Sending Payment...');

    cardData = {
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        address_zip: $('#card-address-zip').val()
    }

    Stripe.createToken(cardData, stripeResponseHandler);

    // prevent the form from submitting with the default action
    return false;
  });
});

function stripeResponseHandler(status, response) {
    if (response.error) {
        // show the errors on the form
        $("#payment-errors").text(response.error.message);
        $("#payment-errors").addClass('alert-box alert');
        $('#submit-button').text('Submit Payment');
        $("#submit-button").removeAttr("disabled");
    } else {
        var form$ = $("#payment-form");
        // token contains id, last4, and card type
        var token = response['id'];
        // insert the token into the form so it gets submitted to the server
        form$.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
        // and submit
        form$.get(0).submit();
    }
}
