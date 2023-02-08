import { Signup } from '@/ui/page-components/authentication';

export async function getServerSideProps() {
	return {
		props: {
			head: {
				title: 'SignUp',
			},
		},
	};
}

export default Signup;
