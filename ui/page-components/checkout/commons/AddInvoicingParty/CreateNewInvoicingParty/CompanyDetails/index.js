import { Button, Modal } from '@cogoport/components';

import useCompanyDetails from '../hooks/useCompanyDetails';
import styles from '../styles.module.css';

import getField from '@/packages/forms/Controlled';
import getWidth from '@/ui/page-components/checkout/utils/getWidth';

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
	const { handleSubmit = () => {}, fields } = companyDetailsFormProps;

	const showElements = {};

	if (tradePartyType.value !== 'paying_party') {
		showElements.verification_document = false;
	}
	return (
		<div className={styles.container}>
			<Modal.Body>
				<div className={styles.title}>Company Details</div>

				<div className={styles.layout}>
					{orgControls.map((item) => {
						const { name, span, label } = item;
						const Element = getField(item.type);

						return (
							<div key={name} className={styles.field} style={{ width: getWidth(span) }}>
								<div className={styles.lable}>{label}</div>
								<Element {...item} {...fields[name]} control={control} />
								{errors?.[name] && (
									<div className={styles.errors}>
										{errors?.[name]?.message || errors?.[name]?.type }
									</div>
								)}
							</div>
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.btn_grp}>
					{showBackButton && (
						<Button
							size="md"
							themeType="secondary"
							onClick={() => onClickBack()}
							style={{
								marginRight: '8px',
							}}
						>
							Back
						</Button>
					)}
					<Button
						size="md"
						disabled={loading}
						onClick={handleSubmit(onSubmitOfCompanyDetails)}
					>
						Proceed
					</Button>
				</div>
			</Modal.Footer>
		</div>
	);
}

export default CompanyDetails;
