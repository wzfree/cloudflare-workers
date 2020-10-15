const upstream = '<bucket>.cos.accelerate.myqcloud.com'

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
    const url = new URL(request.url)
    url.host = upstream

    const response = await fetch(new Request(url, request))
    if (response.status < 400) return response

    const text = await response.text()
    const message = text.match(/<Message>(.+)<\/Message>/)
    return new Response(response.status + ': ' + message[1], {
        status: response.status
    })
}
