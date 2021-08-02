<template>
  <div class="shops-totals table">
    <template v-for="shop of $store.state.yearly.shops">
      <div :key="'shop' + shop.title" class="row">
        <div class="cell">
          <NuxtLink
            :to="`/year/${$route.params.year}/shop?shop=${shop.title}`"
            >{{ shop.title || '...' }}</NuxtLink
          >
        </div>
        <div class="cell">
          <Amount
            :amount="shop.amount"
            :currency-id="$ex.defaultCurrency.id"
            :color="false"
          >
            <div slot="testslot" slot-scope="a">
              {{ a.whole }}<span class="cents">{{ a.cents }}</span>
            </div>
          </Amount>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.table .row .cell {
  max-width: 15em;
}
</style>
