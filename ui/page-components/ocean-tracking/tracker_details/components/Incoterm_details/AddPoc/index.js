// import { useRequest } from '@cogo/commons/hooks';
// import { Flex, Text, Grid } from '@cogoport/front/components';
// import Modal from '@cogoport/front/components/Modal';
// import useForm from '@cogoport/front/hooks/useFormCogo';
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';

// import { useSaasState } from '../../../../../../../../common/context';
// import getField from '../../../../../../../../common/form/components';
// import Alert from '../../../../../../../../common/ui/Alert';
// import Button from '../../../../../../../../common/ui/Button';
// import FormItem from '../../../../../../../../common/ui/FormItem';
import { Toast, Modal, Button } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
// const { Row, Col } = Grid;
import getField from '@/packages/forms/Controlled';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

function AddPocs({ isOpen, handleModal, addPocToState, heading }) {
	// const [loading, setLoading] = useState(false);

	// const { general, profile } = useSaasState();
	// const { scope } = general;
	const { general, profile } = useSelector((s) => s);
	const emailValidator =		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const mobileValidator = /^[0-9]{10}$/;
	const [{ loading }, trigger] = useRequest({
		url    : 'create_saas_shipment_poc',
		method : 'post',
	}, { manual: true });

	// const createPoc = useRequest('post', false, scope)('/create_saas_shipment_poc');

	const controls = [
		{
			name  : 'name',
			label : 'NAME *',
			type  : 'text',
			value : '',
			rules : {
				required  : 'Please enter name',
				maxLength : { value: 16, message: 'Name length should be less than 16' },
			},
		},
		{
			name  : 'mobile_no',
			label : 'MOBILE NO',
			type  : 'text',
			value : '',
			rules : {
				required : 'Please enter mobile no',
				pattern  : {
					value   : mobileValidator,
					message : 'Invalid mobile number',
				},
			},
		},
		{
			name  : 'email',
			label : 'EMAIL *',
			type  : 'text',
			value : '',
			rules : {
				required : 'Please enter email',
				pattern  : {
					value   : emailValidator,
					message : 'Invalid email address',
				},
			},
		},
		{
			name  : 'company',
			label : 'COMPANY',
			type  : 'text',
			value : '',
		},
	];

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async ({ name, company, mobile_no, email }) => {
		try {
			// setLoading(true);
			let requestData = {};

			requestData = {
				name,
				company,
				mobile_no,
				email,
				organization_id        : profile.organization?.id,
				organization_branch_id : general?.query?.branch_id,
			};

			const res = await trigger({ data: requestData });

			const { hasError } = res || {};
			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);

			const { data } = res;

			addPocToState(data);
			// setLoading(false);
			handleModal();
		} catch (err) {
			const message = err?.message ?? "Couldn't add POC details. Please try again later.";
			Toast.error(message);
			// setLoading(false);
		}
	};

	return (
		<Modal
			show={isOpen}
			onClose={handleModal}
			placement="center"
		>
			<Modal.Header title="New Contact" />

			<div className={styles.Alert}>
				<IcMAlert width={10} height={10} />
				<p>
					Add new contacts for whom you want to set up alerts or status reports.
				</p>
			</div>
			<form>
				<Modal.Body>
					<div className={styles.row}>
						{controls.map((controlItem) => {
							const { type, name, label } = controlItem;
							const Element = getField(type);
							return (
								<div className={styles.col}>
									{label}
									<Element {...controlItem} control={control} />
									{errors[name]?.type === 'required'
									|| errors[name]?.type === 'pattern'
									|| errors[name]?.type === 'maxLength' ? (
										<div className={styles.message}>
											{errors[name]?.message}
										</div>
										) : null}
									{/* </FormItem> */}
								</div>
							);
						})}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button}>
						<Button
							size="lg"
							variant="ghost"
							style={{ marginRight: 8 }}
							onClick={handleModal}
						>
							CANCEL
						</Button>
						<Button
							size="lg"
							variant="secondary"
							normalCase
							disabled={loading}
							onClick={handleSubmit(onSubmit)}
						>
							Save
						</Button>
					</div>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default AddPocs;
