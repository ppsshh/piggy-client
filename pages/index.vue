<script>
export default {
  middleware: [
    function ({ redirect }) {
      const today = new Date()
      redirect(`/month/${today.getFullYear()}/${today.getMonth() + 1}`)
    },
  ],
}
</script>
