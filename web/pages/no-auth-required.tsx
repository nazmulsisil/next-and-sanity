// importing initAuth is not required since this page doesn't user authentication. It saves ~87kb transfer to the browser
// import initAuth from 'Config/firebase/auth/utils/init-auth';
// initAuth();

const Static = () => {
  return <h1>no-auth-required</h1>
}

export default Static
