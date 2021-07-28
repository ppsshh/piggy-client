<template>
  <div class="month-page">
    <div>
      <Calendar />
      <h3>Add new:</h3>
      <OperationForm />
    </div>

    <div>
      <div v-for="(amount, cur) of total" :key="cur" class="total-block">
        <Amount
          :amount="amount"
          :currency-id="Number.parseInt(cur)"
          :color="false"
        >
          <template slot="testslot" slot-scope="a">
            {{ a.currency }}<br />
            {{ a.negativity }}{{ a.whole
            }}<span class="cents">{{ a.cents }}</span>
          </template>
        </Amount>
      </div>

      <h1>
        {{ date.toLocaleDateString('en-US', { month: 'long' }) }}
        {{ date.getFullYear() }}
      </h1>
      <div class="table" @mouseleave="hoveredTag = null">
        <template v-for="day in days">
          <template v-for="(op, index) in orderedOperations[day]">
            <OperationRow
              :key="'row' + op.id"
              :op="op"
              :day="index === 0 ? monthShort + ' ' + day.split('-')[2] : ''"
              :highlighted="hoveredTag === op.tag_id"
              :on-hover="hoverTag"
              @open="openForm"
            />
            <div
              v-if="formId === op.id"
              :key="'form' + op.id"
              class="row form-row"
            >
              <div />
              <div />
              <div>
                <OperationForm
                  :payload="Object.assign({}, op)"
                  @saved="formSaved"
                ></OperationForm>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios, store }) {
    const resp = await $axios.get(`/api/month/${params.year}/${params.month}`)
    for (const record of resp.data.operations) {
      record.tag = store.state.globals.tags[record.tag_id]
    }
    return resp.data
  },
  data() {
    return {
      operations: [],
      total: [],
      hoveredTag: null,
      formId: null,
    }
  },
  computed: {
    days() {
      return Object.keys(this.orderedOperations).sort().reverse()
    },
    date() {
      return new Date(
        this.$route.params.year,
        Number.parseInt(this.$route.params.month) - 1
      )
    },
    monthShort() {
      return this.date.toLocaleDateString('en-US', { month: 'short' })
    },
    orderedOperations() {
      return this.operations.reduce((acc, op) => {
        if (!acc[op.date]) acc[op.date] = []
        acc[op.date].push(op)
        return acc
      }, {})
    },
  },
  methods: {
    hoverTag(tagId) {
      this.hoveredTag = tagId
    },
    openForm(id) {
      this.formId = id
    },
    formSaved(resp) {
      const idx = this.operations.findIndex((i) => i.id === resp.id)
      resp.tag = this.$store.state.globals.tags[resp.tag_id]
      if (idx) {
        this.$set(this.operations, idx, resp)
      } else {
        this.operations.push(resp)
      }

      this.formId = null
    },
  },
}
</script>

<style lang="scss">
.month-page {
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-column-gap: 2em;

  .total-block {
    background: #7773;
    display: inline-block;
    line-height: 1.6em;
    margin: 0.3em;
    padding: 0.3em;
    text-align: center;
  }
}

.table {
  display: table;
  max-width: 40em;

  .row,
  .form-row {
    display: table-row;

    & > div {
      display: table-cell;
    }
  }
}
</style>
