<script>
export default {
  middleware: [
    function ({ redirect }) {
      const today = new Date()
      redirect(`/year/${today.getFullYear()}`)
    },
  ],
}
</script>
