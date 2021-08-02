<template>
  <div>
    <h1>{{ tag.title || 'N/A' }} @ {{ $route.params.year }}</h1>

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
    const resp = await $axios.get(`/api/year/${params.year}/tag/${query.id}`)
    return { expenses: resp.data }
  },
  data() {
    return { expenses: [] }
  },
  computed: {
    tag() {
      return this.$store.state.globals.tags[this.$route.query.id] || {}
    },
  },
  methods: {
    emptyMethod() {},
  },
}
</script>
