# 依赖安装层
FROM node:20.19.5-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

# 构建层
FROM node:20.19.5-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# 运行层(仅带生产依赖与产物)
FROM node:20.19.5-alpine AS runner
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV NODE_ENV=production
WORKDIR /app

# 仅复制运行需要的文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
