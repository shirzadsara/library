// test-register.js
const fetch = require('node-fetch'); // اگه Node 18+ داری، fetch تو خود Node هست، نیازی به نصب نیست

async function testRegister() {
  try {
    const res = await fetch('http://localhost:3000/register/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sara',
        email: 'sara@example.com',
        password: '123456'
      })
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

testRegister();
