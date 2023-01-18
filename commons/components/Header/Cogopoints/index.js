import useGetCogopointsStats from '@/commons/hooks/useGetCogopointsStats';

import CogoIcon from './gold-coin.svg';

import { Container, A, Points, Heading } from './styles';

function Cogopoints() {
	const { stats } = useGetCogopointsStats();
	const { total_earned = 0 } = stats || {};
	return (
		<Container>
			<A href="/cogo-points">
				<CogoIcon id="cogo-coin-dest" width="14px" height="18px" />
				<Heading>Cogopoints: </Heading>
				<Points>{total_earned.toLocaleString('en-IN')}</Points>
			</A>
		</Container>
	);
}

export default Cogopoints;
