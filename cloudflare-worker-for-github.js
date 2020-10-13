const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
  <meta name="description" content="Unpkg is a free proxy service for raw user content on Github and Google."/>
  <link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc6ur3AAAAFnRSTlMAmryPe8+os4YhXcX169wRaHFOQi45eQ35JQAAAmNJREFUWMO9l9uWqyAQRBtBEBXxFv7/U8+QkJRyS1xnJvUys6Czm7IRWsqpZzd6r42t+YldOeeYpro0+4lSmUSWj87L9FSTMO4uEU8sxgVJKqufXFB7nlgH9xIrm28Q1ZxsycegERMAefNeXJ0BthtDak1tEWBFiGpuxE6AeQqmNiIASuanmQiAg/mpJyoDthA1dpZOAM0wAUDRvNqJADiYl5qChhxgDh79/gMAtgY/UQP0jwphgN8BLJRuPsY2JYDZKQa0j5pqqgBgYaIE4GNbvBNXAN0LMMexqgRo8wDxEWC5AJDfAYiLAPEnAHURMPwPoIsB3W8A5JcA2Pq/BMAA+yMA+w6AfR0Ql1G+AF0uVlYAODU4AMku/xCgcoAediEev41DGbDh/KwA/IWyhHVE0v6u2t8AtPvRlgBwOYpMadroiDO2AJDwkAHAQYMTPHMP9iUA7to5AwB+ssmqUEZrvIMwLCm/BF4BMB8gwj+KUrWJCRUikcDgFUm1+0qOK+Wbhm0M/MyViRzRGiaUdj20optPpHOE7tVvYknrcwcgrTXIE4k/4sLk8sy0K+dlnlkbwPJrcMNiw1OVRJt0D67/PdZzyxPm0L8Z2Qv/V4nJBShc2xH1TaQbFyttyVhccQgtMJS2ZPrOtCWCnVt3ktqzT1tRWTeGn09rJoepfWCg8Oim0xOsTuAuiOlqBmnzD0E6tNn1HCYX0ZtQugVj5U0nb7E7hdLVJZ5bbEakXoZn6QAuasO3oORiWTrWjg4fQm+FLxcIpftQO0sRhu90QVoMB8bYyt7SVel17jhjvJvXT3L/A/GDXSVGRgx9AAAAAElFTkSuQmCC"/>
  <title>UNPKG</title>
  <style>body{max-width:800px;margin:auto;overflow-wrap:break-word;font:16px/1.5 -apple-system,BlinkMacSystemFont,Roboto,"Droid Sans","Helvetica Neue",sans-serif}footer,header,main{margin:5%}.usage,footer,header{text-align:center}a{color:#cd4230;text-decoration:none}a:hover{text-decoration:underline}h1{font-size:1.5em;display:list-item;list-style:disc;margin-left:25px}section{margin:5% 0}.usage{background:#eee;padding:5px}</style>
</head>
<body>

<header>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="80"><path d="M1 58v72c0 60 0 73 2 80 7 42 38 75 80 86 25 5 54 2 76-8l101-59c21-16 35-41 38-66l1-80V12L279 1l-79 45-1 78c0 82 0 83-5 96-3 9-3 9-12 7-25-7-47-23-57-49-6-15-5-21-5-93V12L100 1zm99 36c0 55-1 65 6 91 11 27 37 51 66 60l6 3c0 1-11 12-20 17a84 84 0 01-52 14c-33-1-62-21-76-50-9-19-8-13-9-91V69l78-45zm179-1c-1 78 0 75-9 92a79 79 0 01-57 43l3-10c6-26 3-57 3-85l1-75 58-34z"/></svg>
</header>

<main>
  <section>
    <h1>Github User Content</h1>
    <p><u>Unpkg.net</u> is a free direct link service for raw user content of public repositories on <a href="//github.com" target="_blank">Github</a>. Use it to quickly and easily load any file from any public repository using a URL like:</p>
    <p class="usage">https://unpkg.net/{user}/{repo}/{path}</p>
    <h3>Examples</h3>
    <ul>
      <li><a href="/jquery/jquery/src/jquery.js" target="_blank">unpkg.net/jquery/jquery/src/jquery.js</a></li>
      <li><a href="/facebook/react/README.md" target="_blank">unpkg.net/facebook/react/README.md</a></li>
    </ul>
  </section>

  <section>
    <h1>Google User Content</h1>
    <p><u>*.Unpkg.net</u> is a free proxy service for raw user content on <a href="//www.googleusercontent.com" target="_blank">Google</a>. Use it to quickly and easily load any file from google user content using a URL like:</p>
    <p class="usage">https://{upstream}.unpkg.net/{path}</p>
    <h3>Examples</h3>
    <ul>
      <li><a href="//drive-thirdparty.unpkg.net/64/type/application/vnd.google-apps.folder+30" target="_blank">drive-thirdparty.unpkg.net/64/type/application/vnd.google-apps.folder+30</a></li>
      <li><a href="//lh3.unpkg.net/sA0AZY7T60sayFWkVg2Tqc0hyIoUDSFJg5z0M_1zdTH6kNuH1aYqY-v2ZC8EDJol87r6pZdpUs0" target="_blank">lh3.unpkg.net/sA0AZY7T60sayFWkVg2Tqc0hyIoUDSFJg5z0M_1zdTH6kNuH1aYqY-v2ZC8EDJol87r6pZdpUs0</a></li>
    </ul>
  </section>
</main>

<footer>© 2020 UNPKG</footer>
</body>
</html>`

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    if (url.pathname === '/') {
        return new Response(html, {
            status: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8'
            }
        })
    }
    url.hostname = 'raw.githubusercontent.com'
    url.pathname = url.pathname.replace(/^\/([^/]+\/[^/]+)\/(.+)$/, "$1/master/$2")
    return await fetch(new Request(url, request))
}
