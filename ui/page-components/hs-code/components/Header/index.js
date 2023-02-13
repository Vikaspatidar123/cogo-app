import { Toggle } from '@cogoport/components';
import { useState } from 'react';

import Filters from './Filters';
import styles from './styles.module.css';

function Header({
	refetch,
	refetchSearch,
	loading,
	resetDrillDownHandler,
	setSearchTag,
}) {
	const [labeledValue, setLabeledValue] = useState('normalSearch');
	const handleToggle = (value) => {
		setLabeledValue(value ? 'advanceSearch' : 'normalSearch');
		setSearchTag('');
	};
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.heading}>Search HS Code</div>
				<Toggle
					name="a4"
					size="md"
					disabled={false}
					onLabel="Advance Search"
					offLabel="Normal Search"
					onChange={(value) => {
						handleToggle(value.target.checked);
					}}
				/>
			</div>
			<Filters
				labeledValue={labeledValue}
				refetch={refetch}
				refetchSearch={refetchSearch}
				loading={loading}
				resetDrillDownHandler={resetDrillDownHandler}
				setSearchTag={setSearchTag}
			/>
		</div>
	);
}

export default Header;
