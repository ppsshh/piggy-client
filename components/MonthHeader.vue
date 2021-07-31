<template>
  <div class="month-header">
    <NuxtLink :to="prevUrl" class="prev-month">《</NuxtLink>
    <div class="current-month">
      <Popper trigger="hover">
        <div class="popper">
          <Calendar />
        </div>
        <span slot="reference" class="title">
          {{ date.toLocaleDateString('en-US', { month: 'long' }) }}
          {{ date.getFullYear() }}
        </span>
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

  .current-month .title {
    font-size: 2em;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>

<style lang="scss">
body .popper {
  background-color: #fff;
  box-shadow: #555 0 0 100px 0;
  padding: 0;
  border-radius: 0.5em;
  border: none;

  .popper__arrow {
    border: none;
    width: 25px;
    height: 11px;
    background-color: white;
    mask-image: url('assets/icons/popover-arrow.svg');
    mask-size: 25px 11px;
  }

  &[x-placement^='bottom'] {
    margin-top: 10px;
    .popper__arrow {
      top: -10.5px;
    }
  }
  &[x-placement^='top'] {
    margin-bottom: 10px;
    .popper__arrow {
      bottom: -10.5px;
      transform: rotate(180deg);
    }
  }
}
</style>
