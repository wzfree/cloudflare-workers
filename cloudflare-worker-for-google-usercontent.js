addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    const upstream = url.hostname.split('.')[0]
    url.hostname = upstream + '.googleusercontent.com'
    return await fetch(new Request(url, request))
}
