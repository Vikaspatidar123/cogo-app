import { Skeleton } from '@cogoport/front/components/admin';
import { Container } from './styles';

function LoadingState() {
	return (
		<Container>
			<Skeleton width="15%" height="20px" margin="12px 0 0" />
			<Skeleton width="100%" height="48px" margin="24px 0 0 0" />
			<Skeleton width="100%" height="48px" margin="24px 0 0 0" />
			<Skeleton width="100%" height="48px" margin="24px 0 0 0" />
			<Skeleton width="100%" height="48px" margin="24px 0 0 0" />
			<Skeleton width="100%" height="48px" margin="24px 0 0 0" />
		</Container>
	);
}

export default LoadingState;
