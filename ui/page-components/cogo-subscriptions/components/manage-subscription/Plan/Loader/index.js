import { Placeholder } from '@cogoport/components';

import { dimensions } from '../../../../constants/dimensions';

import styles from './styles.module.css';

const widthDimension = {
	0 : '250px',
	1 : '260px',
	2 : '270px',
	3 : '200px',
};

function Loader() {
	const cardArr = [1, 2, 3, 4];
	const loaderRow = [1, 2, 3, 4, 6, 7];

	return (
		<div className={styles.container}>
			{cardArr.map((ele, index) => (
				<div style={{ width: dimensions[index][0] }} className={styles.card} height={dimensions[index][1]}>
					{loaderRow.map(() => (
						<div className={styles.loader_div} key={widthDimension[index]}>
							<Placeholder margin="10px 0px" height="30px" width={widthDimension[index]} />
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default Loader;
