import { Login } from '@/ui/page-components/authentication';

export async function getServerSideProps() {
	return {
		props: {
			head: {
				title: 'Login',
			},
		},
	};
}

export default Login;
