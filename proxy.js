// netlify/functions/proxy.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { text } = event.queryStringParameters;

    if (!text) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing text parameter' })
        };
    }

    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const translatedText = data[0][0][0];

        return {
            statusCode: 200,
            body: JSON.stringify({ translatedText }),
            headers: {
                'Access-Control-Allow-Origin': '*',  // CORS headers
                'Access-Control-Allow-Methods': 'GET',  // Allow GET requests
                'Access-Control-Allow-Headers': 'Content-Type'  // Allow Content-Type header
            }
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
