const http = require('http');


const data = JSON.stringify({
  name: 'Test Admin',
  email: 'admin_test@example.com',
  password: 'adminpassword123',
  role: 'admin',
  adminSecret: 'itSecret@123'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/admin_auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let responseBody = '';

  res.on('data', (chunk) => {
    responseBody += chunk;
  });

  res.on('end', () => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log('Response:', responseBody);
  });
});

req.on('error', (error) => {
  console.error('Error making request:', error.message);
});

req.write(data);
req.end();
