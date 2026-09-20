# 部署指南 / Deployment Guide

## Vercel 部署步骤

### 1. 准备工作

确保你的项目包含以下文件：
- `package.json` ✓
- `next.config.mjs` ✓
- `.gitignore` ✓
- `vercel.json` ✓

### 2. 推送到 GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 3. 在 Vercel 部署

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Import Project"
3. 选择你的 GitHub 仓库
4. 配置项目：
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `next build` (自动检测)
   - **Output Directory**: `.next` (自动检测)

### 4. 配置环境变量

在 Vercel 项目设置中添加环境变量：

```
OPENAI_API_KEY=
```

步骤：
1. 进入项目设置 (Settings)
2. 选择 "Environment Variables"
3. 添加变量：
   - **Name**: `OPENAI_API_KEY`
   - **Value**: your DeepSeek API key
   - **Environment**: Production, Preview, Development (全选)
4. 点击 "Save"

### 5. 重新部署

添加环境变量后，需要重新部署：
1. 进入 "Deployments" 选项卡
2. 点击最新部署旁边的三个点
3. 选择 "Redeploy"

## 常见问题解决

### 404 错误

如果遇到 404 错误，请检查：

1. **环境变量是否设置**
   - 确保 `OPENAI_API_KEY` 已在 Vercel 中配置

2. **构建是否成功**
   - 查看 Vercel 部署日志
   - 确认没有构建错误

3. **文件是否正确上传**
   - 检查 `.gitignore` 是否排除了重要文件
   - 确认所有页面文件都在仓库中

4. **路由是否正确**
   - 主页: `/` (app/page.tsx)
   - 音乐生成器: `/music-generator` (app/music-generator/page.tsx)
   - 歌曲生成器: `/song-generator` (app/song-generator/page.tsx)
   - 定价页: `/pricing` (app/pricing/page.tsx)
   - 登录页: `/login` (app/login/page.tsx)

### 需要提供的信息

如果问题仍然存在，请提供：

1. **Vercel 部署日志**
   - 在 Vercel 项目的 "Deployments" 中查看完整日志

2. **错误截图**
   - 404 页面的完整截图
   - 浏览器控制台的错误信息

3. **GitHub 仓库链接**
   - 确认所有文件都已推送

4. **Vercel 项目 URL**
   - 您的项目部署地址

## 本地测试

在部署前，先在本地测试：

```bash
# 安装依赖
npm install

# 创建 .env.local 文件
echo "OPENAI_API_KEY=" > .env.local

# 运行开发服务器
npm run dev

# 测试生产构建
npm run build
npm start
```

如果本地运行正常，但 Vercel 部署失败，问题很可能是环境变量配置。

## 联系支持

如需进一步帮助，请提供上述信息。
