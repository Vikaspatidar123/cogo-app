import { useState } from 'react';

import getAlertPreferencesControls from '../../../../configurations/alerts-preferences-controls';
// import useGetPreferences from '../../../../../../hooks/useGetPreferences';

import getUserAlert from '../hooks/getUserAlert';

import CategoryForm from './CategoryForm';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function Categories() {
	const [formData, setFormData] = useState({
		select_all                               : false,
		offers_discounts                         : false,
		subscriber_special                       : false,
		new_product_service_launches_and_updates : false,
		product_service_explainers               : false,
		newsletter                               : false,
		general_news                             : false,
	});

	const {
		profile: { id = '' },
	} = useSelector((state) => state);
	const { getPreferences, preferences } = getUserAlert({ setFormData });
	const controls = getAlertPreferencesControls();

	return (
		<div className={styles.container}>
			<CategoryForm
				controls={controls}
				getPreferences={getPreferences}
				formData={formData}
				userId={id}
				setFormData={setFormData}
				preferences={preferences}
			/>
		</div>
	);
}

export default Categories;
