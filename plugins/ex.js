import Vue from 'vue'

export default (context, inject) => {
  const { store } = context

  const $ex = new Vue({
    computed: {
      defaultCurrency() {
        const cc = store.state.globals.currencies
        const d = store.state.globals.defaultCurrencyId

        return cc && d ? cc[d] : {}
      },
      exrates() {
        return store.state.globals.exrates
      },
    },
    methods: {
      from(amount, currencyId) {
        const currency = store.state.globals.currencies[currencyId]
        return this.convert(amount, currency, this.defaultCurrency)
      },
      convert(amount, c1, c2) {
        if (c1 === c2) return amount

        const rate1 = c1.title === 'USD' ? 0 : this.exrates[c1.id]
        const rate2 = c2.title === 'USD' ? 0 : this.exrates[c2.id]

        let resultAmount
        amount = amount / Math.pow(10, c1.round)

        if (c1.title !== 'USD') {
          resultAmount =
            c2.title === 'USD' ? rate1 * amount : (rate1 * amount) / rate2
        } else {
          resultAmount = amount / rate2
        }

        return Math.round(resultAmount * Math.pow(10, c2.round))
      },
    },
  })

  inject('ex', $ex)
}
