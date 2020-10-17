addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    if (url.pathname === '/') {
        return await fetch('https://cdn.unpkg.net/index.html')
    }
    url.hostname = 'raw.githubusercontent.com'
    url.pathname = url.pathname.replace(/^\/([^/]+\/[^/]+)\/(.+)$/, "$1/master/$2")

    let response = await fetch(new Request(url, request))
    response = new Response(response.body, response)
    response.headers.set('Access-Control-Allow-Origin', '*')
    return response
}
