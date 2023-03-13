import { IcMStar } from '@cogoport/icons-react';

import { Ship } from '../../common/constants';

import styles from './styles.module.css';

function Description() {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<img className={styles.image} src={Ship} alt="img" />
			</div>
			<div className={styles.sub_heading}>
				<div className={styles.sub_heading_title}>Benefits of Marine Insurance!</div>
				<div className={styles.line_wrapper}>
					<div className={styles.line} />
				</div>
				<div>
					<div className={styles.list}>
						<IcMStar className={styles.star} height={20} width={20} />
						<div>
							Protects you against financial loss if your cargo is damaged or lost.
						</div>
					</div>
					<div className={styles.list}>
						<IcMStar height={20} width={20} className={styles.star} />
						<div> Efficient procedure of claims because of professional service</div>
					</div>
					<div className={styles.list}>
						<IcMStar height={20} width={20} className={styles.star} />
						<div>Your cash flow is protected from unforeseen stoppages </div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Description;
