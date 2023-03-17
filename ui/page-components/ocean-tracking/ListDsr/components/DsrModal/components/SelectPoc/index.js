// import { Flex, Text } from '@cogoport/front/components';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import React, { useState, useMemo } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import { toast } from 'react-toastify';
// import * as Yup from 'yup';

// import { useSaasState } from '../../../../../../../../common/context';
// import { Input } from '../../../../../../../../common/ui';
// import Button from '../../../../../../../../common/ui/Button';
// import FormItem from '../../../../../../../../common/ui/FormItem';
// import request from '../../../../../../../../common/utils/request';
// import useFetchPoc from '../../../../../../hooks/useFetchPocs';
// import AddPocs from '../add-poc';

// import StyledPocCard from './styles';
import { Input, Button } from '@cogoport/components';
import { useState, useMemo } from 'react';

import useCreateDsr from '../../../../hooks/useCreateDsr';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import AddPocs from '@/ui/page-components/ocean-tracking/tracker_details/components/Incoterm_details/AddPoc';
import useFetchPoc from '@/ui/page-components/ocean-tracking/tracker_details/hooks/useFetchPoc';

function SelectPoc({ setHeading, setStep, setSelectedPoc, setDsrId }) {
	const [loading, pocList, setPocList] = useFetchPoc();
	const [submitLoading, createDsr] = useCreateDsr();
	const [searchText, setSearchText] = useState('');
	const [isPocModalOpen, setPocModal] = useState(false);

	const filteredPocList = useMemo(
		() => pocList.filter(
			(item) => ['name', 'email']
				.filter((key) => item[key]?.toLowerCase().includes(searchText?.toLowerCase())).length > 0,
		),
		[pocList, searchText],
	);
	console.log(pocList, 'pocList');
	console.log(filteredPocList, 'filteredPocList');
	const handlePocModal = () => {
		setPocModal(!isPocModalOpen);
	};

	const addPocToState = (data) => {
		setPocList((prevPocList) => [data, ...prevPocList]);
	};

	// if (loading) {
	// 	return <Skeleton count={3} />;
	// }

	// const { createPoc } = useCreatePoc();
	const onSubmit = async (values) => {
		const { poc } = values;
		console.log(values, 'values');
		const data = await createDsr(poc);
		console.log(data, '12334');
		if (data == null) return;
		setSelectedPoc({
			id   : poc,
			name : pocList.filter((item) => item.id === poc)[0]?.name,
		});
		setDsrId(data.id);
		setStep((step) => step + 1);
	};
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<div>
			<div className={styles.item}>
				{isPocModalOpen && (
					<AddPocs
						isOpen={isPocModalOpen}
						handleModal={handlePocModal}
						type="SHIPPER"
						addPocToState={addPocToState}
						heading="New Contact"
					/>
				)}
				<Input
					size="md"
					placeholder="Enter name or email to search"
					value={searchText}
					onChange={(e) => setSearchText(e?.target?.value)}
				/>
				<div className={styles.button}>
					<Button
						size="lg"
						variant="outline"
						themeType="secondary"
						onClick={handlePocModal}
					>
						+ New Contact
					</Button>
				</div>

			</div>
			<h3 className={styles.list}>
				Contact List
			</h3>
			<form>
				{ filteredPocList?.length > 0 ? (
					filteredPocList.map((item) => {
						const Element = getField('checkbox');
						const label = `${item.name}(${item.email})`;
						return (
							<div>
								<Element {...item} control={control} label={label} />
							</div>
						);
					})
				) : (
					<p> Please add new contacts</p>
				)}
				<div className={styles.button_bottom}>
					<Button
						size="lg"
						variant="secondary"
						disabled={submitLoading}
						onClick={handleSubmit(onSubmit)}
					>
						Next
					</Button>
				</div>
			</form>
		</div>
	);
}

export default SelectPoc;
