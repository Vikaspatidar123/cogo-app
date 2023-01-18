import { deleteCookie } from '@/temp/cogo-cookies';

import LogoutIcon from '../icons/logoutIcon.svg';
import { A, LogoutContainer } from '../styles';

function Logout() {
	const handleClick = async (e) => {
		e.preventDefault();

		deleteCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);

		window.location.href = '/login';
	};

	return (
		<LogoutContainer>
			<LogoutIcon style={{ marginRight: 12 }} />

			<A
				as="button"
				onClick={(e) => handleClick(e)}
				style={{ color: '#ef9b9b' }}
			>
				Logout
			</A>
		</LogoutContainer>
	);
}

export default Logout;
