const axios = require('axios');

const verify = async (token, amount) => {
  try {
    let data = {
      token: token,
      amount: amount,
    };

    let config = {
      headers: {
        Authorization: 'Key test_secret_key_8b91062616f445d88aa2ff1b48a8c6ec',
      },
    };

    let res = await axios.post(
      'https://khalti.com/api/v2/payment/verify/',
      data,
      config
    );

    if (res) {
      console.log(res.data.amount);
      console.log(amount);
      return res.data.amount == amount;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
module.exports = verify;
