import { Modal } from '@cogoport/components';
import { merge } from '@cogoport/utils';
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import FormItem from '../../../FormItem';
import { useGetControls } from '../../configurations/controls';
import useCreateBillingAddres from '../../hooks/useCreateBillingAddres';

import Footer from './Footer';
import Form from './Form';
import Header from './Header';
import styles from './styles.module.css';

import { useForm, asyncFieldsLocations, useGetAsyncOptions } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useSelector } from '@/packages/store';

const errorType = ['required', 'pattern', 'maxLength', 'length'];

function AddModal({ addAddressModal = false, setAddAddressModal = () => {}, refetch = () => {} }) {
	const { general = {} } = useSelector((state) => state);
	const { isMobile } = general || {};
	const { t } = useTranslation(['common']);

	const [checked, setChecked] = useState(false);
	const [showPoc, setShowPoc] = useState(false);
	const [addressType, setAddressType] = useState('office');
	const [cityState, setCityState] = useState({});
	const { city, state } = cityState || {};
	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));
	const addAddressControls = useGetControls({ checked, setCityState, countryOptions });

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const { createSellerAddres, createAddressLoading } = useCreateBillingAddres({
		checked,
		addressType,
		refetch,
	});

	const returnFieldFunction = ({ item }) => {
		const Element = getField(item.type);
		return (
			<div className={styles.col} key={item.label}>
				<FormItem label={item.label}>
					<Element
						{...item}
						control={control}
						placeholder={item.placeholder}
						className={`${item.name === 'tax_number' ? styles.taxnumber : ''} ${
							styles.element
						} ${styles.input}`}
					/>
				</FormItem>
				{(errorType || []).includes(errors?.[item?.name]?.type) && (
					<div className={styles.error_text}>{errors[item.name]?.message}</div>
				)}
			</div>
		);
	};

	const handleCloseModal = () => {
		setAddAddressModal(false);
	};

	const onSubmit = async (data) => {
		await createSellerAddres(data, handleCloseModal);
	};

	useMemo(() => {
		setValue('city', city);
		setValue('state', state);
	}, [city, setValue, state]);

	return (
		<Modal
			show={addAddressModal}
			onClose={handleCloseModal}
			width={!isMobile && 600}
		>
			<form>
				<div className={styles.container}>
					<Header />
					<Form
						addAddressControls={addAddressControls}
						returnFieldFunction={returnFieldFunction}
						showPoc={showPoc}
						setShowPoc={setShowPoc}
						checked={checked}
						setChecked={setChecked}
						addressType={addressType}
						setAddressType={setAddressType}
					/>
				</div>
				<Footer
					t={t}
					createAddressLoading={createAddressLoading}
					handleSubmit={handleSubmit}
					handleCloseModal={handleCloseModal}
					onSubmit={onSubmit}
				/>
			</form>
		</Modal>
	);
}

export default AddModal;
