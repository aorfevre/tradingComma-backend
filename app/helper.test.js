const helper = require('./helper');
const faker = require('faker');
const moment = require('moment');


test('Serialize item is doable if null', () => {
  const testQuery = null;
  expect(helper.serializeQueryParams(testQuery)).toBe('')
});

test('Serialize item is doable if undefined', () => {
  const testQuery = undefined;
  expect(helper.serializeQueryParams(testQuery)).toBe('')
});

test('Serialize item is doable if {}', () => {
  const testQuery = {};
  expect(helper.serializeQueryParams(testQuery)).toBe('')
});

test('Serialize item is doable if defined', () => {

  const testQuery = {
    foo: 1,
    test: 2
  };
  expect(helper.serializeQueryParams(testQuery)).toBe('foo=1&test=2')
});

test('Serialize item is doable if defined', () => {
  const email = faker.internet.email()
  const testQuery = {
    email
  };
  expect(helper.serializeQueryParams(testQuery)).toBe(`email=${encodeURIComponent(email)}`)
});


test('Serialize user from firebase token 1', () => {
  const email = faker.internet.email()
  const decodedToken = {
    name: 'Alexandre orfevre',
    picture: 'https://lh6.googleusercontent.com/-GY2Id9u6YNo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl0pFtxLhgo6n3qBjtmnu9YUkrY_A/s96-c/photo.jpg',
    iss: 'https://securetoken.google.com/eldorado-wallet-dev',
    aud: 'eldorado-wallet-dev',
    auth_time: 1606826128,
    user_id: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    sub: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    iat: 1606826755,
    exp: 1606830355,
    email: email,
    email_verified: true,
    firebase: {
      identities: {
        'google.com': [Array],
        email: [Array]
      },
      sign_in_provider: 'google.com'
    },
    uid: '3ZEusfZLalQUhkBzmjhpXc0hXWP2'
  }
  const body = {
    pub_key: 'public key',
    type: 'user'
  }
  console.log(helper.transformTokenToUser(decodedToken, body))
  expect(helper.transformTokenToUser(decodedToken, body)).toMatchObject({
    pub_key: 'public key',
    firebase_uid: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    provider: 'google.com',
    firstname: 'Alexandre',
    lastname: 'orfevre',
    nickname: 'Alexandre',
    is_corp: false,
    company_name: null,
    company_address: null,
    company_number: null,
    birth_date: moment().format('YYYY-MM-DD'),
    desc: null,
    email: email,
    email_verified: true,
    phone: '',
    photo_url: 'https://lh6.googleusercontent.com/-GY2Id9u6YNo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl0pFtxLhgo6n3qBjtmnu9YUkrY_A/s96-c/photo.jpg',
    type: 'user'
  })
});



test('Serialize user from firebase token - no lastname', () => {
  const email = faker.internet.email()
  const decodedToken = {
    name: 'Alexandre',
    picture: 'https://lh6.googleusercontent.com/-GY2Id9u6YNo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl0pFtxLhgo6n3qBjtmnu9YUkrY_A/s96-c/photo.jpg',
    iss: 'https://securetoken.google.com/eldorado-wallet-dev',
    aud: 'eldorado-wallet-dev',
    auth_time: 1606826128,
    user_id: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    sub: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    iat: 1606826755,
    exp: 1606830355,
    email: email,
    email_verified: true,
    firebase: {
      identities: {
        'google.com': [Array],
        email: [Array]
      },
      sign_in_provider: 'google.com'
    },
    uid: '3ZEusfZLalQUhkBzmjhpXc0hXWP2'
  }
  const body = {
    pub_key: 'public key',
    type: 'user'
  }

  expect(helper.transformTokenToUser(decodedToken, body)).toEqual({
    pub_key: 'public key',
    firebase_uid: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    provider: 'google.com',
    firstname: 'Alexandre',
    lastname: null,
    nickname: 'Alexandre',
    is_corp: false,
    company_name: null,
    company_address: null,
    company_number: null,
    birth_date: moment().format('YYYY-MM-DD'),
    desc: null,
    email: email,
    email_verified: true,
    phone: '',
    photo_url: 'https://lh6.googleusercontent.com/-GY2Id9u6YNo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl0pFtxLhgo6n3qBjtmnu9YUkrY_A/s96-c/photo.jpg',
    type: 'user'
  })
});



