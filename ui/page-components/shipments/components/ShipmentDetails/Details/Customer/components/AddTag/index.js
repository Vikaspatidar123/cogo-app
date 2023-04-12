import { Button } from '@cogoport/components';
import { useState } from 'react';

import useAddTag from '../../../../hooks/useAddtag';

import styles from './styles.module.css';

import { InputController, useForm } from '@/packages/forms';

function AddTag({
	setTags = () => {},
	setOpen = () => {},
	shipment_data = {},
	tags = [],
}) {
	const { loading, onCreate } = useAddTag({
		shipment_data,
		setOpen,
		setTags,
		tags,
	});
	const controls = [
		{
			label       : 'Enter your tag',
			name        : 'tag',
			type        : 'text',
			errorName   : 'tag',
			placeholder : 'Enter tag...',
			span        : 8,
			rules       : { required: 'required' },
		},
	];

	const { handleSubmit, control } = useForm();

	return (
		<div>
			<p className={styles.heading}>ADD TAG</p>
			<form>
				<InputController {...controls[0]} control={control} />
				<div className={styles.wrapper}>
					<Button
						className="secondary md"
						style={{ marginRight: '12pxjhg' }}
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
					<Button
						className="primary md"
						disabled={loading}
						onClick={handleSubmit(onCreate)}
					>
						{loading ? 'Submiting...' : 'Submit'}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AddTag;
