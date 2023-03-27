import { Text, LoaderWrapper } from './styles';

const Loading = () => {
	return (
		<>
			<LoaderWrapper>
				<Text>Please wait while we fetch Details!!</Text>{' '}
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/loading-cargo-insurance.svg"
					alt=" loading details"
				/>
			</LoaderWrapper>
		</>
	);
};
export default Loading;
