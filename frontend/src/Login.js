import React from 'react';
import './assets/scss/Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faLock } from '@fortawesome/free-solid-svg-icons'

function Login(){
    const bgLogin = require('./assets/images/bg-login-gif.gif');
    return(
        <div>
            <div className='login-wrapper'>
                <div className='login-content-left'>
                <form class="login100-form validate-form">
					<span class="login100-form-title p-b-49">
						Đăng nhập
					</span>

					<div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						{/* <span class="label-input100">Tài khoản</span> */}
						<input class="input100" type="text" name="username" placeholder="Tài khoản của bạn" />
						<span class="focus-input100" data-symbol="&#xf206;"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Password is required">
						{/* <span class="label-input100">Mật khẩu</span> */}
						<input class="input100" type="password" name="pass" placeholder="Mật khẩu của bạn" />
						<span class="focus-input100" data-symbol="&#xf190;"></span>
					</div>
					
					<div class="text-right p-t-8 p-b-31">
						<a href="#">
							Quên mật khẩu?
						</a>
					</div>
					
					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn">
								Đăng nhập
							</button>
						</div>
					</div>
				</form>
                </div>
                <div className='login-content-right'>
                    <img src={bgLogin} className='bg-image' />
                </div>
            </div>
        </div>
    )
}

export default Login;