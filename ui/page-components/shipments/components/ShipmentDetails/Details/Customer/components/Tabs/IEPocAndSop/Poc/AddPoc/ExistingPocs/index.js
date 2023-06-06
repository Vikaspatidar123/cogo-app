import { RadioGroup, Placeholder, Button } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

import useExistingPocList from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useExistingPocList';

function ExistingPocs({
	utilities = {},
	handleClose = () => {},
	handleAddPoc = () => {},
}) {
	const [poc, setPoc] = useState();
	const { pocList, loading } = useExistingPocList({ utilities });

	const labelContent = (item) => ({
		label: (
			<div className={styles.label_container}>
				<div className={styles.poc_name}>{item?.name}</div>
				<div className={styles.poc_email}>{item?.email}</div>
				<div className={styles.poc_contact}>
					{`${item?.mobile_country_code} ${item?.mobile_number}`}
				</div>
			</div>
		),
		value: item?.id,
	});

	const customOptions = [];
	pocList?.forEach((item) => {
		customOptions.push(labelContent(item));
	});

	if (loading && customOptions.length === 0) {
		return (
			<div className={styles.load_container}>
				{Array(12)
					.fill(0)
					.map(() => (
						<Placeholder margin="8px" width="100%" />
					))}
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<RadioGroup
				options={customOptions}
				value={poc}
				onChange={(item) => setPoc(item)}
			/>
			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={handleClose}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					disabled={loading}
					onClick={() => handleAddPoc(poc, pocList)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default ExistingPocs;
