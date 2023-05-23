import { Input, Button, Placeholder, Checkbox, Modal } from '@cogoport/components';
import { useState, useMemo } from 'react';

// import useCreatePoc from '../../../hooks/useCreatePoc';
import useFetchPoc from '../../../hooks/useFetchPoc';
import AddPocs from '../AddPoc';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

function LinkPocs({ handleNext, setTrackerPoc, trackerPoc, handleModal }) {
	const { loading, pocList, setPocList } = useFetchPoc();
	const [searchText, setSearchText] = useState('');
	const [isPocModalOpen, setPocModal] = useState(false);
	const [check, setCheck] = useState([]);
	const filteredPocList = useMemo(
		() => pocList?.filter(
			(item) => ['name', 'email']
				?.filter((key) => item[key]?.toLowerCase().includes(searchText?.toLowerCase())).length > 0,
		),
		[pocList, searchText],
	);

	const handlePocModal = () => {
		setPocModal(!isPocModalOpen);
	};
	const addPocToState = (data) => {
		setPocList((prevPocList) => [data, ...prevPocList]);
	};
	const {
		control,
		handleSubmit,
	} = useForm();
	// const { createPoc } = useCreatePoc();
	const onSubmit = async () => {
		// const { data } = check;

		const newPocList = check?.map(
			(pocId) => filteredPocList?.filter((list) => list.id === pocId)[0],
		);

		// for (let i = 0; i < newPocList?.length; i + 1) {
		// 	const item = newPocList[i];
		// 	if (item.tradeContact === true) {
		// 		const { name, mobile_no, email } = item;
		// 		try {
		// 			const id = createPoc(name, mobile_no, email);
		// 			item.id = id;
		// 		} catch (err) {
		// 			Toast.error(
		// 				err?.message || "Couldn't create POC. please try again later.",
		// 			);
		// 			return;
		// 		}
		// 	}
		// }
		setTrackerPoc({ ...trackerPoc, selected_poc_details: newPocList });
		handleNext();
	};

	const onCheck = (id) => {
		if (check.includes(id)) {
			setCheck(check.filter((x) => x !== id));
		} else {
			setCheck((prv) => [...prv, id]);
		}
	};

	return (
		<div>
			<Modal.Body>
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

				<h3 className={styles.list}>Contact List</h3>

				<div>
					{loading && [1, 2, 3].map(() => <div className={styles.loading}><Placeholder /></div>)}
					{!loading && filteredPocList?.length > 0 ? (filteredPocList.map((item) => {
						const label = `${item.name}(${item.email})`;
						return (
							<div>
								<Checkbox
									control={control}
									label={label}
									value={check.includes(item.id)}
									onChange={() => onCheck(item.id)}
								/>
							</div>
						);
					})) : (<div>{!loading && <p> Please add new contacts</p> }</div>)}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.footer}>
					<Button size="lg" onClick={handleModal} themeType="secondary">
						CANCEL
					</Button>
					<Button
						size="lg"
						disabled={loading}
						hideOverflow
						onClick={handleSubmit(onSubmit)}
					>
						Customize Alerts
					</Button>
				</div>

			</Modal.Footer>
		</div>
	);
}

export default LinkPocs;
