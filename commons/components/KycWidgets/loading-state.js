import { Skeleton } from '@cogoport/front/components/admin';
import styled from '@cogoport/front/styled';

function LoadingState() {
	return (
		<Container>
			<Skeleton width="100%" height="30px" margin="12px 0px" />
			<Skeleton width="100%" height="30px" margin="12px 0px" />
			<Skeleton width="100%" height="30px" margin="12px 0px" />
			<Skeleton width="100%" height="30px" margin="12px 0px" />
			<Skeleton width="100%" height="30px" margin="12px 0px" />
			<Skeleton width="100%" height="30px" margin="12px 0px" />
		</Container>
	);
}

export default LoadingState;

const Container = styled.div`
	padding: 8px 16px 16px 16px;
	background: #ffffff;
	margin: 8px 16px 16px 16px;
	box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
	border-radius: 10px;
`;
