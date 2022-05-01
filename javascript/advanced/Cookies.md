# Cookies

- 内存c 没有设置过期时间

- 硬盘c 设置了过期时间（且不为负数）

reponse 一般会返回cookies

在 Response Header 里面可以看到

Response Header → Set-Cookie → 会自动每次设置和保存在客户端上 → 每次请求也会自动给你携带

## 属性

小饼干是有过期时间的

- 具体的过期时间，比如2024年1月1日失效
- 设置秒，比如1周后过期，1个月后过期。

`http://localhost/test` 有

`http://localhost/demo` 也会自动携带

小饼干可以指定那些主机

### 缺点

- 每一次都需要放在http请求中
- 明文传输
- 大小限制 4kb
- 验证登录只能在浏览器，如果是其他iOS，Android等等还需要手动设置cookies到服务器