import { Button, Select } from '@cogoport/components';
import { useEffect } from 'react';

import styles from './styles.module.css';

import useUpdateShipment from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useUpdateShipment';

function ExistingCompany({
	role,
	compType,
	servProvId,
	listServiceRefetch = () => {},
	service_prov_ids,
	setUtilities = () => {},
	utilities,
	listShipmentTradePartners = () => {},
	onClose,
}) {
	const {
		handleExistingCompany,
		existingCompany,
		setExistingCompany,
		existingCompanyOptions,
		loading,
		existingAddresses,
		address,
		setAddress,
	} = useUpdateShipment({
		role,
		servProvId,
		listServiceRefetch,
		service_prov_ids,
		setUtilities,
		utilities,
		listShipmentTradePartners,
		compType,
	});

	useEffect(() => {
		if (utilities?.trade_party_id) {
			setExistingCompany(utilities?.trade_party_id);
		}
	}, []);

	return (
		<div className={styles.element}>
			<div className={styles.select_layout}>
				<div>
					<div className={styles.label}>Select Company</div>
					<Select
						isClearable
						placeholder="Choose Existing Company"
						style={{ marginBottom: 8 }}
						value={existingCompany}
						onChange={setExistingCompany}
						options={existingCompanyOptions}
						className="primary md"
						theme="admin"
					/>
				</div>

				{existingCompany?.length ? (
					<div style={{ marginLeft: '20px' }}>
						<div className={styles.label}>Select Address</div>

						<Select
							caret
							isClearable
							placeholder="Choose Address"
							style={{ marginBottom: 8 }}
							value={address}
							options={existingAddresses[existingCompany] || []}
							onChange={setAddress}
							className="primary md"
							theme="admin"
						/>
					</div>
				) : null}

				{existingCompany?.length && address?.length ? (
					<div style={{ marginLeft: '20px' }}>
						<div className={styles.label}>Pincode</div>
						<div className={styles.pincode_container}>{address?.split('::')?.[1]}</div>
					</div>
				) : null}
			</div>

			<div className={styles.footer}>
				<div className={styles.line} />
				<div className={styles.button_container}>
					<Button
						onClick={() => onClose()}
						themeType="secondary"
						disabled={loading}
					>
						Cancel
					</Button>
					<Button
						onClick={handleExistingCompany}
						className="primary md"
						disabled={loading}
					>
						Submit
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ExistingCompany;
