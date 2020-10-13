const upstreams = {
    // subdomain: ['desktop website', 'mobile website']
    google: ['https://www.google.com'],
    image: ['https://image.google.com'],
    play: ['https://play.google.com'],
    wiki: ['https://zh.wikipedia.org', 'https://zh.m.wikipedia.org']
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const requestUrl = new URL(request.url)
    const subdomain = requestUrl.host.split('.')[0]
    const upstream = upstreams[subdomain]

    if (!upstream || !upstream[0]) {
        return new Response(
            `Bad Request: The upstream '${subdomain}' is not available.`, {
                status: 400
            }
        )
    }

    const upstreamUrl = isMobile(request) ?
        new URL(upstream[1] || upstream[0]) :
        new URL(upstream[0])

    requestUrl.protocol = upstreamUrl.protocol
    requestUrl.host = upstreamUrl.host
    requestUrl.pathname = upstreamUrl.pathname + requestUrl.pathname

    return await fetch(
        new Request(requestUrl, {
            method: request.method,
            headers: request.headers,
            body: request.body
        })
    )
}

function isMobile(request) {
    const userAgent = request.headers.get('user-agent')
    if (userAgent) {
        const mobileAgents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
        for (let agent of mobileAgents) {
            if (userAgent.indexOf(agent) > 0) return true
        }
    }
    return false
}
