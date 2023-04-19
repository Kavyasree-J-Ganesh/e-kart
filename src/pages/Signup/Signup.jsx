import React, { useState } from "react";
import "./Signup.css";
import TextField from '@mui/material/TextField';

const emailRegex = /^[A-Za-z0-9][A-Za-z0-9+-]*[.]?[A-Za-z0-9+-]+@[A-Za-z0-9][A-Za-z0-9+-]*(.[A-Za-z0-9]+)?.[A-Za-z]{2,6}$/
const passwordRegex = /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
const firstnameRegex = /^[A-Z]{1}[a-z]{2,}$/
const mobileRegex = /^[0-9]{10}$/

const INITIAL_SIGNUP_OBJ = {
  email: "",
  password: "",
  firstname: "",
  mobile: "",
  lastname: "",
  confirmpassword: "",
  emailMobValue: ""
}

const INITIAL_VALIDITY_OBJ = {
  emailHelper: "",
  isEmailInvalid: false,
  mobileHelper: "",
  isMobileInvalid: false,
  passwordHelper: "",
  isPasswordInvalid: false,
  firstNameHelper: "",
  isFirstNameInvalid: false,
  lastNameHelper: "",
  isLastNameInvalid: false,
  confirmPasswordHelper: "",
  isConfirmPasswordInvalid: false,
  isEmailMobInvalid: false,
  emailMobHelper: ""
}

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [signupObj, setsignupObj] = useState(INITIAL_SIGNUP_OBJ)

  const [validityObj, setValidityObj] = useState(INITIAL_VALIDITY_OBJ)

  function onEmailChange(event) {
    setsignupObj((prev) => { return { ...prev, email: event.target.value } })
  }
  function onPasswordChange(event) {
    setsignupObj((prev) => { return { ...prev, password: event.target.value } })
  }
  function onfirstnameChange(event) {
    setsignupObj((prev) => { return { ...prev, firstname: event.target.value } })
  }
  function onlastnameChange(event) {
    setsignupObj((prev) => { return { ...prev, lastname: event.target.value } })
  }
  function onconfirmpasswordChange(event) {
    setsignupObj((prev) => { return { ...prev, confirmpassword: event.target.value } })
  }

  function onMobileChange(event) {
    setsignupObj((prev) => { return { ...prev, mobile: event.target.value } })
  }

  function onEmailMobChange(event) {
    setsignupObj((prev) => { return { ...prev, emailMobValue: event.target.value } })
  }

  async function onSubmit(event) {
    event.preventDefault();
    let isEmailValid = !isSignUp || emailRegex.test(signupObj.email)
    let passwordValid = !isSignUp || passwordRegex.test(signupObj.password)
    let firstnameValid = !isSignUp || firstnameRegex.test(signupObj.firstname)
    let mobileNumberValid = !isSignUp || mobileRegex.test(signupObj.mobile)
    let emailMobValidator = isSignUp || (mobileRegex.test(signupObj.emailMobValue) || emailRegex.test(signupObj.emailMobValue))

    console.log(signupObj)

    if (!isEmailValid) {
      setValidityObj(prev => { return { ...prev, isEmailInvalid: true, emailHelper: "Invalid email" } })
    } else {
      setValidityObj(prev => { return { ...prev, isEmailInvalid: false, emailHelper: "" } })
    }

    if (!passwordValid) {
      setValidityObj(prev => { return { ...prev, isPasswordInvalid: true, passwordHelper: "Invalid password" } })
    } else {
      setValidityObj(prev => { return { ...prev, isPasswordInvalid: false, passwordHelper: "" } })
    }

    if (!firstnameValid) {
      setValidityObj(prev => { return { ...prev, isFirstNameInvalid: true, firstNameHelper: "Invalid firstname" } })
    } else {
      setValidityObj(prev => { return { ...prev, isFirstNameInvalid: false, firstNameHelper: "" } })
    }

    if (!mobileNumberValid) {
      setValidityObj(prev => { return { ...prev, isMobileInvalid: true, mobileHelper: "Invalid mobile number" } })
    } else {
      setValidityObj(prev => { return { ...prev, isMobileInvalid: false, mobileHelper: "" } })
    }

    if (!emailMobValidator) {
      setValidityObj(prev => { return { ...prev, isEmailMobInvalid: true, emailMobHelper: "Enter a valid mobile number/email" } })
    } else {
      setValidityObj(prev => { return { ...prev, isEmailMobInvalid: false, emailMobHelper: "" } })
    }


    if (passwordValid && signupObj.password != signupObj.confirmpassword) {
      setValidityObj(prev => { return { ...prev, isConfirmPasswordInvalid: true, confirmPasswordHelper: "Password does not match" } })
    } else {

      setValidityObj(prev => { return { ...prev, isConfirmPasswordInvalid: false, confirmPasswordHelper: "" } })
    }


  }

  function changeMode() {
    setIsSignUp(prev => !prev)
    setsignupObj(INITIAL_SIGNUP_OBJ)
    setValidityObj(INITIAL_VALIDITY_OBJ)
  }

  return (
    <div className="signup-page">

      <div
        className="image-box"
        style={{
          backgroundImage: "url(" + Image + ")",
        }}
      >
        <h1 className="description">{isSignUp ? `Looks like you're new here!` : 'Login'}</h1>
        <p className="sub-description">{isSignUp ? 'Signup with your details to get started' : 'Get access to your Orders, Wishlist and Recommendations'}</p>
        <div className="app-logo">
          <img src="./app-logo.jpg" alt="Logo" />
        </div>
      </div>

      <div className="form">
        <form action="">
          {!isSignUp && <div class="text-box">
            <TextField
              id="outlined-basic"
              label="Enter Email/Mobile number"
              variant="outlined"
              size="small"
              value={signupObj.emailMobValue}
              error={validityObj.isEmailMobInvalid}
              helperText={validityObj.emailMobHelper}
              onChange={onEmailMobChange} />
          </div>}
          
          {isSignUp && <div class="text-box">
            <TextField
              value={signupObj.firstname}
              id="outlined-basic"
              label="First name"
              variant="outlined"
              size="small"
              error={validityObj.isFirstNameInvalid}
              helperText={validityObj.firstNameHelper}
              onChange={onfirstnameChange} />
          </div>}

          {isSignUp && <div class="text-box">
            <TextField
              value={signupObj.lastname}
              id="outlined-basic"
              label="Last name"
              variant="outlined"
              size="small"
              onChange={onlastnameChange} />
          </div>}

          {isSignUp && <div class="text-box">
            <TextField
              value={signupObj.email}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              error={validityObj.isEmailInvalid}
              helperText={validityObj.emailHelper}
              onChange={onEmailChange}
            />
          </div>}

          {isSignUp && <div class="text-box">
            <TextField
              value={signupObj.mobile}
              id="outlined-basic"
              label="Mobile Number"
              variant="outlined"
              size="small"
              error={validityObj.isMobileInvalid}
              helperText={validityObj.mobileHelper}
              onChange={onMobileChange}
            />
          </div>}

          <div class="text-box">
            <TextField
              value={signupObj.password}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
              error={validityObj.isPasswordInvalid}
              helperText={validityObj.passwordHelper}
              onChange={onPasswordChange} />
          </div>

          {isSignUp && <div class="text-box">
            <TextField
              value={signupObj.confirmpassword}
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              size="small"
              error={validityObj.isConfirmPasswordInvalid}
              helperText={validityObj.confirmPasswordHelper}


              onChange={onconfirmpasswordChange} />
          </div>}
          <div className="form_footer">
            <a className="button_primary" onClick={() => { changeMode() }}>{isSignUp ? 'Sign in instead' : 'Create Account'}</a>
            <button className="button_info" onClick={onSubmit}>Next</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SignUp