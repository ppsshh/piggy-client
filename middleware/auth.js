export default async (context) => {
  const { $auth, redirect, route, store } = context

  if ($auth.loggedIn()) {
    if (['login'].includes(route.name)) {
      redirect('/')
    } else if (process.server) {
      await store.dispatch('globals/load')
    }
  } else {
    redirect('/login')
  }
}
