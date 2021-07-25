<template>
  <div class="month-page">
    <div>
      <Calendar />
      <h3>Add new:</h3>
      <OperationForm />
      <div v-for="(amount, cur) of total" :key="cur" class="total-block">
        {{ $store.state.globals.currencies[cur].title }}
        {{ amount }}
      </div>
    </div>

    <div>
      <h1>
        {{ date.toLocaleDateString('en-US', { month: 'long' }) }}
        {{ date.getFullYear() }}
      </h1>
      <div class="table" @mouseleave="hoveredTag = null">
        <template v-for="day in days">
          <OperationRow
            v-for="(op, index) in operations[day]"
            :key="op.id"
            :op="op"
            :day="day"
            :highlighted="hoveredTag === op.tag_id"
            :display-date="index === 0"
            :on-hover="hoverTag"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const resp = await $axios.get(`/api/month/${params.year}/${params.month}`)
    return resp.data
  },
  data() {
    return {
      operations: [],
      total: [],
      hoveredTag: null,
    }
  },
  computed: {
    days() {
      return Object.keys(this.operations).sort().reverse()
    },
    date() {
      return new Date(
        this.$route.params.year,
        Number.parseInt(this.$route.params.month) - 1
      )
    },
  },
  methods: {
    hoverTag(tagId) {
      this.hoveredTag = tagId
    },
  },
}
</script>

<style lang="scss">
.month-page {
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-column-gap: 2em;
}

.table {
  display: table;
  max-width: 40em;

  .row {
    display: table-row;

    &.highlighted {
      background: orange;
    }
    .nowrap {
      white-space: nowrap;
    }
    & > div {
      display: table-cell;
      border: 1px solid white;
      padding: 0.1em 0.4em 0.2em 0.4em;

      .description {
        margin: 0;
        font-family: inherit;
        font-size: 0.68em;
        line-height: 1.8em;
        opacity: 0.5;
        white-space: pre-wrap;
        word-wrap: break-word;
      }

      .tag-image {
        height: 1em;
        width: 1em;
        filter: invert(1);
      }

      .cents {
        font-size: 0.6em;
      }
    }
  }
}
</style>
