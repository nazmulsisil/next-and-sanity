// import type { NextApiHandler } from 'next';
// import { cookie } from 'cookie';

// export const userData = Object.freeze({
//   id: 36,
//   firstName: 'Nazmul ',
//   lastName: 'Hoque',
// });

// const userHandler: NextApiHandler = async (request, response) => {
// const {  } = JSON.parse(request.body || JSON.stringify({}));
// const {  } = request.query;

// // Set a new cookie with the name
// response.setHeader(
//   'Set-Cookie',
//   cookie.serialize('name', String(request.query.name), {
//     httpOnly: true,
//     maxAge: 60 * 60 * 24 * 7, // 1 week
//   })
// );

// // Redirect back after setting cookie
// response.statusCode = 302;
// response.setHeader('Location', request.headers.referer || '/');
// response.end();
// return;

//   // simulate IO latency
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   switch (request.method) {
//     case 'GET':
//       response.status(200).json(userData);
//       break;

//     case 'POST':
//       response.status(200).json({});
//       break;

//     default:
//       response.status(404).json({});
//       break;
//   }
// };

// export default userHandler;

// above code can be used as a boilerplate
export {}
