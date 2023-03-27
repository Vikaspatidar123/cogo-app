import { Button } from '@cogoport/components';

import useDocuments from '../hooks/useDocuments';
import styles from '../styles.module.css';

import getField from '@/packages/forms/Controlled';

function AdditionalDocument({
	tradePartyType = {},
	setShowModal = () => {},
	filledDetails = {},
	setFilledDetails = () => {},
	orgResponse = {},
	setCurrentStep = () => {},
	fetchOrganizationTradeParties = () => {},
	source = '',
}) {
	const {
		onSubmit = () => {},
		loading = false,
		documentControls = [],
		documentFormProps = {},
		control,
	} = useDocuments({
		filledDetails,
		setFilledDetails,
		orgResponse,
		tradePartyType,
		setShowModal,
		fetchOrganizationTradeParties,
		source,
	});

	const {
		formState: { errors = {} },
		handleSubmit = () => {},
		watch = () => {},
	} = documentFormProps;

	const formValues = watch();

	const onClickBack = () => {
		setCurrentStep('bank_details');
		setFilledDetails({ ...filledDetails, documents: { ...formValues } });
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Documents</div>

			<div className={styles.layout}>
				{documentControls.map((item) => {
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
				<Button
					className="secondary md"
					onClick={() => onClickBack()}
					style={{
						marginRight: '8px',
					}}
					disabled={loading}
				>
					Back
				</Button>
				<Button
					className="primary md"
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
				>
					{loading ? 'Submitting...' : 'Submit'}
				</Button>
			</div>
		</div>
	);
}

export default AdditionalDocument;
