// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {refreshTokenResponse} from 'src/network/apiResponses/refreshToke';
// import sendPost from 'src/network/requests/sendPost';

// async function refreshToken() {
//     const refreshTokenStore = await AsyncStorage.getItem('refreshToken');
//     const _id = await AsyncStorage.getItem('_id');

//     const resultRefresh = await sendPost<refreshTokenResponse>(
//         '/users/refreshToken',
//         {
//             refreshToken: refreshTokenStore,
//             _id: _id,
//         },
//     );
//     return resultRefresh;
// }
// export default refreshToken;
