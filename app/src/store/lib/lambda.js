import qs from 'qs';
const sandbox_key = 'LAMBDA KEY';
const live_key = '';
// choose the right key
const secret = sandbox_key;
const url = 'LAMBDA URL';

async function invoke(action, payload) {
  try {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action,
        secret,
        ...payload
      })
    });
    const result = await response.json();
    return result;
  }
  catch (e) {
    console.log('error invoking lambda', e);
    throw e;
  }
}

/**
 * @param cc { customerId, email, cardToken, cardId }
 */
const addCard = (cc) => invoke('addCard', cc);
/**
 * @param params { customerId, cardId, amount, dailyCigarettes, currentCigarettes }
 */
const charge = (params) => invoke('charge', params);

export {
  addCard,
  charge
};
