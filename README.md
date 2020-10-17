# Cloudflare Workers Collection

## cloudflare-worker-for-google-drive
用于创建 Google Drive 云端硬盘的索引页面，此脚本轻巧纯净，除字体以外未引用任何第三方类库。示例：https://gd.force.workers.dev ，GET 请求（通常指浏览器访问）时返回 HTML 页面，POST 请求时返回 JSON 格式数据。

### 使用方法
1. 打开 `cloudflare-worker-for-google-drive.js` 文件；
2. 修改头部 `config` 对象中的 API 授权信息，该信息可通过 rclone 工具获取；
3. 全选复制粘贴到 cloudflare workers 编辑器中；
4. Save & Run. 

## cloudflare-worker-for-google-apis
示例：https://google-apis.force.workers.dev

## cloudflare-worker-for-google-usercontent
用于代理 googleusercontent 内容，直接复制粘贴到 cloudflare workers 编辑器保存，然后设置一个泛域名解析，例如将 *.example.com 解析到该 worker。当需要访问 https://xxx.googleusercontent.com/yyy 时，则替代为 https://xxx.example.com/yyy 。

## cloudflare-worker-for-github-usercontent
示例: https://github-usercontent.force.workers.dev/:user/:repo/:path

## cloudflare-worker-for-mirror
简化自另一个项目：https://github.com/xiaoyang-liu-cs/booster.js ，示例：https://wiki.force.workers.dev

## cloudflare-worker-for-proxy
克隆自另一个项目：https://github.com/EtherDream/jsproxy ，示例：https://proxy.force.workers.dev
