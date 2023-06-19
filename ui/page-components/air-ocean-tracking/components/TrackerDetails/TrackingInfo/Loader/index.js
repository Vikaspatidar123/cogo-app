import { Placeholder } from '@cogoport/components';
import { IcMAirTracking, IcMOceanTracking } from '@cogoport/icons-react';
import Image from 'next/image';

import getLoadingArr from '../../../../utils/getLoadingArr';

import styles from './styles.module.css';

const LOADING_ARR = getLoadingArr(3);
const LOADING_ICON = {
	ocean : <IcMOceanTracking width={40} height={40} fill="#838383" />,
	air   : <IcMAirTracking width={40} height={40} fill="#838383" />,
};

function Loader({ type = 'ocean' }) {
	return (
		<div className={styles.container}>
			<div className={styles.milestone_loader}>
				{LOADING_ARR.map((ele) => (
					<div key={ele} className={styles.card}>
						<Placeholder height="35x" margin="0px 0px 20px 0px" />
						<Placeholder height="100px">
							{LOADING_ICON[type]}
						</Placeholder>
					</div>
				))}
			</div>
			<div className={styles.map_loader}>
				<Image
					src="https://cogoport-maps.s3.ap-south-1.amazonaws.com/world+(2).svg"
					width={800}
					height={500}
					alt="loading"
				/>
			</div>
		</div>
	);
}

export default Loader;
