import React, { useState } from 'react';
import './assets/scss/Login.scss';
import Validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

function Login() {
	const bgLogin = require('./assets/images/bg-login-gif.gif');
	const navigate = useNavigate();

	const [values, setValues] = useState({
		email: '',
		password: ''
	});

	const [errors, setErrors] = useState({});

	const handleInput = (event) => {
		setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
	}

	const handleSubMit = (event) => {
		event.preventDefault();
		setErrors(Validation(values));
		if (errors.email === "" && errors.password === "") {
			// let pw = hashUserPassword(values.password);
			axios.post('http://localhost:8081/login', {
				email: values.email,
				password: values.password
			})
				.then(res => {
					// if (res.data === "Success") {
					// 	navigate('/home');
					// } else {
					// 	alert("Tài khoản không tồn tại!!!")
					// }
					console.log(res)
				})
				.catch(err => console.log(err))
		}
	}

	let hashUserPassword = async (password) => {
		let hashPassWord = await bcrypt.hashSync(password, salt);
		return hashPassWord;
	};

	return (
		<div>
			<div className='login-wrapper'>
				<div className='login-content-left'>
					<form class="login100-form validate-form" onSubmit={handleSubMit}>
						<span class="login100-form-title p-b-49">
							Đăng nhập
						</span>

						<div class="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
							{/* <span class="label-input100">Tài khoản</span> */}
							<input onChange={handleInput} class="input100" type="email" name="email" placeholder="Email của bạn" />
							{errors.email && <span className='text-error'>{errors.email}</span>}
							<span class="focus-input100" data-symbol="&#xf206;"></span>
						</div>

						<div class="wrap-input100 validate-input" data-validate="Password is required">
							{/* <span class="label-input100">Mật khẩu</span> */}
							<input onChange={handleInput} class="input100" type="password" name="password" placeholder="Mật khẩu của bạn" />
							{errors.password && <span className='text-error'>{errors.password}</span>}
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
								<button type='submit' class="login100-form-btn">
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