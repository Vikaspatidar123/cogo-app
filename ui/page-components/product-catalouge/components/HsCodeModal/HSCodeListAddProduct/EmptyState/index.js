import EmptyIcon from '../../../../assets/ic-empty-non-funded.svg';
import { Container } from './styles';

const EmptyState = () => {
	return (
		<Container>
			<div>
				<EmptyIcon width="150px" height="150px" />
				<div className="text">No Data Found</div>
			</div>
		</Container>
	);
};

export default EmptyState;
