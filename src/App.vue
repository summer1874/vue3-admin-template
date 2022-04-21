<script lang="ts" setup>
import TestVue from '@/components/Test.vue'
const handleClick = (): void => {
  // antMessage.info(123)
  // antNotification.open({
  //   message: 'Notification Title',
  //   description:
  //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  //   onClick: () => {
  //     console.log('Notification Clicked!')
  //   }
  // })
}
</script>

<template>
  <TestVue />
  <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
    <a-breadcrumb-item>An Application</a-breadcrumb-item>
  </a-breadcrumb>
  <a-button ref="name" @click="handleClick"> 123 </a-button>
  <a-button type="primary"> Primary Button </a-button>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
