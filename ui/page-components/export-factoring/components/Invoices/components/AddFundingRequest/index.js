import { Button, Modal } from '@cogoport/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import FieldArray from '@/ui/page-components/export-factoring/common/FieldArray';
import { getAddFundingRequestControls } from
	'@/ui/page-components/export-factoring/configurations/getAddFundingRequestControls';
import useSubmitFundingRequestDetails from '@/ui/page-components/export-factoring/hooks/useSubmitFundingRequestDetails';

function AddFundingRequest({
	openAddFundingRequest,
	setOpenFundingRequest,
	creditRequest = {},
	refetchList,
}) {
	const {
		getBuyerDetails,
		buyersData,
		onSubmit,
		loading,
	} = useSubmitFundingRequestDetails({
		creditRequest,
		setOpenFundingRequest,
		refetchList,
	});

	const { buyer_list = [] } = buyersData || [];

	const buyerOptions = buyer_list?.map((x) => ({
		label : x?.company_name,
		value : x?.id,
	}));

	const bankDetailsOptions = creditRequest?.exporter_account_infos
		?.filter((x) => x?.approval_status === 'VERIFIED')
		.map((y) => ({
			label: (
				<div style={{ display: 'flex' }}>
					<div>
						{y?.bank_name}
						{' '}
&nbsp;
						{' '}
					</div>
					<div>
						{' '}
						(
						{y?.account_number}
						)
					</div>
				</div>
			),
			value: y?.exporter_bank_account_id,
		}));

	const fundingRequestControls = getAddFundingRequestControls({
		buyerOptions,
		creditRequest,
		bankDetailsOptions,
	});

	useEffect(() => {
		getBuyerDetails();
	}, []);

	const { control, watch, handleSubmit, formState: { errors } } = useForm();
	return (
		<Modal
			show={openAddFundingRequest}
			onClose={() => setOpenFundingRequest((pv) => !pv)}
			size="lg"
		>
			<Modal.Header
				title="Create New Request"
			/>
			<Modal.Body>
				<form className={styles.formDiv}>
					{fundingRequestControls.map((item) => {
						if (item.type === 'fieldArray') {
							return (
								<FieldArray
									{...item}
									control={control}
									name={item.name}
									error={errors?.[item.name]}
								/>
							);
						}

						const Element = getField(item?.type);
						return (
							item?.type
										&& (
											<div className={styles.field}>
												<div className={styles.field_name}>{item?.label}</div>
												<Element control={control} {...item} />
												<div className={styles.error_text}>
													{errors?.[item?.name]?.message
													|| errors?.[item?.name]?.type }
												</div>
											</div>
										)
						);
					})}
				</form>

			</Modal.Body>
			<Modal.Footer>
				<Button
					type="button"
					themeType="secondary"
					style={{ margin: '0px 10px' }}
					onClick={() => setOpenFundingRequest((pv) => !pv)}
				>
					Cancel
				</Button>
				<Button
					type="button"
					onClick={handleSubmit(onSubmit)}
					loading={loading}
					disabled={loading}
				>
					Submit
				</Button>
			</Modal.Footer>

		</Modal>
	);
}

export default AddFundingRequest;
