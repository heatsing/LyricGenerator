# AI 歌词生成器 / AI Lyrics Generator

🎵 使用 AI 技术生成原创歌词、诗歌和短篇故事的在线工具。

## 功能特性

- 🎼 **歌词生成器** - 根据流派、情绪和主题生成原创歌词（支持 18 种音乐流派）
- 📝 **诗歌生成器** - 创作各种风格的诗歌作品
- 📖 **故事生成器** - 生成创意短篇故事
- 🌍 **多语言支持** - 支持英语、中文、西班牙语等 7 种语言
- 📊 **访问统计** - Umami Analytics 集成
- 🔍 **SEO 优化** - 完整的站点地图和 robots.txt

## 支持的流派

R&B, Rock, Pop, Rap, Elementary School Songs, Folk, Jazz, K-Pop, Country, Diss Track, EDM, Reggae, Blues, Metal, Indie, Love Song, Christmas Song, Birthday Song

## 部署到 Vercel

### 第一步：配置环境变量

在 Vercel 项目中添加以下环境变量：

1. 进入 Vercel 项目设置
2. 点击 "Environment Variables"
3. 添加以下变量：

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `OPENAI_API_KEY` | DeepSeek API Key | set in Vercel / local env |
| `NEXT_PUBLIC_SITE_URL` | 网站 URL（用于站点地图）| `https://your-domain.vercel.app` |

4. 确保选择所有环境：Production, Preview, Development

> **注意**: 本项目使用 DeepSeek API（兼容 OpenAI 格式）。API key 通过 `OPENAI_API_KEY` 环境变量配置，代码会自动连接到 DeepSeek 的端点 `https://api.deepseek.com/v1`。

### 第二步：部署

```bash
# 推送代码到 GitHub
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

Vercel 会自动检测并部署你的 Next.js 应用。

### 第三步：提交到 Google Search Console

**详细步骤请参考 `GOOGLE_SEARCH_CONSOLE_SETUP.md` 文件**

快速步骤：

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加你的网站资源
3. 验证所有权（推荐 HTML 标记方式）
4. 提交站点地图：`https://your-domain.vercel.app/sitemap.xml`

站点地图会自动包含所有页面：
- 主页（歌词生成器）
- 诗歌生成器
- 故事生成器
- 18 个流派专属页面

### 第四步：验证部署

部署完成后，访问以下页面确认：
- 主页: `https://your-domain.vercel.app/`
- 诗歌生成器: `https://your-domain.vercel.app/poem-generator`
- 故事生成器: `https://your-domain.vercel.app/story-generator`
- 站点地图: `https://your-domain.vercel.app/sitemap.xml`
- Robots.txt: `https://your-domain.vercel.app/robots.txt`

## 本地开发

```bash
# 安装依赖
npm install

# 创建本地环境变量文件
cp .env.example .env.local

# 编辑 .env.local，添加所需的环境变量
# OPENAI_API_KEY 是必需的
# NEXT_PUBLIC_SITE_URL 用于本地测试站点地图（可选）

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **UI 组件**: shadcn/ui + Radix UI
- **样式**: Tailwind CSS v4
- **AI 集成**: DeepSeek API (deepseek-chat 模型)
- **分析**: Umami Analytics
- **部署**: Vercel

## SEO 优化

本项目已实现完整的 SEO 最佳实践：

✅ 所有页面都有优化的 meta 标题和描述  
✅ 关键词针对 Google 搜索优化  
✅ 自动生成 XML 站点地图 (`/sitemap.xml`)  
✅ Robots.txt 配置 (`/robots.txt`)  
✅ Open Graph 和 Twitter Card 支持  
✅ 响应式设计和移动端优化  
✅ 快速加载速度（Next.js App Router）  
✅ 语义化 HTML 标签  
✅ 结构化数据标记

## 访问统计

本项目已集成 Umami Analytics：
- 访问统计数据查看：https://cloud.umami.is/
- Website ID: `1932d792-2720-4ed8-bb65-b1c7e98517f3`

## 常见问题

### 遇到 404 错误？

如果部署后出现 404 错误，请检查：

1. ✅ 环境变量 `OPENAI_API_KEY` 是否已在 Vercel 中配置
2. ✅ 环境变量 `NEXT_PUBLIC_SITE_URL` 是否已配置（用于站点地图）
3. ✅ 所有文件是否已推送到 GitHub
4. ✅ Vercel 构建日志是否显示成功
5. ✅ 尝试重新部署：Deployments → 点击三个点 → Redeploy

### API 调用失败？

如果 AI 生成功能无法工作：

1. ✅ 确认 DeepSeek API key 有效且有额度
2. ✅ 检查 Vercel 环境变量配置正确
3. ✅ 查看 Vercel Functions 日志中的错误信息
4. ✅ 确认 API key 格式正确（以 `sk-` 开头）

### 站点地图未更新？

如果提交站点地图后 Google 未识别：

1. ✅ 确认 `NEXT_PUBLIC_SITE_URL` 环境变量正确
2. ✅ 访问 `https://your-domain.vercel.app/sitemap.xml` 确认可访问
3. ✅ 在 Google Search Console 重新提交站点地图
4. ✅ 等待 1-2 天让 Google 爬取

### 需要帮助？

请提供以下信息：
- Vercel 部署日志
- GitHub 仓库链接
- 错误截图

## 文档

- [Google Search Console 设置指南](./GOOGLE_SEARCH_CONSOLE_SETUP.md) - 完整的站点地图提交步骤

## 许可证

MIT License
