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

    <YearlyTotalGraph :operations="incomes" html-class="yearly-incomes-graph" />
    <YearlyTotalGraph
      :operations="expenses"
      html-class="yearly-expenses-graph"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios, store, $ex }) {
    const resp = await $axios.get(`/api/year/${params.year}`)
    store.commit('globals/SET', ['exrates', resp.data.exrates])
    return resp.data
  },
  data() {
    return { years: [], incomes: {}, expenses: {}, exrates: {} }
  },

  mounted() {
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
</style>
