// import Cookie from 'js-cookie';

// const KEY = 'getUser';

// /**
//  * experimental check if use is already logged in. This util should be deleted once firebase is connected.
//  * @returns
//  */
// export const handleCookieUser = async (): Promise<undefined> => {
//   return new Promise((resolve, reject) => {
//     const userCookie = Cookie.get(KEY);
//     const userData: undefined = userCookie ? JSON.parse(userCookie) : undefined;

//     setTimeout(() => {
//       resolve(userData);
//       // simulate delay
//     }, 1000);
//   });
// };

// export const deleteUserCookie = () => {
//   Cookie.remove(KEY);
// };

// above code can be used as a boilerplate

export {}
