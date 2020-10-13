addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    if (url.pathname === '/') {
        return new Response('© 2020 Google APIs')
    }
    url.hostname = 'www.googleapis.com'
    return await fetch(new Request(url, request))
}
