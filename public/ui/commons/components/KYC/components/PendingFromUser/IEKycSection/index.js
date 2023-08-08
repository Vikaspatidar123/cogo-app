import { Button, Modal } from '@cogoport/components';

import useSubmitKyc from '../../../hooks/useSubmitKyc';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import getWidth from '@/ui/page-components/discover_rates/common/SearchForm/utils/getWidth';

function IEKycSection({ organizationData, onClose, source }) {
	const { submitKyc, loading, formHook, newControls } = useSubmitKyc({ onClose, organizationData });

	const { handleSubmit, formState:{ errors }, control } = formHook;

	const onSubmit = async (values) => {
		const body = {
			country_id                : values.country_id,
			id                        : organizationData?.id,
			preferred_languages       : values.preferred_languages,
			utility_bill_document_url : values.utility_bill_document_url,
			registration_number       : values.registration_number,
			kyc_submitted_from        : source,
		};

		submitKyc({ payload: body });
	};

	return (
		<div className={styles.layout_container}>
			<Modal.Body>
				<div className={styles.layout}>
					{newControls.map((item) => {
						const { name, type, label } = item;
						const Element = getField(type);

						return (
							<div key={name} className={styles.field} style={{ width: getWidth(item.span) }}>
								<div className={styles.lable}>{label}</div>
								<Element {...item} control={control} />
								{errors && (
									<div className={styles.errors}>
										{errors[name]?.message}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button disabled={loading} onClick={handleSubmit(onSubmit)}>
					Submit KYC
				</Button>
			</Modal.Footer>
		</div>
	);
}

export default IEKycSection;
