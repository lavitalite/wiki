<script setup>
import { onMounted } from 'vue'
import { data } from './index.data.ts'
onMounted( () => {
  // 我想读取srcDir docs下一级目录 随机生成一个路径
  const BASE_PATH = '/tech_insight'
  const randDir =  data[Math.floor(Math.random() * data.length)]
  window.location.replace(`${BASE_PATH}/${randDir}`)
})
</script>


loading....