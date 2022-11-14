const url = 'http://34.90.89.78:9009/api/v1.0/'
export const environment = {
  production: true,
  signin: url + 'auth/sign-in',
  signup: url + 'auth/sign-up',
  verification: url + 'auth/verify',
  sendOtp: url + 'auth/resetOtpCode',
  client: url + 'client',
  typeVoucher: url + 'typevoucher',
  store: url + 'store',
  product: url + 'product',
  order: url + 'order',
  storeHouse: url + 'storehouse',
  users: url + 'users',
  paymentMethod: url + 'paymentmethode',
};
