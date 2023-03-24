// import { isEmpty } from '@cogoport/front/utils';

import { isEmpty } from '@cogoport/utils';

import PredefinedTncAndPrivacyPolicy from './PredefinedTncAndPrivacyPolicy.js';
import styles from './styles.module.css';
// import PredefinedTncAndPrivacyPolicy from './PredefinedTncAndPrivacyPolicy';
// import { Container, Condition } from './styles';

function TncItem(props) {
	const { list } = props;

	if (isEmpty(list)) {
		return <PredefinedTncAndPrivacyPolicy />;
	}

	return (
		<div className={styles.container}>
			{list.map((val) => (
				<div className={styles.condition}>
					<ul>
						<li>{val}</li>
					</ul>
				</div>
			))}
		</div>
	);
}

export default TncItem;
