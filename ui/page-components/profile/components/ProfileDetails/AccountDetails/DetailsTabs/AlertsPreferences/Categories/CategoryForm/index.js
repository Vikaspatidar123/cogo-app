/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox } from '@cogoport/components';
import { useEffect, useState } from 'react';

import { CATEGORIES } from '../../../../../../../constants/index';
import useUpdatePreference from '../../hooks/useUpdatePreference';

import ReasonModal from './ReasonModal';
import styles from './styles.module.css';

function CategoryForm({
	controls,
	formData = {},
	setFormData = () => {},
	getPreferences,
	userId,
	preferences = {},
}) {
	const [filteredDataState, setFilteredDataState] = useState({});
	const [addedCategory, setAddedCategory] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const { loading, updatePreference } = useUpdatePreference({
		userId,
		getPreferences,
		setShowModal,
		isAllSelected: formData.select_all,
	});

	useEffect(() => {
		if (addedCategory.length === CATEGORIES.length) {
			setFormData((prev) => ({ ...prev, select_all: true }));
		} else {
			setFormData((prev) => ({ ...prev, select_all: false }));
		}
	}, [addedCategory]);

	const handlePush = (val) => {
		if (addedCategory.includes(val)) {
			const filteredData = addedCategory.filter((i) => i !== val);
			setAddedCategory(filteredData);
		} else {
			setAddedCategory((prev) => [...prev, val]);
		}
	};

	const handleChange = (val, name) => {
		setFormData((prev) => ({
			...prev,
			[name]: val,
		}));
		handlePush(name);
	};

	const handleSelectAll = (e) => {
		const { checked } = e.target;
		if (checked) {
			setAddedCategory(CATEGORIES);
			setFormData((prev) => ({
				...prev,
				offers_discounts                         : true,
				subscriber_special                       : true,
				new_product_service_launches_and_updates : true,
				product_service_explainers               : true,
				newsletter                               : true,
				general_news                             : true,
			}));
		} else {
			setAddedCategory([]);
			setFormData((prev) => ({
				...prev,
				offers_discounts                         : false,
				subscriber_special                       : false,
				new_product_service_launches_and_updates : false,
				product_service_explainers               : false,
				newsletter                               : false,
				general_news                             : false,
			}));
		}
	};

	const { select_all, ...rest } = formData || {};

	const restData = Object.values(rest).filter(Boolean);

	useEffect(() => {
		if (restData.length === CATEGORIES.length) {
			setAddedCategory(CATEGORIES);
		} else {
			setAddedCategory(restData);
		}
	}, [JSON?.stringify(rest)]);

	const handleModal = () => {
		setShowModal(true);
	};

	const handleSaveForm = async () => {
		const filteredData = Object.fromEntries(
			Object.entries(formData).filter(([key, value]) => {
				if (key.includes('select_all')) return false;
				if (!value && preferences[key] === 'active') return true;
				return false;
			}),
		);

		const check = Object.keys(filteredData).length === 0;

		if (formData.select_all || check) {
			await updatePreference({
				...formData,
				check,
			});
		} else {
			setFilteredDataState(filteredData);
			handleModal();
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>
					Check the type of emails you want to receive
				</div>

				<Checkbox
					label={controls.select_all.label}
					checked={formData?.select_all}
					onChange={(val) => handleSelectAll(val)}
				/>
			</div>

			<div className={styles.categories}>
				<div className={styles.section}>
					<div className={styles.title}>
						Promotional
					</div>
					<div className={styles.content}>
						<div className={styles.sub_category}>
							<Checkbox
								label={controls.offers_discounts.label}
								checked={formData.offers_discounts}
								onChange={(val) => handleChange(val.target.checked, 'offers_discounts')}
							/>
							<div className={styles.sub_label}>
								Receive offers and discounts.

							</div>
						</div>
						<div className={styles.sub_category}>
							<Checkbox
								label={controls.subscriber_special.label}
								checked={formData.subscriber_special}
								onChange={(val) => handleChange(val.target.checked, 'subscriber_special')}
							/>
							<div className={styles.sub_label}>
								Receive exclusive subscriber communications.
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						Products and Services

					</div>
					<div className={styles.content}>
						<div className={styles.sub_category}>
							<Checkbox
								label={controls.new_product_service_launches_and_updates.label}
								checked={formData.new_product_service_launches_and_updates}
								onChange={(val) => handleChange(
									val.target.checked,
									'new_product_service_launches_and_updates',
								)}
							/>
							<div className={styles.sub_label}>
								Get information on latest product launches and updates.

							</div>
						</div>
						<div className={styles.sub_category}>
							<Checkbox
								label={controls.product_service_explainers.label}
								checked={formData.product_service_explainers}
								onChange={(val) => handleChange(val.target.checked, 'product_service_explainers')}
							/>
							<div className={styles.sub_label}>
								Receive detailed product explanations.
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						Subscriptions
					</div>
					<div className={styles.content}>
						<div className={styles.sub_category}>
							<Checkbox
								label={controls.newsletter.label}
								checked={formData.newsletter}
								onChange={(val) => handleChange(val.target.checked, 'newsletter')}
							/>
							<div className={styles.sub_label}>
								Get latest newsletters and services.

							</div>
						</div>
						<div className={styles.sub_category}>
							<Checkbox
								label={controls.general_news.label}
								checked={formData.general_news}
								onChange={(val) => handleChange(val.target.checked, 'general_news')}
							/>
							<div className={styles.sub_label}>
								Receive relevant news and information.
							</div>
						</div>
					</div>
				</div>
			</div>

			<Button
				disabled={loading}
				loading={loading}
				themeType="accent"
				className={styles.save_button}
				onClick={handleSaveForm}
			>
				UPDATE EMAIL PREFERENCES
			</Button>
			<ReasonModal
				loading={loading}
				formData={formData}
				showModal={showModal}
				setShowModal={setShowModal}
				updatePreference={updatePreference}
				filteredDataState={filteredDataState}
			/>
		</div>
	);
}

export default CategoryForm;
