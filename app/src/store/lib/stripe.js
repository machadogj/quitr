import qs from 'qs';
const sandbox_key = 'pk_test_STRIPE_PUBLIC_KEY';
const live_key = '';
// choose the right key
const key = sandbox_key;

function stringifyRequestData(data) {
  return qs.stringify(data, {arrayFormat: 'brackets'});
}

async function createToken(card) {
  const url = 'https://api.stripe.com/v1/tokens';
  const requestData = stringifyRequestData({ card });
  const headers = {
    'Authorization': `Bearer ${key}`,
    'Content-Length': requestData.length,
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  try {
    const result = await fetch(url, {
      method: 'post',
      headers,
      body: requestData
    });
    const payload = await result.json();
    if (payload.error) {
      throw Error(payload.error.message);
    }
    return payload;
  }
  catch (e) {
    console.log('could not get card token', e); // eslint-disable-line
    throw e;
  }
}

export {
  createToken
};
