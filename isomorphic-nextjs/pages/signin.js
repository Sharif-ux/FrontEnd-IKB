import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { useState } from 'react';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import { Alert, Space } from 'antd';
import jwtConfig from '@iso/config/jwt.config';
import Auth0 from '../authentication/Auth0';
import FirebaseLogin from '@iso/containers/FirebaseForm/FirebaseForm';
import authActions from '../authentication/actions';
import SignInStyleWrapper from '../styled/SignIn.styles';
const { login } = authActions;
export default function SignInPage(props) {
  const [User_id, setUser_id] = useState('');
  const [Password, setPassword] = useState('');
  const [token, setToken] = useState('');

  // const handleLogin2 = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ User_id, Password }),
  //     });

  //     if (response.ok) {
  //       // Handle successful login
  //       console.log("Berhasil Login")
  //       // ...
  //     } else {
  //       // Handle login failure
  //       // ...
  //     }
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // };

  // const dispatch = useDispatch();
  // const router = useRouter();

  // const handleLogin = e => {
  //   e.preventDefault();

  //   dispatch(login(true));
  // };

  // const handleJWTLogin = () => {
  //   const { jwtLogin, history } = props;
  //   const userInfo = {
  //     username:
  //       (process.browser && document.getElementById('inputUserName').value) ||
  //       '',
  //     password:
  //       (process.browser && document.getElementById('inputPassword').value) ||
  //       '',
  //   };
  //   jwtLogin(history, userInfo);
  // };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Prepare the request payload
    const payload = {
      User_id,
      Password,
    };
  console.log(payload)
    try {
      // Send a POST request to the login API
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      // Check if the request was successful
      if (response.ok) {
        // Parse the response body
        const data = await response.json();
  
        // Check if the token is available in the response data
        if (data.hasOwnProperty('token')) {
          // Extract the token from the response data
          const { token } = data;
          <Alert
          message="Berhasil Login"
          description="Selamat datang di website Inventory Kawasan"
          type="success"
          showIcon
        />
          // Display the token in the browser console
          cookie.set('token', token, { expires: 1 });
          Router.push('/dashboard/dashboardikb');
        } else {
          alert('Token not found in response');

        }
      } else {
        // Handle authentication error
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  return (
    <>
      <Head>
        <title>SignIn</title>
      </Head>
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link href="/dashboard">
                <a>
                  <IntlMessages id="page.signInTitle" />
                </a>
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                {/* <Input
                  placeholder="User ID"
                  value={User_id}
                  onChange={(e) => setUser_id(e.target.value)}
                /> */}
                              {/* <Input
                id="inputUserName"
                size="large"
                placeholder="Username"
                defaultValue="demo@gmail.com"
              /> */}
                <Input
            type="text"
            value={User_id}
            onChange={(e) => setUser_id(e.target.value)}
          />
              </div>

              <div className="isoInputWrapper">
                {/* <Input
 placeholder="Password"
 value={Password}
 onChange={(e) => setPassword(e.target.value) } 
                /> */}
                             {/* <Input
                id="inpuPassword"
                size="large"
                type="password"
                placeholder="Password"
                defaultValue="demodemo"
              /> */}
              <Input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                >
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              {/* <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p>

              <div className="isoInputWrapper isoOtherLogin">
                <Button
                  onClick={handleLogin}
                  type="primary"
                  className="btnFacebook"
                >
                  <IntlMessages id="page.signInFacebook" />
                </Button>
                <Button
                  onClick={handleLogin}
                  type="primary"
                  className="btnGooglePlus"
                >
                  <IntlMessages id="page.signInGooglePlus" />
                </Button>

                <Button
                  onClick={() => Auth0.login(handleLogin)}
                  type="primary"
                  className="btnAuthZero"
                >
                  <IntlMessages id="page.signInAuth0" />
                </Button>

                <FirebaseLogin
                  history={router}
                  login={token => dispatch(login(token))}
                />
              </div> */}
              {/* <div className="isoCenterComponent isoHelperWrapper">
                <Link href="/forgotpassword">
                  <div className="isoForgotPass">
                    <IntlMessages id="page.signInForgotPass" />
                  </div>
                </Link>
                <Link href="/signup">
                  <a>
                    <IntlMessages id="page.signInCreateAccount" />
                  </a>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    </>
  );
}
