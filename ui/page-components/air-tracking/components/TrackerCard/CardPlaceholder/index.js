import { Placeholder, FluidContainer } from '@cogoport/components';

import styles from './styles.module.css';

function CardPlaceholder() {
	return (
		<FluidContainer className={styles.container}>
			<div className={styles.loading}>
				<Placeholder height="20px" width="100%" margin="0px 0px 20px 0px" />

				<Placeholder height="20px" width="100%" margin="0px 0px 20px 0px" />

				<Placeholder height="20px" width="100%" margin="0px 0px 20px 0px" />
			</div>
		</FluidContainer>
	);
}
export default CardPlaceholder;
