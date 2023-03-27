import { Checkbox, Placeholder, Button } from '@cogoport/components';
import { IcMPlansExpiring, IcMCrossInCircle, IcMPlus } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Addres({
	addressdata,
	checked = [],
	setChecked = () => {},
	loading = false,
	setOrganizationAddressId = () => {},
	setshowFilters = () => {},
	insuranceType = [],
	setAddAddressModal = () => {},
	setProsporerAddress = () => {},
	setisBillingAddress = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div>Select Address</div>
				{insuranceType[0] === 'SELF' && (
					<Button
						onClick={() => {
							setshowFilters(false);
						}}
					>
						<IcMCrossInCircle />
					</Button>
				)}
				{insuranceType[0] === 'OTHER' && (
					<Button
						className="primary md text"
						onClick={() => setAddAddressModal(true)}
					>
						<IcMPlus />
					</Button>
				)}
			</div>
			{loading && (
				<div>
					{[1, 2, 3].map(() => (
						<div className={styles.card}>
							<div className={styles.section}>
								<Placeholder width="20px" />
							</div>
							<div className={styles.info_section}>
								<Placeholder />
								<div className={styles.number_section}>
									<Placeholder width="300px" />
									<Placeholder width="300px" />
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			{!loading && (
				<div className={styles.address_container}>
					{addressdata?.length === 0 && (
						<div className={styles.empty_state}>
							<IcMPlansExpiring width={100} height={100} />
							<div className={styles.text}>No Data Found</div>
						</div>
					)}
					{addressdata?.length > 0
						&& (addressdata || []).map((data) => {
							const {
								name = '', pincode = '',
								tax_number = '', organization_pocs = [], address = '',
							} = data || {};
							return (
								<div
									key={data?.id}
									role="presentation"
									onClick={() => {
										setChecked([data?.id]);
										setOrganizationAddressId(data?.id);
										setProsporerAddress(data);
										setisBillingAddress(!!data?.tax_number);
									}}
									className={styles.card}
								>
									<div className={styles.section}>
										<Checkbox
											checked={checked.includes(data?.id)}
											onChange={() => {
												setChecked([data?.id]);
												setOrganizationAddressId(data?.id);
												setProsporerAddress(data);
												setisBillingAddress(!!data?.tax_number);
											}}
											multiple={false}
										/>
									</div>
									<div className={styles.info_section}>
										<div className={styles.org_text}>{name}</div>
										<div>{`${address} - ${pincode}`}</div>
										<div className={styles.number_section}>
											{organization_pocs[0]?.mobile_country_code
												&& organization_pocs[0]?.mobile_number && (
													<div className={styles.card_text}>
														{`${organization_pocs[0]?.mobile_country_code}
														 ${organization_pocs[0]?.mobile_number}`}
													</div>
											)}
											<div className={styles.card_text}>{tax_number}</div>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			)}
		</div>
	);
}

export default Addres;
