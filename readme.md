# VC2 Monorepo

这是一个基于 pnpm workspace 构建的 Vue 3 组件库 monorepo 项目。

## 项目结构

- `packages/vc2`: 核心组件库包
- `example`: 示例项目/文档预览
- `server`: 文档解析相关服务逻辑

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 运行示例项目

```bash
pnpm dev
# 或者
pnpm -F example dev
```

### 构建组件库

```bash
pnpm build
# 或者构建所有包
pnpm build:all
```

## Monorepo 规范

1. **依赖管理**: 公共开发依赖安装在根目录，包特定依赖安装在各自的目录。
2. **引用方式**: `example` 项目通过 `workspace:*` 协议引用 `packages/vc2`。
3. **构建流程**: 使用 Vite 进行库模式构建，支持 ES 和 CJS 格式，并自动生成类型定义。

## 发布流程

1. 更新 `packages/vc2/package.json` 中的版本号。
2. 运行构建命令：`pnpm build`。
3. 进入 `packages/vc2` 目录运行 `npm publish`。
