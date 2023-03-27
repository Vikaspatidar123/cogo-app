import { Button } from '@cogoport/components';

import useCompanyDetails from '../hooks/useCompanyDetails';
import styles from '../styles.module.css';

import getField from '@/packages/forms/Controlled';

function CompanyDetails({
	filledDetails = {},
	tradePartyType = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
	showBackButton = false,
	onClickBack = () => {},
}) {
	const {
		loading,
		errors = {},
		orgControls = [],
		onSubmitOfCompanyDetails,
		companyDetailsFormProps = {},
		control,
	} = useCompanyDetails({
		filledDetails,
		setFilledDetails,
		setCurrentStep,
	});

	const { handleSubmit = () => {} } = companyDetailsFormProps;

	const showElements = {};

	if (tradePartyType.value !== 'paying_party') {
		showElements.verification_document = false;
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>Company Details</div>

			<div className={styles.layout}>
				{orgControls.map((item) => {
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

			<div className={styles.btn_grp}>
				{showBackButton && (
					<Button
						className="secondary md"
						onClick={() => onClickBack()}
						style={{
							marginRight: '8px',
						}}
					>
						Back
					</Button>
				)}
				<Button
					className="primary md"
					disabled={loading}
					onClick={handleSubmit(onSubmitOfCompanyDetails)}
				>
					Proceed
				</Button>
			</div>
		</div>
	);
}

export default CompanyDetails;
