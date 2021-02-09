export default async function ({ store }) {
  if (process.server) {
    await store.dispatch('globals/load')
  }
}
