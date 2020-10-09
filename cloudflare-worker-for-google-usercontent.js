const upstream = '.googleusercontent.com'

addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    const path = url.pathname.match(/^\/+([a-z0-9\-]+)(\/.+)$/)
    const upstreamUrl = path ?
        url.protocol + '//' + path[1] + upstream + path[2] :
        url.protocol + '//lh3' + upstream + url.pathname

    url.hostname = upstream
    request = new Request(upstreamUrl, request)
    return await fetch(request)
}
