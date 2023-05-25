import { Radio } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

function SavedAddressCards({
	addressdata = [],
	setChecked = () => {},
	checked = [],
	setOrganizationAddress = () => {},
	setValues = () => {},
	setAddAddressModal = () => {},
}) {
	const handleSelectAddress = ({ item }) => {
		const {
			id = '',
			name = '',
			address = '',
			tax_number = '',
			pincode = '',
			state = '',
			city = '',
			address_type = '',
		} = item || {};
		setOrganizationAddress({
			isBillingAddress      : address_type === 'billing',
			organizationAddressId : id,
		});
		setChecked([id]);
		setValues({
			partyName      : name,
			billingAddress : address,
			gstin          : tax_number,
			billingPincode : pincode,
			billingState   : state,
			billingCity    : city,
		});
	};

	useEffect(() => {
		if (document) {
			document
				.getElementById('selected')
				?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [checked]);

	return (
		<div>
			<div className={styles.heading}>
				{!isEmpty(addressdata) && (
					<>
						<div>Select Address</div>
						<div className={styles.org_tag}>
							<div className={styles.line} />
							<div className={styles.text}>OR</div>
							<div className={styles.line} />
						</div>
					</>
				)}
				<div
					className={styles.add_address}
					role="presentation"
					onClick={() => setAddAddressModal(true)}
				>
					<IcMPlusInCircle />
					Add New Address
				</div>
			</div>
			<div className={styles.container}>
				{(addressdata || []).map((item) => (
					<div
						onClick={() => handleSelectAddress({ item })}
						key={item.id}
						id={checked.includes(item?.id) && styles.selected}
						className={styles.section_2}
						role="presentation"
					>
						<div className={styles.radio_wrapper}>
							<Radio
								checked={checked.includes(item?.id)}
								onChange={() => handleSelectAddress({ item })}
								multiple={false}
							/>
						</div>
						<div className={styles.address_section}>
							{item?.name && <div className={styles.name}>{startCase(item?.name)}</div>}
							{item?.tax_number && (
								<div>
									{item?.tax_number}
									,
								</div>
							)}
							<div className={styles.address}>
								{item?.address && (
									<div>
										{item?.address}
										,
									</div>
								)}
								{item?.city && (
									<div>
										{item?.city}
										,
									</div>
								)}
								{item?.state && (
									<div>
										{item?.state}
										,
									</div>
								)}
								{item?.pincode && (
									<div>
										{item?.pincode}
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
			{isEmpty(addressdata) && (
				<div className={styles.container_empty}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/list_emptystate.png"
						alt="empty"
						height="150px"
						width="300px"
					/>
					<div className={styles.heading_empty}>
						There are no existing addresses.Try adding one.
					</div>
				</div>
			)}
		</div>
	);
}

export default SavedAddressCards;
