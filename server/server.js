const express = require('express');
const axios = require('axios');
const app = express();

const getStatus = async (url) => {
  const instance = axios.create();

  instance.interceptors.request.use((config) => {
    config.headers['request-startTime'] = new Date().getTime();
    return config;
  });

  instance.interceptors.response.use((response) => {
    const currentTime = new Date().getTime();
    const startTime = response.config.headers['request-startTime'];
    response.headers['request-duration'] = currentTime - startTime;
    return response;
  });

  // Interesting note. A HEAD request to Amazon is not allowed 405.
  const response = await instance.get(url).catch(console.error);

  const statusData = {
    url,
    statusCode: response.status,
    duration: response.headers['request-duration'],
    date: new Date(),
  };

  return statusData;
};

app.get('/v1/amazon-status', async function(req, res) {
  const url = 'https://www.amazon.com';

  const statusData = await getStatus(url);

  res.json(statusData);
});

app.get('/v1/google-status', async function(req, res) {
  const url = 'https://www.google.com';

  const statusData = await getStatus(url);

  res.json(statusData);
});

app.get('/v1/all-status', async function(req, res) {

  const urls = ['https://www.amazon.com', 'https://www.google.com'];

  let multiStatusData = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    
    const statusData = await getStatus(url);
    multiStatusData.unshift(statusData);
  }

  res.json(multiStatusData);
});
  
// Setting the server to listen at port 3000
app.listen(4000, function(req, res) {
  console.log("Server is running at port 4000");
});