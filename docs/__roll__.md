<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onMounted(async () => {
  const response = await fetch('/api/roll')
  const { redirectPath } = await response.json()
  router.go(redirectPath)
})
</script>

# Redirecting...