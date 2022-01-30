import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications'
import { signUp } from '../../my_store/actions/thunks/signin_up';
import { useRouter } from 'next/router'
import * as selectors from '../../my_store/selectors';

let checkSignFlag = false;

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_pass, setConfirmPass] = useState("");
  const router = useRouter()

  const dispatch = useDispatch();
  const signinState = useSelector(selectors.signin);
  const signinInfo = signinState.data;

  useEffect(() => {
    if (checkSignFlag && signinInfo) {
      if (signinInfo.code == 0) {
        checkSignFlag = false;
        NotificationManager.success("Sign up successfully", "");
        localStorage.setItem("token", JSON.stringify({ email: email, password: password, lastTime: (new Date()).getTime() }));
        router.push('/bank');
      } else if (signinInfo.code == 2) {
        NotificationManager.error("Email is already used.", "");
        checkSignFlag = false;
      }
    }
  }, [signinState]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (name == "") {
      NotificationManager.error('Confirm your name.');
      return;
    }
    if (email == "") {
      NotificationManager.error('Confirm your email.');
      return;
    }
    if (password != confirm_pass || password == "") {
      NotificationManager.error('Confirm your password.');
      return;
    }
    checkSignFlag = true;
    var info = {
      name: name,
      email: email,
      password: password
    }
    dispatch(signUp(info));
  }

  const handleChange = (event, type) => {
    var value = event.target.value;
    if (type == 'name') {
      setName(value);
    } else if (type == 'email') {
      setEmail(value);
    } else if (type == 'password') {
      setPassword(value);
    } else if (type == 'confirm_pass') {
      setConfirmPass(value);
    }
  }

  return (
    <>
      <div className='col-lg-6 col-md-12'>
        <div className='register-form'>
          <h2>Register</h2>
          <form>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='Full Name' value={name} onChange={(e) => { handleChange(e, 'name') }} />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                placeholder='Email Address'
                value={email} onChange={(e) => { handleChange(e, 'email') }}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                value={password} onChange={(e) => { handleChange(e, 'password') }}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Confirm Password'
                value={confirm_pass} onChange={(e) => { handleChange(e, 'confirm_pass') }}
              />
            </div>
            <button type='submit' onClick={onSubmit}>Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
