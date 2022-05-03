<template>
  <div
    class="memo"
    :class="isEditing ? 'edit-mode' : 'view-mode'"
    @click="memoClickHandler"
  >
    <div class="header">Memo</div>

    <div v-if="isEditing" class="edit-form">
      <textarea v-model="unsavedMemo" />
      <div class="form-buttons">
        <button @click.stop="isEditing = false">Cancel</button>
        <button @click.stop="saveClickHandler">Save</button>
      </div>
    </div>
    <div v-else class="memo-text">
      <pre>{{ persistedMemo }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
      persistedMemo: this.$store.state.globals.memo,
      unsavedMemo: null,
    }
  },
  methods: {
    memoClickHandler() {
      if (!this.isEditing) {
        this.unsavedMemo = this.persistedMemo
        this.isEditing = true
      }
    },
    async saveClickHandler() {
      try {
        await this.$axios.post('/api/memo', {
          content: this.unsavedMemo,
        })

        this.isEditing = false
        this.persistedMemo = this.unsavedMemo
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.memo {
  margin: 0.7em -1.5em -1em -1.5em;
  padding: 1em 1.5em;
  border-radius: 0.5em;

  &.view-mode {
    cursor: pointer;
  }

  &.view-mode:hover,
  &.edit-mode {
    box-shadow: #777 0 0 100px 0;
  }
}

.header {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9em;
  margin-bottom: 0.4em;
}

.edit-form {
  textarea {
    width: 100%;
    height: 15em;
    box-sizing: border-box;
    resize: vertical;
    font-family: monospace;
  }

  .form-buttons {
    margin-top: 0.6em;
    display: flex;
    justify-content: space-between;

    button {
      min-width: 5em;
    }
  }
}

.memo-text {
  pre {
    opacity: 0.7;
    white-space: pre-wrap;
  }
}
</style>
