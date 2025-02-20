以下是为您的项目编写的 README 文件示例：

```markdown
# Qwen2API

Qwen2API 是一个基于 Node.js 的 API 服务，提供聊天模型的接口以及图像上传功能。

## 目录结构

```

Qwen2API/
├── Dockerfile
├── docker-compose.yml
├── .env
├── package.json
└── src/
    ├── index.js
    └── image.js

```

## 安装与运行

### 先决条件

确保您已安装以下软件：

- [Node.js](https://nodejs.org/) (LTS 版本)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)（可选）

### 使用 Docker 运行

1. 使用 Docker 命令：
   ```bash
   docker run -d -p 3000:3000 -e --name qwen2api rfym21/qwen2api:latest
   ```

2. 使用 docker-compose 运行服务：

   ```bash
   git clone https://github.com/Rfym21/Qwen2API
   cd Qwen2API
   docker compose pull && docker compose up -d
   ```

### 本地运行

2. 下载仓库文件：

   ```bash
   git clone https://github.com/Rfym21/Qwen2API
   cd Qwen2API
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

3. 创建 `.env` 文件并设置 API 前缀：

   ```plaintext
   API_PREFIX=/api
   ```

4. 启动服务：

   ```bash
   npm start
   ```

### 复制 Hugging Face 空间

    [Qwen2API](https://huggingface.co/spaces/devme/q2waepnilm)

## API 端点

### 获取模型列表

- **请求方式**: `GET`
- **URL**: `/api/v1/models`
- **Headers**:
  - `Authorization`: 必须提供有效的授权令牌。

### 聊天完成

- **请求方式**: `POST`
- **URL**: `/api/v1/chat/completions`
- **Headers**:
  - `Authorization`: 必须提供有效的授权令牌。
- **请求体**:

  ```json
  {
    "model": "模型名称",
    "messages": [
      {
        "role": "user",
        "content": "用户消息"
      }
    ],
    "stream": false
  }
  ```

### 上传图像

在发送聊天消息时，如果消息包含图像，API 会自动处理图像上传。

## 依赖

- `axios`: 用于发送 HTTP 请求。
- `body-parser`: 解析请求体。
- `dotenv`: 加载环境变量。
- `express`: Web 框架。
- `form-data`: 处理表单数据。
- `uuid`: 生成唯一标识符。
