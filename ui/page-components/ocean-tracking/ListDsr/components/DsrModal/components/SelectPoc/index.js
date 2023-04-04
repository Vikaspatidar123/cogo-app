import { Input, Button } from '@cogoport/components';
import { useState, useMemo } from 'react';

import useCreateDsr from '../../../../hooks/useCreateDsr';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import AddPocs from '@/ui/page-components/ocean-tracking/tracker_details/components/Incoterm_details/AddPoc';
import useFetchPoc from '@/ui/page-components/ocean-tracking/tracker_details/hooks/useFetchPoc';

function SelectPoc({ setStep, setSelectedPoc, setDsrId }) {
	const { loading, pocList, setPocList } = useFetchPoc();
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
	const handlePocModal = () => {
		setPocModal(!isPocModalOpen);
	};

	const addPocToState = (data) => {
		setPocList((prevPocList) => [data, ...prevPocList]);
	};

	const onSubmit = async (values) => {
		let poc = '';

		filteredPocList.forEach((element) => {
			if (values?.[element?.name] === true) {
				poc = element.id;
			}
		});
		const data = await createDsr(poc);
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
