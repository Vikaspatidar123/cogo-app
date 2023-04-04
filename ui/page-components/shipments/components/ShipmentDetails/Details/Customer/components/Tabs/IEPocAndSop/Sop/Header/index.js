// import { Button } from '@cogoport/front/components/admin';
import { Button } from '@cogoport/components';
import { useState } from 'react';
import AddSop from '../Add';

import SopFilters from '../SopFilters';

import styles from './styles.module.css';
// import AddSop from '../Add';
// import SopFilters from '../Filters';
// import { ButtonsContainer, Line } from '../styles';

function Header({
	setFilters = () => {},
	reload = false,
	setReload = () => {},
	sops = '',
	quickAction = '',
	setQuickAction = () => {},
	trade_partners_details,
}) {
	const [sopaddForm, setSopAddForm] = useState(false);

	const isSopAddOpen = sopaddForm || quickAction === 'sop_poc' || sops?.length < 1;

	return (
		<div>
			<div className={styles.button_container}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<SopFilters
						setFilters={setFilters}
						trade_partners_details={trade_partners_details}
					/>
				</div>

				{!isSopAddOpen ? (
					<Button className="primary sm" onClick={() => setSopAddForm(true)}>
						+ Add SOP
					</Button>
				) : null}
			</div>

			<div className={styles.line} />

			{isSopAddOpen ? (
				<AddSop
					sops={sops}
					trade_partners_details={trade_partners_details}
					setSopAddForm={setSopAddForm}
					setQuickAction={setQuickAction}
					reload={reload}
					setReload={setReload}
				/>
			) : null}
		</div>
	);
}

export default Header;
