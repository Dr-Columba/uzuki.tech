# uzuki.tech

卯月科技个人博客前端。当前仓库只包含前端页面、静态资源和生产构建产物，后端 API 位于独立仓库 `uzuki.backend`。

## 当前技术栈

- Vite
- TypeScript
- 原生 HTML/CSS/DOM 交互
- 静态资源优先部署
- 后端 API：Bun + Hono，统一走 `/api/*`

## 主要功能

- 博客首页、分类占位页、文章详情页
- 隐藏后台入口 `/admin`
- 后台文章台账、搜索、编辑、删除、排序
- Markdown 编辑器和实时预览
- 图片上传、媒体库复用、缺失图片占位
- 后台统计面板、饼图和系统信息页
- 樱花粉鼠标轨迹、页面樱花、桌宠、返回顶部等轻量动效

## 项目结构

```text
public/             静态资源
src/main.ts         前端页面渲染和交互逻辑
src/styles.css      全站样式
dist/               生产构建产物，提交后由服务器 hook 部署
```

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://127.0.0.1:5173/
```

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`。当前服务器部署 hook 会读取仓库中的 `dist/` 并发布到：

```text
/var/www/uzuki-new
```

## 部署说明

本地 Git 远端：

```text
server  VPS 裸仓库，同时配置了 GitHub pushurl
github  GitHub 仓库
```

日常发布到服务器并同步 GitHub：

```bash
git push server main
```

只同步 GitHub：

```bash
git push github main
```

## 安全注意

不要提交：

- `.env`
- 私钥
- SSH key
- 本地测试截图或临时文件

前端仓库不应包含后端数据库、上传文件、管理员密码或服务器凭据。
