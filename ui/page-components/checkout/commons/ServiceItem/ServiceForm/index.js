import { Button, Modal } from '@cogoport/components';

import useAddService from '../../../hooks/useAddService';

import FormElement from './FormElement';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

function SearchResultsServiceItemForm({
	handleClose,
	service,
	summary,
	refetchResults,
	source,
	setTotalLoading = false,
}) {
	const {
		handleSubmit,
		watch,
		formState: { errors },
		reset,
		control,
	} = useForm();
	const fields = {};
	service.controls.forEach((controlItem) => {
		const field = { ...controlItem, control };
		fields[controlItem.name] = field;
	});

	const { handleAddService, loading } = useAddService(service, summary, source);
	const watchMap = {};

	service.controls?.forEach((item) => {
		const condition = { ...(item.condition || {}) };

		delete condition.services;
		Object.keys(condition).forEach((conditionRule) => {
			if (!watchMap[conditionRule]) {
				watchMap[conditionRule] = watch(conditionRule);
			}
		});
	});

	const onSubmit = async (values, e) => {
		e.preventDefault();
		setTotalLoading(true);
		await handleAddService(values);
		await refetchResults();
		setTotalLoading(false);
		handleClose(false);
	};

	const handleCloseButton = () => {
		handleClose(false);
		reset();
	};
	return (
		<div className={styles.container}>
			<Modal.Header title={`Add ${service.title}`} />
			{/* <div className={styles.title}>{`Add ${service.title}`}</div> */}

			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<div>
						{(service.controls || []).map((item) => {
							let flag = true;

							Object.keys(item.condition).forEach((condItem) => {
								if (watchMap[condItem] !== undefined) {
									if (!item.condition[condItem].includes(watchMap[condItem])) {
										flag = false;
									}
								}
							});

							if (!flag) {
								return null;
							}

							return (
								<FormElement
									key={control.name}
									errors={errors}
									field={fields[item.name]}
								/>
							);
						})}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.footer}>
						<Button size="md" themeType="tertiary" onClick={handleCloseButton}>
							Cancel
						</Button>
						<Button size="md" themeType="primary" type="submit" loading={loading}>
							Save
						</Button>
					</div>
				</Modal.Footer>
			</form>

		</div>
	);
}
export default SearchResultsServiceItemForm;
