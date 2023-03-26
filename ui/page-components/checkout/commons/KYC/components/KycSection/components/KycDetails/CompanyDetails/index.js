import { Button } from '@cogoport/components';

import styles from './styles.module.css';
import useCompanyDetails from './useCompanyDetails';

import getField from '@/packages/forms/Controlled';

function CompanyDetails({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		control,
		controls = [],
		handleSubmit = () => {},
		onSubmit = () => {},
		loading = false,
		formState = {},
	} = useCompanyDetails({
		channelPartnerDetails,
		setKycDetails,
		kycDetails,
	});

	const { errors = {} } = formState;

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ color: '#333333' }}>
				Kindly check the details before you proceed
			</div>

			<div className={styles.layout_container}>
				<div className={styles.layout}>
					{controls.map((item) => {
						const Element = getField(item.type);
						return (
							<div className={styles.field}>
								<div className={styles.lable}>{item.label}</div>
								<Element {...item} control={control} />
								{errors && (
									<div className={styles.errors}>
										{errors[item?.name]?.message}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button disabled={loading} onClick={handleSubmit(onSubmit)}>
					SAVE AND CONTINUE
				</Button>
			</div>
		</div>
	);
}

export default CompanyDetails;
