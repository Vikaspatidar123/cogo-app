import GetStarted from '@/ui/page-components/get-started';

export async function getServerSideProps() {
	return {
		props: {
			head: {
				title: 'Get Started',
			},
		},
	};
}

export default GetStarted;