test('Serialize user from firebase token - no photo', () => {
  const email = faker.internet.email()
  const decodedToken = {
    name: 'Alexandre orfevre',
    iss: 'https://securetoken.google.com/eldorado-wallet-dev',
    aud: 'eldorado-wallet-dev',
    auth_time: 1606826128,
    user_id: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    sub: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    iat: 1606826755,
    exp: 1606830355,
    email: email,
    email_verified: true,
    firebase: {
      identities: {
        'google.com': [Array],
        email: [Array]
      },
      sign_in_provider: 'google.com'
    },
    uid: '3ZEusfZLalQUhkBzmjhpXc0hXWP2'
  }

  const body = {
    pub_key: 'public key',
    type: 'user'
  }
  console.log(helper.transformTokenToUser(decodedToken, body))
  expect(helper.transformTokenToUser(decodedToken, body)).toMatchObject({
    pub_key: 'public key',
    firebase_uid: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    provider: 'google.com',
    firstname: 'Alexandre',
    lastname: 'orfevre',
    nickname: 'Alexandre',
    is_corp: false,
    company_name: null,
    company_number: null,
    birth_date: moment().format('YYYY-MM-DD'),
    desc: null,
    email: email,
    email_verified: true,
    phone: '',
    photo_url: '',
    type: 'user'
  })
});




test('Serialize user from firebase token - no uid', () => {
  const email = faker.internet.email()
  const decodedToken = {
    name: 'Alexandre orfevre',
    iss: 'https://securetoken.google.com/eldorado-wallet-dev',
    aud: 'eldorado-wallet-dev',
    auth_time: 1606826128,
    user_id: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    sub: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    iat: 1606826755,
    exp: 1606830355,
    email: email,
    email_verified: true,
    firebase: {
      identities: {
        'google.com': [Array],
        email: [Array]
      },
      sign_in_provider: 'google.com'
    }
  }
  const body = {
    pub_key: 'public key',
    type: 'user'
  }
  expect(helper.transformTokenToUser(decodedToken, body)).toEqual({
    error: 'Casting error - Missing datas'
  })
});



test('Serialize user from firebase token - no provider', () => {
  const email = faker.internet.email()
  const decodedToken = {
    name: 'Alexandre orfevre',
    picture: 'https://lh6.googleusercontent.com/-GY2Id9u6YNo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl0pFtxLhgo6n3qBjtmnu9YUkrY_A/s96-c/photo.jpg',
    iss: 'https://securetoken.google.com/eldorado-wallet-dev',
    aud: 'eldorado-wallet-dev',
    auth_time: 1606826128,
    user_id: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    sub: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    iat: 1606826755,
    exp: 1606830355,
    email: email,
    email_verified: true,
    firebase: {
      identities: {
        'google.com': [Array],
        email: [Array]
      },
    },
    uid: '3ZEusfZLalQUhkBzmjhpXc0hXWP2'
  }
  const body = {
    pub_key: 'public key',
    type: 'user'
  }
  expect(helper.transformTokenToUser(decodedToken, body)).toEqual({
    error: 'Casting error - Missing datas'
  })
});

test('Serialize user from firebase token - no email', () => {
  const email = faker.internet.email()
  const decodedToken = {
    name: 'Alexandre orfevre',
    picture: 'https://lh6.googleusercontent.com/-GY2Id9u6YNo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl0pFtxLhgo6n3qBjtmnu9YUkrY_A/s96-c/photo.jpg',
    iss: 'https://securetoken.google.com/eldorado-wallet-dev',
    aud: 'eldorado-wallet-dev',
    auth_time: 1606826128,
    user_id: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    sub: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    iat: 1606826755,
    exp: 1606830355,
    email_verified: true,
    firebase: {
      identities: {
        'google.com': [Array],
        email: [Array]
      },
      sign_in_provider: 'google.com'
    },
    uid: '3ZEusfZLalQUhkBzmjhpXc0hXWP2'
  }
  const body = {
    pub_key: 'public key',
    type: 'user'
  }
  expect(helper.transformTokenToUser(decodedToken, body)).toEqual({
    error: 'Casting error - Missing datas'
  })
});


test('Serialize user from firebase token - no email verified', () => {
  const email = faker.internet.email()
  const decodedToken = {
    name: 'Alexandre orfevre',
    picture: 'https://lh6.googleusercontent.com/-GY2Id9u6YNo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl0pFtxLhgo6n3qBjtmnu9YUkrY_A/s96-c/photo.jpg',
    iss: 'https://securetoken.google.com/eldorado-wallet-dev',
    aud: 'eldorado-wallet-dev',
    auth_time: 1606826128,
    user_id: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    sub: '3ZEusfZLalQUhkBzmjhpXc0hXWP2',
    iat: 1606826755,
    exp: 1606830355,
    email: email,
    firebase: {
      identities: {
        'google.com': [Array],
        email: [Array]
      },
      sign_in_provider: 'google.com'
    },
    uid: '3ZEusfZLalQUhkBzmjhpXc0hXWP2'
  }
  expect(helper.transformTokenToUser(decodedToken, 'public key')).toEqual({
    error: 'Casting error - Missing datas'
  })
});