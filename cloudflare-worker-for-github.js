addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    if (url.pathname === '/') {
        return await fetch('https://cdn.unpkg.net/index.html')
    }
    if (url.pathname === '/favicon.ico') {
        return await fetch('https://cdn.unpkg.net/favicon.ico')
    }

    url.hostname = 'raw.githubusercontent.com'
    url.pathname = url.pathname.replace(/^\/([^/]+\/[^/]+)\/(.+)$/, "$1/master/$2")
    return await fetch(new Request(url, request))
}
