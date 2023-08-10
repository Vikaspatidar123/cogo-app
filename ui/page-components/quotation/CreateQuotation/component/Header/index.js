import { cl, Button } from '@cogoport/components';
import { IcMArrowBack, IcMPlus } from '@cogoport/icons-react';
import { useState, forwardRef } from 'react';

import useRedirectUrl from '../../../utils/redirectUrl';
import useCreateBuyer from '../../hooks/useCreateBuyer';

import CreateBuyerModal from './CreateBuyerModal';
import SellerAddress from './SellerAddress';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function Header(props, ref) {
	const { control, fields, errors, setValue, watch, editData = {} } = props;

	const [openModal, setOpenModal] = useState(false);
	const { current } = ref;
	const { redirectViewQuote } = useRedirectUrl();
	const { sellerDetails = {} } = editData;
	const { createBuyerAddress, loading } = useCreateBuyer({
		setValue,
		ref,
	});
	const SelectController = getField(fields[0]?.type);
	const buyerId = watch('watch');
	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<div className={styles.icon_container} role="presentation" onClick={redirectViewQuote}>
					<IcMArrowBack width={18} height={18} />
				</div>
				{editData?.sellerDetails ? <h1>Edit Quotation</h1> : <h1>Create Quotation</h1>}
			</div>

			<div className={styles.field_row}>
				<div className={cl`${styles.field_col} ${styles.buyer_col} `}>
					<SelectController
						{...fields[0]}
						key={buyerId}
						control={control}
						className={errors?.[fields[0].name] && styles.error}
						disabled={editData?.sellerDetails}
						handleChange={(data) => {
							current.buyerDetails = data;
						}}
					/>
					<div className={styles.or_tag}>
						<div className={styles.line} />
						<div className={styles.text}>OR</div>
						<div className={styles.line} />
					</div>

					<Button
						size="md"
						themeType="accent"
						onClick={() => setOpenModal(true)}
					>
						<IcMPlus width={15} height={15} />
						Add New
					</Button>
				</div>
				<div className={styles.seller_col}>
					<SellerAddress
						sellerDetails={sellerDetails}
						ref={(r) => {
							current.sellerAddress = r;
						}}
					/>
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
