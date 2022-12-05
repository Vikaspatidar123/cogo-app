import { FluidContainer } from '@cogoport/components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './index.module.css';

import { useRequest } from '@/packages/request/index';
import { addUserLoginData, addUserProfileData } from '@/packages/store/user';

function Login() {
	const dispatch = useDispatch();
	const [values, setValues] = useState({
		email    : '',
		password : '',
	});
	const [showPassword, setShowPassword] = useState(false);

	const [login, trigger] = useRequest(
		{
			url    : '/login_user',
			method : 'POST',
		},
	);
	const [profile, profileTrigger] = useRequest({ url: '/get_user_session' });

	const handleLogin = async (e) => {
		e.preventDefault();
		let testPassed = true;
		const emailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
		if (!values.email) {
			testPassed = false;
			// eslint-disable-next-line
			window.alert('Please Enter Email');
		}
		if (!emailReg.test(values.email)) {
			testPassed = false;
			// eslint-disable-next-line
			window.alert('Enter correct email');
		}
		if (values.password.length < 8) {
			testPassed = false;
			// eslint-disable-next-line
			window.alert('Enter correct Password');
		}
		if (testPassed) {
			try {
				const loginRes = await trigger(
					{
						data: {
							...values,
							auth_scope : 'organization',
							platform   : 'app',
						},
					},
				);
				console.log(loginRes, 'loginRes', login);
				if (login?.response?.status === 200) {
					dispatch(addUserLoginData(loginRes.data));
					const profileRes = await profileTrigger();

					if (profile?.response?.status === 200) {
						dispatch(addUserProfileData(profileRes.data));
						// eslint-disable-next-line
						window.location.replace('http://localhost:3000');
					}
				}
			} catch (err) {
				console.log('err', err);
			}
		}
	};

	return (
		<FluidContainer className={styles.container}>
			<div className={styles.box_container}>
				<div>
					<div className={styles.heading}> cogoport</div>
					<div className={styles.sub_heading}>ADMIN</div>
				</div>

				<div className={styles.input_container}>
					<div className={styles.input_label}>Please provide your email and password to login</div>
					<input
						type="email"
						placeholder="Enter Email"
						name="email"
						value={values.email}
						onChange={(e) => {
							setValues({
								...values,
								email: e.target.value,
							});
						}}
					/>
					<div className={styles.password_container}>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder="Enter Password"
							name="password"
							value={values.password}
							onChange={(e) => {
								setValues({
									...values,
									password: e.target.value,
								});
							}}
						/>
						<button onClick={() => { setShowPassword(!showPassword); }}>
							{showPassword ? 'HIDE' : 'SHOW'}
						</button>
					</div>

					<button className={styles.submit_button} onClick={handleLogin}>LOGIN</button>
				</div>
			</div>
		</FluidContainer>
	);
}
export default Login;
