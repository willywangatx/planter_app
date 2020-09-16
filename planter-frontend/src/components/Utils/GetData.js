// import React, { useEffect } from 'react';
// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
// import { connect } from 'react-redux';
// import { compose } from 'redux';

// const GetData = ({ }) => {
//     useEffect(() => {
//         switch (location.pathname) {
//             case '/':
//                 getProfile();
//                 getTimers();
//                 // getWallet();
//                 break;
//             case '/garden':
//                 // getProfile();
//                 // getGardens();
//                 break;
//             default:
//                 break;
//         }
//     }, []);
//     return (<></>)
// }

// const mapStateToProps = (state) => {
//     return {
//     };
// };

// const hoc = compose(
//     connect(mapStateToProps),
//     withRPCRedux('getProfile'),
//     withRPCRedux('getTimers'),
// );

// export default hoc(GetData);
