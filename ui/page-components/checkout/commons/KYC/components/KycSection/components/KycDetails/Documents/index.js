import { Button } from '@cogoport/components';

import styles from './styles.module.css';
import useDocuments from './useDocuments';

import getField from '@/packages/forms/Controlled';

function Documents({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		control,
		handleSubmit = () => {},
		onSubmit = () => {},
		controls = [],
		formState = {},
		createChannelPartnerVerificationDocumentLoading = false,
	} = useDocuments({
		channelPartnerDetails,
		kycDetails,
		setKycDetails,
	});

	const { errors = {} } = formState;

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ color: '#333333' }}>
				We need these documents to check the legitamacy of your organization
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
				<Button
					disabled={createChannelPartnerVerificationDocumentLoading}
					onClick={handleSubmit(onSubmit)}
				>
					SAVE AND CONTINUE
				</Button>
			</div>
		</div>
	);
}

export default Documents;
