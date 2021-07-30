<template>
  <div>
    <select v-model="selectedYear">
      <option v-for="year of years" :key="year" :value="year">
        {{ year }}
      </option>
    </select>

    <NuxtLink
      v-for="(month, index) of months"
      :key="index"
      :to="'/month/' + selectedYear + '/' + (index + 1)"
      >{{ month }}</NuxtLink
    >
    | <NuxtLink :to="currentUrl">Current Month</NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      years: [],
      selectedYear: null,
    }
  },
  computed: {
    currentUrl() {
      const d = new Date()
      return `/month/${d.getFullYear()}/${d.getMonth() + 1}`
    },
  },
  mounted() {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 2010; i <= currentYear; i++) {
      years.push(i)
    }
    this.years = years
    this.selectedYear = this.$route.params.year || currentYear
  },
}
</script>

<style lang="scss" scoped>
a {
  padding: 0 0.2em 0.2em 0.2em;

  &.nuxt-link-active {
    color: inherit;
    background: #7775;
    border-radius: 0.3em;
    opacity: 0.7;
    text-decoration: none;
  }
}
</style>
