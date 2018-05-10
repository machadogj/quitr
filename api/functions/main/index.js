var Stripe = require('stripe');
const secret = 'LAMBDA KEY';
const key = 'sk_test_STRIPE_SECRET_KEY';
const api = Stripe(key);

console.log('starting function')

const actions = {
  addCard: function (params) {
    var customerId = params.customerId;
    var email      = params.email;
    var cardToken  = params.cardToken;
    var cardId     = params.cardId;

    if (!customerId) throw new Error("customerId is required");
    if (!email) throw new Error("email is required");
    if (!cardToken) throw new Error("cardToken is required");
    if (!cardId) throw new Error("cardId is required");

    return api
      .customers
      .create({ id: customerId, email: email })
      .catch(function (err) {
        if (err.message === "Customer already exists.") {
          return api.customers.retrieve(customerId)
        }
        throw err;
      })
      .then(function (customer) {
        return api
          .customers
          .createSource(customerId, { source: cardToken })
      });
    /*
    {
      "id":"card_19YFwOKNM6Ex33Rv9WYsMfxU",
      "object":"card",
      "address_city":null,
      "address_country":null,
      "address_line1":null,
      "address_line1_check":null,
      "address_line2":null,
      "address_state":null,
      "address_zip":null,
      "address_zip_check":null,
      "brand":"Visa",
      "country":"US",
      "customer":"cust_123",
      "cvc_check":"pass",
      "dynamic_last4":null,
      "exp_month":12,
      "exp_year":2019,
      "fingerprint":"gdUDNUQtJHOdSdmz",
      "funding":"credit",
      "last4":"4242",
      "metadata":{},
      "name":"Gustavo Machado",
      "tokenization_method":null
    }
    */
  },
  charge: function (e) {
    var amount = e.amount;
    var customerId = e.customerId;
    var cardId = e.cardId;
    var dailyCigarettes = e.dailyCigarettes;
    var currentCigarettes = e.currentCigarettes;
    return api.charges.create({
        amount: amount * 100, //we need to send cents
        currency: "usd",
        customer: customerId,
        source: cardId,
        description: "Charge for " + (dailyCigarettes-currentCigarettes) + " cigarettes.",
        metadata: {
          dailyCigarettes,
          currentCigarettes
        }
      })
      .then(function (result) {
        if (result.status === 'succeeded') {
          result.amount = result.amount / 100; //we send back dollars
          return result;
        }
        console.log('Unable to charege customer.', result);
        throw new Error('Unable to charge customer.');
      })
    /* sample response
    {
      "id":"ch_19YIktKNM6Ex33RvHyqoYQQV",
      "object":"charge",
      "amount":1000,
      "amount_refunded":0,
      "application":null,
      "application_fee":null,
      "balance_transaction":"txn_19YIktKNM6Ex33RvkGKZS6TG",
      "captured":true,
      "created":1483551655,
      "currency":"usd",
      "customer":"cust_123",
      "description":"Charge for -3 cigarettes",
      "destination":null,
      "dispute":null,
      "failure_code":null,
      "failure_message":null,
      "fraud_details":{},
      "invoice":null,
      "livemode":false,
      "metadata":{"dailyCigarettes":"10","currentCigarettes":"13"},
      "order":null,
      "outcome":{"network_status":"approved_by_network","reason":null,"risk_level":"normal","seller_message":"Payment complete.","type":"authorized"},
      "paid":true,
      "receipt_email":null,
      "receipt_number":null,
      "refunded":false,
      "refunds":{"object":"list","data":[],"has_more":false,"total_count":0,"url":"/v1/charges/ch_19YIktKNM6Ex33RvHyqoYQQV/refunds"},
      "review":null,
      "shipping":null,
      "source":{"id":"card_19YFwOKNM6Ex33Rv9WYsMfxU","object":"card","address_city":null,"address_country":null,"address_line1":null,"address_line1_check":null,"address_line2":null,"address_state":null,"address_zip":null,"address_zip_check":null,"brand":"Visa","country":"US","customer":"cust_123","cvc_check":null,"dynamic_last4":null,"exp_month":12,"exp_year":2019,"fingerprint":"gdUDNUQtJHOdSdmz","funding":"credit","last4":"4242","metadata":{},"name":"Gustavo Machado","tokenization_method":null},
      "source_transfer":null,
      "statement_descriptor":null,
      "status":"succeeded"
    }
    */
  }
}

function reply (statusCode, payload, cb) {
  cb(null, {
    statusCode: statusCode,
    headers: {},
    body: JSON.stringify(payload)
  });
}

exports.handle = function(e, ctx, cb) {
  console.log('processing event: %j', e)
  function succeed (payload) { reply(200, payload, cb); }
  function fail (err) {
    console.log(err);
    var message = err.message || err;
    reply(500, { message: message }, cb);
  };
  var body;
  try {
    body = JSON.parse(e.body);
  }
  catch (e) {
    return fail('invalid json payload');
  }
  if (!body.secret || body.secret !== secret) {
    return fail('unauthorized');
  }
  var action = actions[body.action];
  if (!action) {
    return fail('invalid action');
  }
  try {
    action(body).then(succeed, fail);
  }
  catch (e) {
    return fail(e);
  }
}
