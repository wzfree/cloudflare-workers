/*
 * ----------------------------------------------
 * Google drive API authorization
 * ----------------------------------------------
 */
const config = {
    restful: false, // Render a html page if false
    root_id: 'root', // root or directory id
    client_id: '162524057780-ujb7as2j25g34eI8rQRt3Th8ma0f.apps.googleusercontent.com', // faked
    client_secret: 'XtDkt5I9NohNc9Oziz9IALfV', // faked
    refresh_token: '1//0e_CgYIARjZn8SSNwF-L9IrurlUlnFZ-_LrG18PhQBLJzi8Y8B-pHbRAAGA4UxVP-523gjk4hm7udBjkEMWYipdDfU8h7PF8Y', // faked
}

/*
 * ----------------------------------------------
 * Index page template
 * ----------------------------------------------
 */
const tpl = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
  <link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAS1BMVEUAAAAAwlAAw08Aw1AAzFcAwk8AwVMAwlAAwlAAwlAAwlAAwlAAxFAAwlAAwlAAwlAAw1AAw1AAwlAAwk4AwlAAwk8AwlAAwFEAwlCXGrq0AAAAGHRSTlMAu3auBS0T9dNP7p8f4cWLYwvpPb+X2jlBNxsqAAAA60lEQVQ4y62TWRKDMAxDTRKWsrVlaXX/kzbjJtZMyCfvS/aAUeQgNxJ8Y/ggVxxAnFyYewBDo2zoZynxiPi/3k2RBzBNwEOUrMh7wdh1G5a3llmRJ/ASeQFPiWRFWmCVyAq0IqbIoSUfpOJAfqpQtJTsjx1tS3moHZGJBy9jCQP6A9gtuj13Z1uHi5EPQStVqSvssFaVupzJiVnF7tdcLS4SO6tzSXkBJltHDRnxCSmZGqM6sWwJXYaPJsbtkO4/PXo70zoKzpRwA7RcB2mBw0R5x/KLNqp+S08zwxtPNq5bHKq46l9HfJBb+AHKIRqF8dHKIQAAAABJRU5ErkJggg=="/>
  <title>Google Drive</title>
  <style>*{box-sizing:border-box}@font-face{font-family:Montserrat;src:url(https://unpkg.net/font/montserrat.woff2) format('woff2')}body{font:15px/1.3 Montserrat,Helvetica,Arial;background:#fcfcfc}h3,main{background:#fff;max-width:960px;margin:10px auto;border-radius:5px}h3{font-size:20px;padding:15px;border:#48d582 2px solid;color:#00c250}a{color:inherit;text-decoration:none}h3 a,main a{display:flex;align-items:center}svg{margin-right:10px}main{border:#ccc 1px solid}main img{margin-right:10px}main a{padding:12px 15px;border-bottom:#ddd 1px solid;transition:all .3s}main a:last-child{border:0}main a:hover{background:#fafafa}main a>div{margin-left:10px}main a>div:first-child{flex:1;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center}main a>div:not(:first-child){color:#ccc;font-size:13px}footer{text-align:center;color:#999;font-size:13px}footer a:hover{text-decoration:underline}</style>
</head>
<body>
  <h3><a href="/"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M366 160l-9 15-256 416-10 16 9 17 128 224 9 16h550l9-16 128-224 9-17-10-16-256-416-9-15zm75 64h181l217 352H658zm-57 29l95 155-222 361-92-161zm133 216l66 107H451zM412 640h429l-92 160H313z" fill="#00c250"/></svg>Google Drive</a></h3>
  <main>{{content}}</main>
  <footer>Developed by <a target="_blank" href="https://github.com/seatwork/cloudflare-workers">Seatwork on Github</a></footer>
</body>
</html>`

/*
 * ----------------------------------------------
 * Utils for renderring page
 * ----------------------------------------------
 */
function render(data) {
    const frag = []
    data && data.forEach(entry => {
        if (entry.mimeType == GoogleDrive.FOLDER_TYPE) {
            frag.push(`<a href="${entry.name}/">`)
            frag.push(`<div><img src="${entry.iconLink}"/><b>${entry.name}</b></div>`)
            frag.push(`<div>${formatDate(entry.modifiedTime)}</div>`)
            frag.push('</a>')
        } else {
            frag.push(`<a href="${entry.name}" target="_blank">`)
            frag.push(`<div><img src="${entry.iconLink}"/>${entry.name}</div>`)
            frag.push(`<div>${formatSize(entry.size)}</div>`)
            frag.push(`<div>${formatDate(entry.modifiedTime)}</div>`)
            frag.push('</a>')
        }
    })
    return tpl.trim().replace(/{{content}}/, frag.join(''))
}

function formatSize(n) {
    n = Math.round(n)
    if (n == 0) return ''
    if (n < 1024) return n + 'B'
    if (n < 1024 * 1024) return Math.round(n / 1024) + 'K'
    return parseFloat((n / 1024 / 1024).toFixed(1)) + 'M'
}

function formatDate(v) {
    return v.replace('T', ' ').substr(0, 19)
}

/*
 * ----------------------------------------------
 * Google drive main class
 * ----------------------------------------------
 */
class GoogleDrive {
    constructor(config) {
        this.config = config
        GoogleDrive.AUTH_API = 'https://www.googleapis.com/oauth2/v4/token'
        GoogleDrive.DRIVE_API = 'https://www.googleapis.com/drive/v3/files'
        GoogleDrive.FOLDER_TYPE = 'application/vnd.google-apps.folder'
        GoogleDrive.META_CACHE = {
            '/': {
                id: config.root_id,
                mimeType: GoogleDrive.FOLDER_TYPE
            }
        }
    }

    async getMetadata(path) {
        path = path.startsWith('/') ? path : '/' + path
        path = path.endsWith('/') ? path : path + '/'

        if (!GoogleDrive.META_CACHE[path]) {
            let fullpath = '/'
            let metadata = GoogleDrive.META_CACHE[fullpath]
            const fragments = this._trim(path, '/').split('/')

            for (let name of fragments) {
                fullpath += name + '/'

                if (!GoogleDrive.META_CACHE[fullpath]) {
                    name = decodeURIComponent(name).replace(/\'/g, "\\'")
                    const result = await this._fetchDrive({
                        q: `'${metadata.id}' in parents and name = '${name}' and trashed = false`,
                        fields: 'files(id, name, mimeType, size, modifiedTime, description, iconLink, thumbnailLink, shortcutDetails, md5Checksum)'
                    })
                    GoogleDrive.META_CACHE[fullpath] = result.files[0]
                }
                metadata = GoogleDrive.META_CACHE[fullpath]
                if (!metadata) break
            }
        }
        return GoogleDrive.META_CACHE[path]
    }

    async getRawdata(id, range) {
        const response = await fetch(GoogleDrive.DRIVE_API + '/' + id + '?alt=media', {
            headers: {
                Authorization: 'Bearer ' + (await this._getAccessToken()),
                Range: range || ''
            }
        })
        if (response.status >= 400) {
            const result = await response.json()
            const error = new Error(result.error.message)
            error.code = response.status
            throw error
        }
        return response
    }

    async getObjects(id) {
        if (!id) return

        let pageToken
        const list = []
        const params = {
            pageSize: 1000,
            q: `'${id}' in parents and trashed = false AND name != '.password'`,
            fields: 'nextPageToken, files(id, name, mimeType, size, modifiedTime, description, iconLink, thumbnailLink, md5Checksum, shortcutDetails)',
            orderBy: 'folder, name, modifiedTime desc'
        }

        do {
            if (pageToken) params.pageToken = pageToken
            const result = await this._fetchDrive(params)
            pageToken = result.nextPageToken
            list.push(...result.files)
        } while (
            pageToken
        )
        return list
    }

    async _fetchDrive(params) {
        const response = await fetch(GoogleDrive.DRIVE_API + '?' + this._encodeQueryString(params), {
            headers: {
                Authorization: 'Bearer ' + (await this._getAccessToken())
            }
        })

        const result = await response.json()
        if (result.error) {
            if (result.error.message.startsWith('User Rate Limit Exceeded')) {
                return this._fetchDrive(params)
            }
            const error = new Error(result.error.message)
            error.code = response.status
            throw error
        }
        return result
    }

    async _getAccessToken() {
        if (this.config.expires && this.config.expires > Date.now()) {
            return this.config.access_token
        }
        const response = await fetch(GoogleDrive.AUTH_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: this._encodeQueryString({
                client_id: this.config.client_id,
                client_secret: this.config.client_secret,
                refresh_token: this.config.refresh_token,
                grant_type: 'refresh_token'
            })
        })

        const result = await response.json()
        if (result.error) {
            const error = new Error(result.error_description)
            error.code = response.status
            throw error
        }

        this.config.expires = Date.now() + 3500 * 1000
        this.config.access_token = result.access_token
        return this.config.access_token
    }

    _encodeQueryString(data) {
        const result = []
        for (let k in data) {
            result.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        }
        return result.join('&')
    }

    _trim(string, char) {
        return char ?
            string.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '') :
            string.replace(/^\s+|\s+$/g, '')
    }
}

/*
 * ----------------------------------------------
 * Cloudflare worker entry
 * ----------------------------------------------
 */
const gd = new GoogleDrive(config)
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    try {
        const url = new URL(request.url)
        const metadata = await gd.getMetadata(url.pathname)
        if (!metadata) {
            return new Response('File Not Found', {
                status: 404
            })
        }

        if (metadata.mimeType == GoogleDrive.FOLDER_TYPE) {
            const objects = await gd.getObjects(metadata.id)
            if (config.restful) {
                return new Response(JSON.stringify(objects))
            } else {
                return new Response(render(objects), {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/html; charset=utf-8'
                    }
                })
            }
        } else {
            const range = request.headers.get('Range')
            const object = await gd.getRawdata(metadata.id, range)
            const response = new Response(object.body, object)
            response.headers.set('Content-Type', metadata.mimeType)
            response.headers.set('ETag', `"${metadata.md5Checksum}"`)
            response.headers.set('Last-Modified', new Date(metadata.modifiedTime).toGMTString())
            response.headers.set('Cache-Control', 'public, max-age=31536000')
            response.headers.delete('Content-Disposition')
            return response
        }
    } catch (e) {
        return new Response(e.message, {
            status: e.code || 500
        })
    }
}
