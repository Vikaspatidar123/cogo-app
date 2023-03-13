import { cl, Button } from '@cogoport/components';
import { IcMArrowBack, IcMPlus } from '@cogoport/icons-react';
import { useState, forwardRef } from 'react';

import useCreateBuyer from '../../hooks/useCreateBuyer';

import CreateBuyerModal from './CreateBuyerModal';
import SellerAddress from './SellerAddress';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function Header(props, ref) {
	const { control, fields, errors } = props;

	const [openModal, setOpenModal] = useState(false);

	const {
		createBuyerAddress,
		loading,
	} = useCreateBuyer();

	const SelectController = getField(fields[0]?.type);
	const { current } = ref;

	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<div className={styles.icon_container}>
					<IcMArrowBack width={18} height={18} />
				</div>
				<h1>Create Quotation</h1>
			</div>
			<div className={styles.field_row}>
				<div className={cl`${styles.field_col} ${styles.buyer_col} `}>
					<SelectController
						{...fields[0]}
						control={control}
						className={`${errors?.[fields[0].name] && styles.error}`}
						handleChange={(data) => { current.buyerDetails = data; }}
					/>
					<div className={styles.or_tag}>
						<div className={styles.line} />
						<div className="text">OR</div>
						<div className={styles.line} />
					</div>
					<Button size="md" themeType="accent" onClick={() => setOpenModal(true)}>
						<IcMPlus width={15} height={15} />
						Add New
					</Button>
				</div>
				<div className={styles.seller_col}>
					<SellerAddress ref={(r) => { current.sellerAddress = r; }} />
				</div>
			</div>

			<CreateBuyerModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				loading={loading}
				createBuyerAddress={createBuyerAddress}
			/>
		</div>
	);
}

export default forwardRef(Header);
