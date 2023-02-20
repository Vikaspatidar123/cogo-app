import { Container } from './style';

function Tag({ status }) {
	return (
		<Container className={`${status} tag`}>
			<div className={`${status} point`} />
			{status}
		</Container>
	);
}

export default Tag;
