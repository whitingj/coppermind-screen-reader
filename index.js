const { createProxyMiddleware, responseInterceptor, proxyEventsPlugin } = require('http-proxy-middleware')
const httpProxy = require('http-proxy-middleware')
console.log(httpProxy)
const express = require('express')
const app = express()
const port = 3000

console.log(process.env.DEBUG)

// app.get('/*', async (req, res) => {
//   console.log(req)
//   //res.send('Hello World! ' + req.url)
//   bent()
// })

app.get('/remove-characters.js', async (req, res) => {
  res.sendFile(__dirname + "/remove-characters.js")
})

function onProxyRes(proxyResponse, request, response) {
  console.log('proxyResponse', proxyResponse.headers);
  console.log('response', response.headers);
}

app.use('/api', createProxyMiddleware({ target: 'https://google.com', changeOrigin: true, onProxyRes }))

app.use(
  '/*',
  createProxyMiddleware({
    target: 'https://coppermind.net/',
    changeOrigin: true,

    plugins: [proxyEventsPlugin],
    /**
     * IMPORTANT: avoid res.end being called automatically
     **/
    selfHandleResponse: true, // res.end() will be called internally by responseInterceptor()

    /**
     * Intercept response and replace 'Hello' with 'Goodbye'
     **/
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
      let response = responseBuffer.toString('utf8')
      response = response.replace('<head>', '<head><script src="/remove-characters.js" />')
      return response
    }),
  }),
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
