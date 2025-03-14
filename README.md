# Qwen2API

Qwen2API 是一个基于 Node.js 的 API 服务，提供聊天模型的接口以及图像上传功能。

---

## 配置文件

### .env 文件

```plaintext
    API_PREFIX=
    LISTEN_ADDRESS=0.0.0.0
    SERVICE_PORT=3000
    API_KEY=sk-123456
    ACCOUNT_TOKENS=
    SEARCH_INFO_MODE=table
    OUTPUT_THINK=true
```

---

- API_PREFIX: 服务路径
    > API 路径，不填则为空(<http://localhost:3000>)

    > 示例(/api) 则访问 <http://localhost:3000/api>
- LISTEN_ADDRESS: 监听地址
    > 监听地址，不填则为0.0.0.0

- SERVICE_PORT: 服务运行端口
    > 如果需要修改Docker暴露端口，请修改ports中的参数

    >示例(8080:3000) 则访问 <http://localhost:8080>
- API_KEY: 密钥
    > API 密钥 (非必填)

    > 如果需要使用多账户或使用内置账户，请填写此项
- ACCOUNT_TOKENS: 账号token
    > 账号token：多个账号使用","分隔

    > 示例：ey1...,ey2...,ey3...
- SEARCH_INFO_MODE: 搜索信息展示模式
    > 搜索信息展示模式，可选 table 或 text

    > 示例：table
- OUTPUT_THINK: 是否输出思考过程
    > 是否输出思考过程，可选 true 或 false

    > 示例：true
  >
---

## 安装与运行

### 先决条件

确保您已安装以下软件：

- [Node.js](https://nodejs.org/) (LTS 版本)
- [Docker](https://www.docker.com/)（可选）

---

### 使用 Docker 运行

1. 使用 Docker 命令：

   ```bash
   docker run -d -p 3000:3000 -e API_KEY=sk-123456 -e ACCOUNT_TOKENS=ey1...,ey2...,ey3... --name qwen2api rfym21/qwen2api:latest
   ```

2. 使用 docker-compose 运行服务：

   ```bash
   curl -o docker-compose.yml https://raw.githubusercontent.com/Rfym21/Qwen2API/refs/heads/main/docker-compose.yml
   docker compose pull && docker compose up -d
   ```

---

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

3. 创建 `.env` 文件并设置变量：

   ```plaintext
   API_PREFIX=
   LISTEN_ADDRESS=0.0.0.0
   SERVICE_PORT=3000
   API_KEY=sk-123456
   ACCOUNT_TOKENS=ey1...,ey2...,ey3...
   SEARCH_INFO_MODE=table
   OUTPUT_THINK=true
   ```

4. 启动服务：

   ```bash
   npm start
   ```

### 复制 Hugging Face 空间

- [Qwen2API](https://huggingface.co/spaces/devme/q2waepnilm)

---

## API 端点

### 获取授权令牌

- 登录 [QwenLM](https://chat.qwenlm.ai) 打开开发者调试工具获取

![aa0350d1a79c4bdf2ac55b9a374b4b777cb2b512_2_1380x760.png](https://s2.loli.net/2025/02/21/syXqpR3V5OAcDol.png)

---

### 获取模型列表

- **请求方式**: `GET`
- **URL**: `/v1/models`
- **Headers**:
  - `Authorization`: 必须提供有效的授权令牌。

---

### 聊天完成

- **请求方式**: `POST`
- **URL**: `/v1/chat/completions`
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

---

### 生成图像

- **请求方式**: `POST`
- **URL**: `/v1/images/generations`
- **Headers**:
  - `Authorization`: 必须提供有效的授权令牌。
- **请求体**:

  ```json
  {
    "model": "模型名称",
    "prompt": "用户消息",
    "n": 1,
    "size": "1024*1024"
  }
  ```

---

## 获取授权令牌

- 登录 [QwenLM](https://chat.qwenlm.ai) 打开开发者调试工具获取

![get_token.png](https://s2.loli.net/2025/02/21/syXqpR3V5OAcDol.png)

### 上传图像

在发送聊天消息时，如果消息包含图像，API 会自动处理图像上传。

### 模型启用推理或搜索

- 在模型名后添加"-search"启用搜索

  > 示例：qwen-max-latest-search

- 在模型名后添加"-thinking"启用推理

  > 示例：qwen-max-latest-thinking

- 在模型名后添加"-thinking-search"启用推理和搜索

  > 示例：qwen-max-latest-thinking-search

- 在模型名后添加"-draw"启用图像生成

  > 示例：qwen-max-latest-draw

---

## 依赖

- `axios`: 用于发送 HTTP 请求。
- `body-parser`: 解析请求体。
- `dotenv`: 加载环境变量。
- `express`: Web 框架。
- `form-data`: 处理表单数据。
- `uuid`: 生成唯一标识符。


## 常见问题

### 500报错

1. 使用 apikey 作为身份验证
> 大概率apikey不匹配，程序将传入的apikey当做account_token向qwen.ai发送请求，导致失败

2. 使用apikey且正确，只有少量号，且并发高
> 单号有并发限制，加大剂量

3. 使用apikey且正确，号池足够
> 可能是坏了，回复贴上，等待修复

4. 使用qwen.ai作为身份验证
> token已失效，token应以我ey开头的jwt

### 404报错

1. 填写了API_PREFIX
> 填写了API_PREFIX环境变量却没有使用，请求地址应该为http|https://ip地址:端口号/API_PREFIX (/v1)

2. 使用hf搭建
> 首先检查空间是否是公开的，然后检查第一项