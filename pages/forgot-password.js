import ForgotPassowrd from '@/ui/page-components/forgot-password';

export async function getServerSideProps() {
	return {
		props: {
			head: {
				title: 'Forgot Password',
			},
		},
	};
}

export default ForgotPassowrd;
