<template>
  <div class="grouped-bar">
    <div
      v-for="op of orderedOperations"
      :key="'grouped-bar' + op.tag.id"
      :style="{ width: `${(op.amount / total) * 100}%` }"
      class="group-item-container"
    >
      <Popper trigger="hover">
        <div class="popper">
          {{ op.tag.title }}
          <br />
          <Amount
            :amount="-1 * op.amount"
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
          :style="{ background: op.tag.color || '#7773' }"
        ></div>
      </Popper>

      <div
        v-for="subCategory of op.subtags"
        :key="'grouped-bar' + subCategory.tag.id"
        :style="{ width: `${(subCategory.amount / op.amount) * 100}%` }"
        class="group-item-container"
      >
        <Popper trigger="hover">
          <div class="popper">
            {{ subCategory.tag.title }}
            <br />
            <Amount
              :amount="-1 * subCategory.amount"
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
            :style="{ background: op.tag.color || '#7773' }"
          ></div>
        </Popper>
      </div>
    </div>
  </div>
</template>

<script>
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

export default {
  components: { Popper },
  props: {
    operations: { type: Object, required: true },
  },
  computed: {
    operationsConverted() {
      return Object.keys(this.operations).reduce((acc, tagId) => {
        const tag = this.getTag(tagId)
        const parentId = tag ? tag.parentId || tag.id : 0
        const parentTag = this.getTag(parentId)
        const amount = this.$ex.total(this.operations[tagId])

        acc[parentId] ||= { amount: 0, tag: parentTag, subtags: {} }
        acc[parentId].amount += amount
        acc[parentId].subtags[tagId] = { amount, tag }

        return acc
      }, {})
    },
    orderedOperations() {
      return Object.values(this.operationsConverted).sort((a, b) =>
        a.amount - b.amount > 0 ? -1 : 1
      )
    },
    total() {
      return Object.values(this.operationsConverted).reduce(
        (acc, val) => acc + val.amount,
        0
      )
    },
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

<style lang="scss">
.grouped-bar {
  width: 100%;

  div {
    display: inline-block;
  }

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
</style>
