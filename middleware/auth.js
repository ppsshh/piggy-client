export default (context) => {
  const { $auth, redirect, route } = context

  if ($auth.loggedIn()) {
    if (['login'].includes(route.name)) {
      redirect('/')
    }
  } else {
    redirect('/login')
  }
}
