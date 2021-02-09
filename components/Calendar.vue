<template>
  <div>
    <NuxtLink :to="prevUrl">«</NuxtLink>
    <NuxtLink :to="currentUrl">✱</NuxtLink>
    <NuxtLink :to="nextUrl">»</NuxtLink>

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
    nextUrl() {
      let year = Number.parseInt(this.$route.params.year)
      let month = Number.parseInt(this.$route.params.month) + 1
      if (month > 12) {
        month = 1
        year += 1
      }
      return `/month/${year}/${month}`
    },
    prevUrl() {
      let year = Number.parseInt(this.$route.params.year)
      let month = Number.parseInt(this.$route.params.month) - 1
      if (month === 0) {
        month = 12
        year -= 1
      }
      return `/month/${year}/${month}`
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
    background: orange;
  }
}
</style>
