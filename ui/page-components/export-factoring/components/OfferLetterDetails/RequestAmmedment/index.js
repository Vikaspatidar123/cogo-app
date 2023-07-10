import { Modal, Button } from '@cogoport/components';
import React from 'react';
import { useForm } from 'react-hook-form';

import { getAmmedmentControls } from '../../../configurations/getAmmedmentControls';
import useCreditAmmedmemtComment from '../../../hooks/useCreditAmmedmentComment';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function RequestAmmedment({
	showRequestView, setShowRequestView = () => {},
	getCreditRequestResponse = {}, refetch = () => {},
}) {
	const { control, handleSubmit, formState: { errors } } = useForm();
	const { requestAmmedment, loading } = useCreditAmmedmemtComment();

	const onSubmit = async (values) => {
		let body = values.remark;
		body = body.concat('|');
		Object.entries(values).map(([key, value]) => {
			if (value && key !== 'remark') {
				body = body.concat(` @${key}`);
				return body;
			}
			return null;
		});
		const payload = {
			body,
			comment_type    : 'offer_letter',
			credit_id       : getCreditRequestResponse.id,
			attachment_urls : [
				getCreditRequestResponse?.documents?.offer_letter?.active?.document_url,
			],
		};
		const resp = await requestAmmedment(payload);
		if (resp) {
			refetch();
		}
		console.log('val', values, payload);
	};
	return (
		<Modal size="lg" show={showRequestView} onClose={() => setShowRequestView((prev) => !prev)} closable>
			<Modal.Header title="Ammendment" />
			<Modal.Body>
				<form className={styles.form}>
					{getAmmedmentControls.map((item) => {
						const Element = getField(item.type);
						return (
							<div className={styles.field} key={item.name}>
								<div className={styles.field_name}>{item.label}</div>
								<Element control={control} {...item} />
								<div className={styles.error_text}>
									{errors?.[item?.name]?.message || errors?.[item?.name]?.type }
								</div>
							</div>
						);
					})}
				</form>
			</Modal.Body>
			<Modal.Footer>

				<Button
					style={{ marginRight: '10px' }}
					themeType="secondary"
					onClick={() => setShowRequestView((prev) => !prev)}
				>
					close

				</Button>
				<Button
					loading={loading}
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
				>
					Save

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default RequestAmmedment;
