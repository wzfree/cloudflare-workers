# Cloudflare Workers Collection

## cloudflare-worker-for-google-drive
用于创建 Google Drive 云端硬盘的索引页面，该脚本纯净轻巧，除字体以外未引用任何第三方类库。示例：https://gd.force.workers.dev

### 使用方法
1. 打开 `cloudflare-worker-for-google-drive.js` 文件；
2. 修改头部 `config` 对象中的 API 授权信息，其中 `restful` 属性含义是：为 `true` 时返回 json 格式字符串用于 api 调用；为 `false` 时返回 html 页面；
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
