const upstream = '.googleusercontent.com'

addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    const subdomain = url.hostname.split('.')[0]
    url.hostname = subdomain + upstream

    request = new Request(url, request)
    return await fetch(request)
}
