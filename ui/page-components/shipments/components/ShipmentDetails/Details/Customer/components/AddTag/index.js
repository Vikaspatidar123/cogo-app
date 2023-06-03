import { Button, Modal } from '@cogoport/components';

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
			<Modal.Header title="ADD TAG" />
			<form>
				<Modal.Body>
					<InputController {...controls[0]} control={control} />
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.wrapper}>
						<Button
							style={{ marginRight: '12px' }}
							onClick={() => setOpen(false)}
							size="md"
							themeType="secondary"
						>
							Cancel
						</Button>
						<Button
							size="md"
							disabled={loading}
							onClick={handleSubmit(onCreate)}
						>
							{loading ? 'Submiting...' : 'Submit'}
						</Button>
					</div>
				</Modal.Footer>
			</form>
		</div>
	);
}

export default AddTag;
