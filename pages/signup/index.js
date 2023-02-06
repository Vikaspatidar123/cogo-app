/* eslint-disable import/no-unresolved */
import signUp from '@/ui/page-components/authentication/signup';

export async function getServerSideProps() {
	return {
		props: {
			head: {
				title: 'SignUp',
			},
		},
	};
}

export default signUp;
