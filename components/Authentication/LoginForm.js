import React, { useEffect, useState } from 'react';
import { signIn } from '../../my_store/actions/thunks/signin_up';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../../my_store/selectors';
import { useRouter } from 'next/router'
import { NotificationManager } from 'react-notifications'


const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState();
  const dispatch = useDispatch();
  const signinState = useSelector(selectors.signin);
  const router = useRouter()

  useEffect(() => {
    var remember_option =localStorage.getItem("piggy_remember");
    if (remember_option) {
      remember_option = JSON.parse(remember_option);
      console.log("remember option", remember_option);
      setRemember(true);
      setPassword(remember_option.pass);
      setEmail(remember_option.email);
    } else {
      setRemember(false);
    }
  }, []);


  const onSignin = (e) => {
    e.preventDefault();
    if (email === "") {
      NotificationManager.error("", "Please confirm your email");
      return;
    }
    if (password === "") {
      NotificationManager.error("", "Please confirm your password");
      return;
    }
    if (remember) {
      localStorage.setItem("piggy_remember", JSON.stringify({email: email, pass: password}));
    } else {
      localStorage.removeItem("piggy_remember");
    }
    dispatch(signIn(email, password));
  }

  useEffect(() => {
    if (signinState.data) {
      if (signinState.data.code == 0) {
        localStorage.setItem("token", JSON.stringify({ email: email, password: password, lastTime: (new Date()).getTime() }));
        router.push('/bank');
      } else if (signinState.data.code == 1) {
        NotificationManager.error("", "This user has not registered!");
      } else if (signinState.data.code == 2) {
        NotificationManager.error("", "Wrong Password!");
      }
    }
  }, [signinState])

  const handleInputChange = (event, type) => {
    if (type === 0) {
      setEmail(event.target.value);
    } else if (type === 1) {
      setPassword(event.target.value);
    }
  }

  const handleRemember = (event) => {
    setRemember(!remember);
  }

  return (
    <>
      <div className='col-lg-6 col-md-12'>
        <div className='login-form'>
          <h2>Login</h2>
          <form>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='email'
                value={email} onChange={(event) => { handleInputChange(event, 0) }}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                value={password} onChange={(event) => { handleInputChange(event, 1) }}
              />
            </div>
            <div className='row align-items-center'>
              <div className='col-lg-6 col-md-6 col-sm-6 remember-me-wrap'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    value=''
                    checked={remember}
                    id='rememberMe'
                    onChange={(e) => { handleRemember(e) }}
                  />
                  <label className='form-check-label' htmlFor='rememberMe'>
                    Remember me
                  </label>
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap'>
                <a href='#' className='lost-your-password'>
                  {/* Lost your password? */}
                </a>
              </div>
            </div>
            <button type='submit' onClick={onSignin}>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
