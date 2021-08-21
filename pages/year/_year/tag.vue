<template>
  <div class="tag-page">
    <h1>{{ tag.title || 'N/A' }} @ {{ $route.params.year }}</h1>

    <OperationsTable />
  </div>
</template>

<script>
export default {
  async asyncData({ params, store, query }) {
    await store.dispatch('operations/load', {
      url: `/api/year/${params.year}/tag/${query.id}`,
      year: params.year,
      month: null,
    })
  },
  computed: {
    tag() {
      return this.$store.state.globals.tags[this.$route.query.id] || {}
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-page {
  max-width: 40em;
}
</style>
