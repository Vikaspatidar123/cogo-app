import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { getCompanyControls } from '../../../configurations/companyDetailsControls';
import Uploader from '../../Uploader';
import GSTproof from '../GSTproof';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useSelector } from '@/packages/store';

function CompanyDetailsForm({ getCreditRequestResponse = {} }) {
	const { profile } = useSelector((state) => state);

	const [show, setShow] = useState(false);

	const [selectedGstDetails, setSelectedGstDetails] = useState({});

	const [proofUrl, setProofUrl] = useState(
		getCreditRequestResponse?.documents?.gst_certificate?.active?.document_url
		|| selectedGstDetails?.tax_number_document_url,
	);

	const hasRequestedForCredit = !isEmpty(getCreditRequestResponse);

	const fileName = proofUrl?.split('/')?.slice(-1)?.join('');

	const companyDetailsControls =	 getCompanyControls({
		setSelectedGstDetails,
		profile,
		setShow,
		hasRequestedForCredit,
	});

	const { organization = '' } = { ...profile, ...getCreditRequestResponse };

	const {
		handleSubmit,
		control,
		setValue,
	} = useForm({
		defaultValues: {
			pan        : organization?.registration_number,
			tax_number : getCreditRequestResponse?.tax_number,
		},
	});

	useEffect(() => {
		setValue('gst_proof', fileName);
	}, [fileName, setValue]);

	return (
		<form type="submit">
			{companyDetailsControls.map((item) => {
				const Element = getField(item.type); return (
					<div className={styles.field}>
						{
							item.name !== 'gst_proof' ? (
								<div>
									<div className={styles.field_name}>{item?.label}</div>
									<Element {...item} control={control} />
								</div>
							)
								: (
									<>
										{!hasRequestedForCredit && <Element {...item} control={control} />}
										{proofUrl && (
											<GSTproof
												item={item}
												proofUrl={proofUrl}
												handleSubmit={handleSubmit}
												setProofUrl={setProofUrl}
												hasRequestedForCredit={hasRequestedForCredit}
												getCreditRequestResponse={getCreditRequestResponse}
											/>
										)}
									</>
								)
						}

					</div>
				);
			})}
			{show && (
				<Uploader
					show={show}
					setShow={setShow}
					setProofUrl={setProofUrl}
					proofUrl={proofUrl}
				/>
			)}
		</form>
	);
}

export default CompanyDetailsForm;
