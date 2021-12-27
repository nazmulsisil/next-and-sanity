// import { CallEffect, PutEffect } from '@redux-saga/core/effects';
// import { PayloadAction } from '@reduxjs/toolkit';
// import { call } from 'redux-saga/effects';

// import { requestRemoveUser } from '../requests/user';

// HIGHLIGHT: make sure the methods that saga calls are not being called from anywhere else to avoid infinite loops.

// // for put effect PutEffect<PayloadAction<UserData>> can be used and import be like ---> import { AnyAction } from 'redux';
// type WhatYouYield =
//   | CallEffect<UserData>
//   | PutEffect<PayloadAction<UserData | undefined>>;
// type WhatYouReturn = void;

// // what you accept as a return from requestGetUser
// type WhatYouAccept = UserData;

// export function* handleGetUser(
//   action: PayloadAction<{}> // <--- {} empty object can be replaced with userCredentials required to call requestGetUser
// ): Generator<WhatYouYield, WhatYouReturn, WhatYouAccept> {
//   try {
//     const data = yield call(requestGetUser);
//     yield put(setUser({ ...data }));
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function* handleRemoveUser(): Generator<
//   // action: PayloadAction<undefined> // <--- {} empty object can be replaced with userC userCredentials required to call requestGetUser
//   CallEffect<undefined> | PutEffect<PayloadAction<undefined>>,
//   void,
//   undefined
// > {
//   try {
//     yield call(requestRemoveUser);
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error(error);
//   }
// }

// above code can be used as a boilerplate
export {}
