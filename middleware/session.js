export default (context) => {
  const { $session, redirect, route } = context

  if ($session.loggedIn()) {
    if (['login'].includes(route.name)) {
      redirect('/')
    }
  } else {
    redirect('/login')
  }
}
