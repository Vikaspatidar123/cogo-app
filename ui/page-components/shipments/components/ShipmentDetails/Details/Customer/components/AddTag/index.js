// import Layout from '@cogo/bookings/commons/Layout';
// import useAddTag from '@cogo/bookings/ShipmentDetails/hooks/useAddTag';
// import { Button } from '@cogoport/front/components/admin';
// import { useFormCogo } from '@cogoport/front/hooks';
import { Button } from '@cogoport/components';
import { useState } from 'react';

import useAddTag from '../../../../hooks/useAddtag';

// import { controls } from './controls';
// import { Container, Heading, ButtonWrap } from './styles';
import styles from './styles.module.css';

import { InputController, useForm } from '@/packages/forms';

function AddTag({
	setTags = () => {},
	setOpen = () => {},
	shipment_data = {},
	tags = [],
}) {
	const [errors, setErrors] = useState({});
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

	const onError = (err) => {
		setErrors(err);
	};

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
						onClick={handleSubmit(onCreate, onError)}
					>
						{loading ? 'Submiting...' : 'Submit'}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AddTag;
