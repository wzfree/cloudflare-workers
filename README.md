# Cloudflare Workers Collection

## cloudflare-worker-for-google-drive

用于创建 Google Drive 云端硬盘的索引页面，此脚本轻巧纯净，未引用任何第三方类库。示例：https://gd.force.workers.dev
，GET 请求（通常指浏览器访问）时返回 HTML 页面，POST 请求时返回 JSON 格式数据。（另外：可以使用另一款 Google Drive
Connector 公共服务：https://unpkg.net ，无需任何开发、一键连接谷歌云盘。）

### 使用方法

1. 打开 `cloudflare-worker-for-google-drive.js` 文件；
2. 修改头部 `config` 对象中的 API 授权信息，该信息可通过 rclone 工具获取；
3. 全选复制粘贴到 cloudflare workers 编辑器中；
4. Save & Run.

## cloudflare-worker-for-tencent-cos

代理 Tecent COS 数据。示例：https://cos.force.workers.dev/lib/que.js

## cloudflare-worker-for-thirdparty-apis

用于代理 www.googleapis.com 和 api.github.com，示例：https://apis.force.workers.dev

## cloudflare-worker-for-google-usercontent

用于代理 googleusercontent 内容，直接复制粘贴到 cloudflare workers 编辑器保存，然后设置一个泛域名解析（必需），例如将
*.example.com 解析到该 worker。当需要访问 https://xxx.googleusercontent.com/yyy 时，则替代为
https://xxx.example.com/yyy
。示例：https://drive-thirdparty.spark.eu.org/64/type/application/vnd.google-apps.folder+30

## cloudflare-worker-for-github-usercontent

格式: https://gh.force.workers.dev/:user/:repo@:version/:path 示例:
https://gh.force.workers.dev/seatwork/que.js@master/que.js

## cloudflare-worker-for-mirror

简化自另一个项目：https://github.com/xiaoyang-liu-cs/booster.js
，示例：https://wiki.force.workers.dev

## cloudflare-worker-for-proxy

克隆自另一个项目：https://github.com/EtherDream/jsproxy
，示例：https://proxy.force.workers.dev
