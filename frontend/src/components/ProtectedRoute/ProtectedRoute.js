import { Navigate } from 'react-router-dom'
//НОС проверяем авторизацию
const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace/>
  )
}

export default ProtectedRouteElement
