
## 1. 启动服务
### 1.1. api服务使用本地Mock服务
```shell
npm start
npm run mockServer
```

### 1.2. api服务使用开发环境服务
```shell
npm run dev
```

## 2. build i18n
```shell
npm run build:i18n
```
## 3. 打包生产环境
输入项目根目录`dist`
```shell
npm run build
```

## 4. 单元测试
```shell
npm run test
npm run test:watch
```
### 4.1. jest.config.js
文件过多以后可以配置以下属性控制ut要跑的范围
```js
roots: [
  '<rootDir>/test/',
  '<rootDir>/src/'
],
```

## 5. lint
### 5.1. eslint
```shell
npm run eslint # 检查js代码规则
npm run eslint:fix # 检查js代码规则并自动修复
```
### 5.2. styleLint
```shell
npm run stylelint # 检查less代码规则
npm run stylelint:fix # 检查less代码规则并自动修复
```

## 6. git 规范
### 6.1. 分支名
* 格式：`name/ticketNumber-desc`
* eg: `jason/crm-100-login`

### 6.2. commit message 规范
* 格式: `type: ticketNumber desc`
* eg: `feat: crm-100 complete login function`
* type说明:
```shell
1. feat：新功能（feature）
2. fix：修补bug
3. refactor：重构（即不是新增功能，也不是修改bug的代码变动）
4. test：增加测试
5. chore：构建过程、辅助工具的变动、文档（documentation）
```
### 6.3. pull request
mater branch --> new branch --> codeing --> code review --> ci pass --> squash and merge

## 7. 开发注意事项
### 7.1. 站内跳转
#### 7.1.1. 命令式
通过 `history` 使用，通常在事件处理中被调用。
```jsx
import { locationServices } from '@/shared/services/location';
function goToListPage() {
  locationServices.push('/list');
}
```

#### 7.1.2. 声明式
通过 `Link` 使用，通常作为 `React` 组件使用。
```js
import { Link } from 'shared/components/RouterLink';
export default () => (
  <Link to="/list">Go to list page</Link>
);
```

### 7.2. 时间处理
`shared/intl/utils/dateUtils.js`
