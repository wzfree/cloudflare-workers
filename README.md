# Cloudflare Workers Collection

## cloudflare-worker-for-google-drive
用于创建 Google Drive 云端硬盘的索引页面，该脚本纯净轻巧，除字体以外未引用任何第三方内容。参考示例：https://gd.force.workers.dev

### 使用方法
1. 打开 `cloudflare-worker-for-google-drive.js` 文件；
2. 修改头部 `config` 对象中的 API 授权信息，其中 `restful` 属性含义是：为 `true` 时返回 json 格式字符串用于 api 调用；为 `false` 时返回 html 页面；
3. 全选复制粘贴到 cloudflare workers 编辑器中；
4. Save & Run.

## cloudflare-worker-for-google-usercontent
用于代理 googleusercontent 内容，直接复制粘贴到 cloudflare workers 编辑器即可。例如需要访问：https://xxx.googleusercontent.com/something ，则输入 https://your.path.workers.dev/xxx/something ；访问：https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+30 ，则输入 https://your.path.workers.dev/drive-thirdparty/16/type/application/vnd.google-apps.folder+30 。

## cloudflare-worker-for-google-apis
用于代理 googleapis 服务，直接复制粘贴到 cloudflare workers 编辑器即可。使用时将 https://www.googleapis.com 替换为 https://your.path.workers.dev 。 

## cloudflare-worker-for-mirror
源于另一个项目：https://github.com/xiaoyang-liu-cs/booster.js

## cloudflare-worker-for-proxy
源于另一个项目：https://github.com/EtherDream/jsproxy
