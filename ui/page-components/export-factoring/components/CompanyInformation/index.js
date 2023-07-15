import { Loader, Button, Toast } from '@cogoport/components';
import { format } from '@cogoport/utils';
import { useState } from 'react';

import useGetCompanyFinanceData from '../../hooks/useGetCompanyFinanceData';
import { useUpdateCredit } from '../../hooks/useUpdateCredit';

import CompanyDetails from './CompanyDetails';
import EditDetails from './EditDetails';
import styles from './styles.module.css';
import TurnoverDetails from './TurnoverDetails';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function CompanyInformation({
	getCreditRequestResponse = {},
	refetch = () => {},
}) {
	const { data, loading } = useGetCompanyFinanceData({
		id: getCreditRequestResponse?.id,
	});
	const { updateCredit, loading:updateCreditLoading } = useUpdateCredit();
	const [showEdit, setShowEdit] = useState({ show: false, type: '' });
	const [updatedValues, setUpdatedValues] = useState({});

	const getTurnOverSlab = () => {
		const { minAmount, maxAmount, minAmountUnit, maxAmountUnit, currency } = data?.turn_over_slab || {};
		if (data.turn_over_slab.max_amount === 0) {
			return updatedValues.turn_over_slab;
		}
		return {
			min_amount      : minAmount.toString(),
			max_amount      : maxAmount.toString(),
			currency,
			min_amount_unit : minAmountUnit,
			max_amount_unit : maxAmountUnit,
		};
	};

	const handleGetOfferLetter = async () => {
		const request = {
			credit_id                           : getCreditRequestResponse?.id,
			get_cogoscore                       : false,
			identity_number                     : data?.gst_number,
			export_factoring_service_attributes : {
				...updatedValues,
				status  : 'awaiting_offer_letter',
				address : {
					...updatedValues,

				},
				entity_id        : updatedValues.cin,
				get_offer_letter : true,
				turn_over_slab   : getTurnOverSlab(),
				date_of_incorporation:
				formatDate({
					date       : updatedValues.date_of_incorporation,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}),
				iec_number        : updatedValues.org_iec_number,
				tax_number        : updatedValues.gst_number,
				registration_type : updatedValues.constitution_of_business,
			},
		};
		const resp = await updateCredit(request);
		if (resp) {
			refetch();
		}

	};

	if (loading || !data) {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<CompanyDetails
				data={data}
				updatedValues={updatedValues}
				getCreditRequestResponse={getCreditRequestResponse}
				setShowEdit={setShowEdit}
			/>
			{data.turn_over_slab.max_amount === 0 && (
				<div className={styles.turn_over_container}>
					<TurnoverDetails setUpdatedValues={setUpdatedValues} />
				</div>
			)}
			<div className={styles.btn_container}>
				<Button
					onClick={handleGetOfferLetter}
					loading={updateCreditLoading}
					disabled={updateCreditLoading}
				>
					Get Offer Letter

				</Button>
			</div>

			{showEdit && (
				<EditDetails
					getCreditRequestResponse={getCreditRequestResponse}
					setShowEdit={setShowEdit}
					showEdit={showEdit}
					data={data}
					setUpdatedValues={setUpdatedValues}
					updatedValues={updatedValues}
				/>
			)}
		</div>
	);
}

export default CompanyInformation;
