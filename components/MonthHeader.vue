<template>
  <div class="month-header">
    <NuxtLink :to="prevUrl" class="prev-month">《</NuxtLink>
    <div class="current-month">
      <Popper trigger="hover">
        <div class="popper">
          <CalendarPopup />
        </div>
        <div slot="reference" class="title">
          {{ date.toLocaleDateString('en-US', { month: 'long' }) }}
          {{ date.getFullYear() }}
        </div>
      </Popper>
    </div>

    <NuxtLink :to="nextUrl" class="next-month">》</NuxtLink>
  </div>
</template>

<script>
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

export default {
  components: { Popper },
  computed: {
    date() {
      return new Date(
        this.$route.params.year,
        Number.parseInt(this.$route.params.month) - 1
      )
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
}
</script>

<style lang="scss" scoped>
.month-header {
  display: grid;
  grid-template-columns: 8em 1fr 8em;
  text-align: center;

  .calendar {
    grid-column: 1 / span 3;
    margin-bottom: 1em;
  }

  .prev-month,
  .next-month {
    font-size: 2em;
    cursor: pointer;
    text-decoration: none;
    display: block;

    &:hover {
      background: #7772;
      border-radius: 0.2em;
    }
  }

  .current-month {
    .popper {
      margin-top: 0 !important;
    }
    .title {
      font-size: 2em;
      font-weight: bold;
      cursor: pointer;
      padding-bottom: 0.2em;
      margin-bottom: -0.2em;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
