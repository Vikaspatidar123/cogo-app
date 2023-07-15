import { Checkbox } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Uploader from '../../../common/Uploader';
import { getCompanyControls } from '../../../configurations/getCompanyBasicDetailsControls';
import GSTproof from '../../GSTproof';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function CompanyInfoForm({ getCreditRequestResponse, refetch = () => {} }) {
	const { profile } = useSelector((state) => state);
	const [iecCheck, setIecCheck] = useState(false);
	const { organization = '' } = { ...profile, ...getCreditRequestResponse };
	const [show, setShow] = useState(false);

	const [selectedGstDetails, setSelectedGstDetails] = useState({});

	const [proofUrl, setProofUrl] = useState();
	const fileName = proofUrl?.split('/')?.slice(-1)?.join('');

	const hasRequestedForCredit = !isEmpty(getCreditRequestResponse);
	const companyDetailsControls = getCompanyControls({
		setSelectedGstDetails,
		profile,
		setShow,
		hasRequestedForCredit,
		setProofUrl,
		getCreditRequestResponse,
	});

	const {
		control, watch, handleSubmit, formState: { errors }, setValue,
	} = useForm({
		defaultValues: {
			pan        : getCreditRequestResponse?.org_registration_number || organization?.registration_number,
			tax_number : getCreditRequestResponse?.tax_number,
			iec        : getCreditRequestResponse?.org_iec_number,
		},
	});
	const allFields = watch();
	const handleIec = () => {
		setIecCheck((prev) => !prev);
		if (!iecCheck) {
			setValue('iec', allFields.pan);
		} else {
			setValue('iec', '');
		}
	};
	useEffect(() => {
		setProofUrl(getCreditRequestResponse?.documents?.gst_certificate?.active?.document_url
			|| selectedGstDetails?.tax_number_document_url);
	}, [getCreditRequestResponse?.documents?.gst_certificate?.active?.document_url,
		selectedGstDetails?.tax_number_document_url]);

	useEffect(() => {
		setValue('gst_proof', fileName);
	}, [fileName, getCreditRequestResponse?.tax_number, setValue]);

	return (
		<div>
			{companyDetailsControls.map((item) => {
				const Element = getField(item?.type);
				if (item.type === 'hidden') {
					return <div style={{ display: 'none' }} />;
				}
				return (
					item?.type && (
						<div className={styles.field} key={item.name}>
							<div className={styles.field_name} style={item.style}>{item?.label}</div>
							{
								item.name === 'gst_proof' && (
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
												refetch={refetch}
												selectedGstDetails={selectedGstDetails}
											/>
										)}
									</>
								)
							}
							{item.name === 'iec'
								&& (
									<>
										<Element control={control} {...item} disabled={hasRequestedForCredit} />
										{!hasRequestedForCredit && (
											<Checkbox
												className={styles.checkboxContainer}
												label="Same As PAN"
												value={iecCheck}
												onChange={handleIec}
											/>
										)}
									</>
								)}
							{!['gst_proof', 'iec'].includes(item.name) && <Element control={control} {...item} />}
							<div className={styles.error_text}>
								{errors?.[item?.name]?.message || errors?.[item?.name]?.type }
							</div>
						</div>
					)
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
		</div>
	);
}

export default CompanyInfoForm;
