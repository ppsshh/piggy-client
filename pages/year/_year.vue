<template>
  <div class="year-page">
    <div class="calendar">
      <NuxtLink
        v-for="year of years"
        :key="'year' + year"
        :to="'/year/' + year"
        >{{ year }}</NuxtLink
      >
    </div>

    <!-- <YearlyTotalGraph
      :operations="$store.state.yearly.incomes"
      :total="$store.state.yearly.incomesTotal"
      html-class="yearly-incomes-graph"
    /> -->
    <YearlyTotalGraph
      :operations="$store.state.yearly.expenses"
      :total="$store.state.yearly.expensesTotal"
      html-class="yearly-expenses-graph"
    />

    <div class="flex-content">
      <YearlyTotalTagsTable />
      <div style="width: 3em"></div>
      <YearlyTotalShopsTable />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios, store, $ex }) {
    const resp = await $axios.get(`/api/year/${params.year}`)
    store.commit('globals/SET', ['exrates', resp.data.exrates])
    store.dispatch('yearly/setIncomes', resp.data.incomes)
    store.dispatch('yearly/setExpenses', resp.data.expenses)
    store.dispatch('yearly/setShops', resp.data.shops)
    return resp.data
  },
  data() {
    return { years: [], incomes: {}, expenses: {}, exrates: {} }
  },
  created() {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 2010; i <= currentYear; i++) {
      years.push(i)
    }
    this.years = years
  },
}
</script>

<style lang="scss" scoped>
.calendar {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;

  a {
    margin: 0.4em 0.2em;
    padding: 0.2em 0.4em 0.4em 0.4em;
    border-radius: 0.3em;
    text-decoration: none;

    &.nuxt-link-active {
      background: #ff5978;
      color: white;
    }

    &:hover {
      background: #7773;
    }
  }
}
.flex-content {
  display: flex;
  justify-content: center;
}
</style>
