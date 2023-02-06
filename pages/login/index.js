// eslint-disable-next-line import/no-unresolved
import login from '@/ui/page-components/authentication/login';

export async function getServerSideProps() {
	return {
		props: {
			head: {
				title: 'Login',
			},
		},
	};
}

export default login;
