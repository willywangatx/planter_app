
import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RenderedAuth from '../Authentication/RenderedAuth';
// import GetData from './GetData';

const AuthenticatedComponentWrapperFactory = (ComponentPage) => {
  const AuthenticatedComponent = ({ auth, refreshAuth, getProfile, getTimers }) => {
    useEffect(() => {
      if (!auth.isAuthenticated && !auth.didAttempt) {
        refreshAuth();
        // getProfile();
        // getTimers();
      }
    }, [])

    // const getData = () => {
    //   useEffect(() => {
    //     getProfile();
    //     getTimers();
    //   }, [auth.isAuthenticated])
    // }

    useEffect(() => {
      switch (location.pathname) {
        case '/':
          getProfile();
          getTimers();
          break;
        case '/garden':
          break;
        default:
          break;
      }
    }, [auth.isAuthenticated])


    const ComponentToRender = () => {
      if (auth.didAttempt && !auth.isAuthenticated) {
        return (<RenderedAuth />);
      }
      if (auth.didAttempt && auth.isAuthenticated) {
        return (
          <ComponentPage />
        );
      }
      return <div>loading...</div>
    }

    return (
      <>
        <ComponentToRender />
      </>
    )
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.authentication,
    };
  };

  const hoc = compose(
    connect(mapStateToProps),
    withRPCRedux('refreshAuth'),
    withRPCRedux('getProfile'),
    withRPCRedux('getTimers'),
  );

  return hoc(AuthenticatedComponent);
}

export default AuthenticatedComponentWrapperFactory


// const AuthenticatedComponentWrapperFactory = (ComponentPage) => {
//   class AuthenticatedComponentClass extends React.Component {
//     componentDidMount() {
//       const {
//         auth,
//         refreshAuth,
//       } = this.props;
//       if (!auth.isAuthenticated && !auth.didAttempt) {
//         refreshAuth();
//       }
//     }

//     render() {
//       const { auth } = this.props;

//       if (auth.didAttempt && !auth.isAuthenticated) {
//         return (<RenderedAuth />);
//       }
//       if (auth.didAttempt && auth.isAuthenticated) {
//         return (<ComponentPage />);
//       }
//       return <div>loading...</div>
//     }
//   }

//   const mapStateToProps = (state) => {
//     return {
//       auth: state.authentication,
//     };
//   };

//   const hoc = compose(
//     connect(mapStateToProps),
//     withRPCRedux('refreshAuth')
//   );

//   return hoc(AuthenticatedComponentClass);
// }

// export default AuthenticatedComponentWrapperFactory
