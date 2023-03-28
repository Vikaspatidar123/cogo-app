import { Skeleton } from '@cogoport/front/components/admin';

import { GrayLine } from '../AddLineItems/styles';

import { Container, DetailCon, Details, BtnCon } from './styles';

const array = new Array(2).fill(0);

function Loader() {
	return (
		<Container>
			{array.map(() => (
				<DetailCon>
					<Skeleton height="20px" width="200px" />

					<Details>
						<Skeleton height="30px" width="150px" />
						<Skeleton height="30px" width="150px" />
						<Skeleton height="30px" width="150px" />
						<Skeleton height="30px" width="150px" />
						<Skeleton height="30px" width="150px" />
					</Details>
					<GrayLine />
					<BtnCon>
						<Skeleton height="30px" width="100px" />
					</BtnCon>
				</DetailCon>
			))}
		</Container>
	);
}

export default Loader;
