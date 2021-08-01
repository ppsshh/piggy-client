<template>
  <div class="calendar-popup">
    <div class="years-list">
      <div
        v-for="year of years"
        :key="year"
        class="year"
        :class="{ selected: selectedYear == year }"
        @click="selectedYear = year"
      >
        {{ year }}
      </div>
    </div>

    <div class="months-list">
      <NuxtLink :to="currentMonthUrl" class="current-month-link"
        >Current month</NuxtLink
      >
      <NuxtLink
        v-for="(month, index) of months"
        :key="index"
        :to="'/month/' + selectedYear + '/' + (index + 1)"
        >{{ month }}</NuxtLink
      >
    </div>
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
    currentMonthUrl() {
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
.calendar-popup {
  display: grid;
  grid-template-columns: 5em 16em;
  font-size: 1.2em;
  height: 12em;

  .years-list {
    text-align: center;
    overflow-y: auto;
    background: #7772;
    color: #333;
    border-top-left-radius: 0.4em;
    border-bottom-left-radius: 0.4em;

    .year {
      font-size: 0.82em;
      padding: 0.8em 0;
      cursor: pointer;

      & + .year {
        border-top: 1px solid #7773;
      }

      &.selected {
        color: white !important;
        background: #ff5978 !important;
        cursor: default;
      }
      &:hover {
        background: #7773;
      }
    }
  }

  .months-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 0.6em;
    padding: 0.6em;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.3em;
      color: #333;
      text-decoration: none;
      font-size: 0.82em;

      &.current-month-link {
        grid-column: 1 / span 4;
      }
      &.nuxt-link-active {
        color: white !important;
        background: #ff5978 !important;
        cursor: default;

        font-weight: bold;
      }
      &:hover {
        background: #7773;
      }
    }
  }
}
</style>
