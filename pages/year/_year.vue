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

    <div class="grouped-bar">
      <div
        v-for="exp of orderedExpenses"
        :key="'grouped-bar' + exp.tag.id"
        :style="{ width: `${(exp.amount / total) * 100}%` }"
        class="group-item-container"
      >
        <Popper trigger="hover">
          <div class="popper">
            {{ exp.tag.title }}
            <br />
            <Amount
              :amount="-1 * exp.amount"
              :currency-id="$ex.defaultCurrency.id"
            >
              <div slot="testslot" slot-scope="a">
                {{ a.whole }}<span class="cents">{{ a.cents }}</span>
                {{ a.currency }}
              </div>
            </Amount>
          </div>
          <div
            slot="reference"
            class="grouped-item"
            :style="{ background: exp.tag.color || '#7773' }"
          ></div>
        </Popper>

        <div
          v-for="subExp of exp.subtags"
          :key="'grouped-bar' + subExp.tag.id"
          :style="{ width: `${(subExp.amount / exp.amount) * 100}%` }"
          class="group-item-container"
        >
          <Popper trigger="hover">
            <div class="popper">
              {{ subExp.tag.title }}
              <br />
              <Amount
                :amount="-1 * subExp.amount"
                :currency-id="$ex.defaultCurrency.id"
              >
                <div slot="testslot" slot-scope="a">
                  {{ a.whole }}<span class="cents">{{ a.cents }}</span>
                  {{ a.currency }}
                </div>
              </Amount>
            </div>
            <div
              slot="reference"
              class="grouped-item sub"
              :style="{ background: exp.tag.color || '#7773' }"
            ></div>
          </Popper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

export default {
  components: { Popper },
  async asyncData({ params, $axios, store, $ex }) {
    const resp = await $axios.get(`/api/year/${params.year}`)
    store.commit('globals/SET', ['exrates', resp.data.exrates])
    return resp.data
  },
  data() {
    return { years: [] }
  },
  computed: {
    expenses() {
      return Object.keys(this.expensesRaw).reduce((acc, tagId) => {
        const tag = this.getTag(tagId)
        const parentId = tag ? tag.parentId || tag.id : 0
        const parentTag = this.getTag(parentId)
        const amount = this.$ex.total(this.expensesRaw[tagId])

        acc[parentId] ||= { amount: 0, tag: parentTag, subtags: {} }
        acc[parentId].amount += amount
        acc[parentId].subtags[tagId] = { amount, tag }

        return acc
      }, {})
    },
    orderedExpenses() {
      return Object.values(this.expenses).sort((a, b) =>
        a.amount - b.amount > 0 ? -1 : 1
      )
    },
    total() {
      return Object.values(this.expenses).reduce(
        (acc, val) => acc + val.amount,
        0
      )
    },
  },
  mounted() {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 2010; i <= currentYear; i++) {
      years.push(i)
    }
    this.years = years
  },
  methods: {
    getTag(id) {
      return (
        this.$store.state.globals.tags[id] || {
          id: 0,
          title: 'N/A',
          parentId: null,
        }
      )
    },
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
.grouped-bar {
  width: 100%;

  div {
    display: inline-block;
  }
}
</style>

<style lang="scss">
.year-page {
  .grouped-bar {
    div.grouped-item {
      background: rgb(138, 31, 31);
      height: 3em;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid white;
      vertical-align: bottom;

      &.sub {
        height: 2em;
      }
    }
    .group-item-container:nth-child(even) .grouped-item {
      background: rgb(231, 127, 58);
    }
    .popper {
      padding: 0.6em 1em;
    }
  }
}
</style>
