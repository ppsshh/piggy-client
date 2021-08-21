<template>
  <div class="shop-page">
    <h1>{{ $route.query.shop || '...' }} @ {{ $route.params.year }}</h1>

    <OperationsTable />
  </div>
</template>

<script>
export default {
  async asyncData({ params, store, query }) {
    await store.dispatch('operations/load', {
      url: `/api/year/${params.year}/shop?shop=${query.shop || ''}`,
      year: params.year,
      month: null,
    })
  },
}
</script>

<style lang="scss" scoped>
.shop-page {
  max-width: 40em;
}
</style>
