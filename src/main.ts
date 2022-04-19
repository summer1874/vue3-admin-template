import { createApp } from 'vue'
import App from './App.vue'
import { message } from 'ant-design-vue'
import { MessageInstance } from 'ant-design-vue/lib/message'
import 'ant-design-vue/es/message/style/css'

const app = createApp(App)
// globalProperties 该对象用于注册能够被应用内所有组件实例访问到的全局属性。 对 Vue 2 中 Vue.prototype 使用方式的一种替代
app.config.globalProperties.$message = message as MessageInstance
app.provide('$message', message as MessageInstance)
app.mount('#app')
