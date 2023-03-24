// import CargoDetails from '@cogo/business-modules/components/cargo-details';
// import Grid from '@cogoport/front/components/Grid';
// import React from 'react';

import Field from './Field';
import styles from './styles.module.css';

import CargoDetails from '@/ui/page-components/shipments/components/CargoDetails/CargoDetailPills';
// import Field from './Field';
// import { Container, Cargo } from './styles';

// const { Row } = Grid;

function CardHeader({ fields = [], showCode = false, detail = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.cargo}>
				<CargoDetails detail={detail || {}} />
			</div>

			<div className={styles.row}>
				{fields?.map((field) => {
					if (field.show === false) {
						return null;
					}

					return <Field field={field} showCode={showCode} />;
				})}
			</div>
		</div>
	);
}

export default CardHeader;
