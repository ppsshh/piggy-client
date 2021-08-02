<template>
  <div>
    <h1>{{ $route.query.shop || '...' }} @ {{ $route.params.year }}</h1>

    <div class="table">
      <OperationRow
        v-for="op in expenses"
        :key="'op' + op.id"
        :op="op"
        :day="op.date"
        :on-hover="emptyMethod"
      />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios, query }) {
    const resp = await $axios.get(
      `/api/year/${params.year}/shop?shop=${query.shop || ''}`
    )
    return { expenses: resp.data }
  },
  data() {
    return { expenses: [] }
  },
  methods: {
    emptyMethod() {},
  },
}
</script>
