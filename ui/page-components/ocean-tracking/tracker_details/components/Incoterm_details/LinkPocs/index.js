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
import { Input, Button, Toast } from '@cogoport/components';
import { useState, useMemo } from 'react';

import useCreatePoc from '../../../hooks/useCreatePoc';
import useFetchPoc from '../../../hooks/useFetchPoc';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import AddPocs from '../AddPoc';

function LinkPocs({ handleNext }) {
	// const { formRef, trackerPoc, setTrackerPoc, isMobile, general } = useSaasState();
	// const { profile, scope } = useSaasState();
	const [trackerPoc, setTrackerPoc] = useState([]);
	const [loading, pocList, setPocList] = useFetchPoc();
	const [searchText, setSearchText] = useState('');
	const [isPocModalOpen, setPocModal] = useState(false);
	const { selected_poc_details = [] } = trackerPoc;

	const filteredPocList = useMemo(
		() => pocList.filter(
			(item) => ['name', 'email'].filter((key) => item[key]?.toLowerCase().includes(searchText?.toLowerCase())).length > 0,
		),
		[pocList, searchText],
	);

	const handlePocModal = () => {
		setPocModal(!isPocModalOpen);
	};

	const addPocToState = (data) => {
		setPocList((prevPocList) => [data, ...prevPocList]);
	};

	// if (loading) {
	// 	return <Skeleton count={3} />;
	// }

	const { createPoc } = useCreatePoc();
	const onSubmit = async (values) => {
		// eslint-disable-next-line no-shadow
		const { pocList } = values;

		const newPocList = pocList?.map(
			(pocId) => filteredPocList?.filter((list) => list.id === pocId)[0],
		);
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < newPocList.length; i++) {
			const item = newPocList[i];
			if (item.tradeContact === true) {
				const { name, mobile_no, email } = item;

				try {
					// eslint-disable-next-line no-await-in-loop
					const id = await createPoc(name, mobile_no, email);
					item.id = id;
				} catch (err) {
					Toast.error(err?.message || "Couldn't create POC. please try again later.");
					return;
				}
			}
		}
		setTrackerPoc({ ...trackerPoc, selected_poc_details: newPocList });
		handleNext();
	};
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	console.log(filteredPocList, 'filteredPocList');
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
			</form>
		</div>
	);
}

export default LinkPocs;
