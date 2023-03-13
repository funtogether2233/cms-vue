# cms-vue

技术栈：
- Vue3 + TypeScript
- Element Plus

构建后台管理系统前端模板，搭建菜单栏、人员管理和部门管理页面，实现数据的增删改查。

基于菜单设计路由管理，通过接收后端访问权限数据实现动态路由挂载

二次封装 Axios 设置拦截器，定义路由守卫，配合 token 实现状态持久化

使用 hooks 抽取重复逻辑，封装搜索、内容、对话框组件，可以快速搭建管理页面