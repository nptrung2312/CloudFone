import React, { Component } from 'react';
import './assets/scss/Login.scss';
import Validation from './LoginValidation';
import axios from 'axios';
import { withNavigate } from "./withNavigate";
import { Link } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		// Hàm tạo
		super(props);
		this.state = {
			email: "",
			password: "",
			isHidePassword: true,
			errors: "",
		};
	}
	render() {
		const bgLogin = require('./assets/images/bg-login-gif.gif');

		const handleInput = (event) => {
			const { name, value } = event.target;
			this.setState({
				[name]: value
			});
		}

		const handleShowHidePassword = () => {
			this.setState({
				isHidePassword: !this.state.isHidePassword
			})
		}

		const handleSubMit = (event) => {
			event.preventDefault();
			const { email, password } = this.state;
			const values = { email, password };
			const check = Validation(values);
			if (check.email === "" && check.password === "") {
				// let pw = hashUserPassword(values.password);
				axios.post('http://localhost:8080/api/login', values)
					.then(res => {
						if (res.data.errCode === 0) {
							let data = {
								checkUser: true,
								user: res.data.user,
							}
							sessionStorage.setItem('account', JSON.stringify(data));
							this.props.navigate('/home');
						} else {
							this.setState({
								errors: { public: 'Tài khoản hoặc mật khẩu không đúng!!!' },
							})
						}
					})
					.catch(err => console.log(err))
			} else {
				this.setState({
					errors: check,
				})
			}
		}
		return (
			<div>
				<div className='login-wrapper'>
					<div className='login-content-left'>
						<form className="login100-form validate-form" onSubmit={handleSubMit}>
							<span className="login100-form-title p-b-49">
								Đăng nhập
							</span>

							<div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
								{/* <span class="label-input100">Tài khoản</span> */}
								<input onChange={handleInput} className="input100" type="email" name="email" placeholder="Email của bạn" />
								{this.state.errors.email && <span className='text-error'>{this.state.errors.email}</span>}
								<span className="focus-input100" data-symbol="&#xf206;"></span>
							</div>

							<div className="wrap-input100 validate-input" data-validate="Password is required">
								{/* <span class="label-input100">Mật khẩu</span> */}
								<input onChange={handleInput} className="input100" type={this.state.isHidePassword ? 'password' : 'text'} name="password" placeholder="Mật khẩu của bạn" />
								{this.state.errors.password && <span className='text-error'>{this.state.errors.password}</span>}
								<span className="focus-input100" data-symbol="&#xf190;"></span>
								<span className='hidden-password' onClick={handleShowHidePassword}><i className={this.state.isHidePassword ? 'fa fa-eye' : 'fa fa-eye-slash'} aria-hidden="true"></i></span>

							</div>
							{this.state.errors.public && <span className='text-error text-error-public'>{this.state.errors.public}</span>}
							<div className="text-right p-t-8 p-b-31">
								<Link href="#">
									Quên mật khẩu?
								</Link>
							</div>

							<div className="container-login100-form-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn"></div>
									<button type='submit' className="login100-form-btn">
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
}

export default withNavigate(Login);