import { cl, Popover, Tooltip, Placeholder } from '@cogoport/components';
import { IcALocation, IcMArrowRotateDown, IcMPlusInCircle } from '@cogoport/icons-react';
import { useState, useImperativeHandle, forwardRef } from 'react';

import useSellerAddress from '../../../hooks/useSellerAddress';

import styles from './styles.module.css';

const sellerAddressContent = ({
	setSellerAddressInfo, setShowFilters, sellerAddressInfo,
	addressdata = [], loading,
}) => (
	<div className={styles.container}>
		<div className={styles.header}>
			<div className={styles.title}>Select Seller Address</div>
			<div
				onClick={() => {
					// setCreateShow(true);
					setShowFilters(false);
				}}
				role="presentation"
			>
				<Tooltip placement="top" content="Add Seller">
					<div>
						<IcMPlusInCircle fill="#356EFD" width={21} height={21} />
					</div>
				</Tooltip>
			</div>
		</div>
		{loading && (
			[1, 2, 3].map(() => (
				<div className={styles.card}>
					<div className={styles.section}>
						<Placeholder className={styles.loading} />
						<Placeholder className={styles.loading} />
						<Placeholder className={styles.loading} />
					</div>
				</div>
			))
		)}
		{!loading && (
			<div className={styles.address_container}>
				{addressdata.map((data) => {
					const { id, name, pincode, tax_number, address } = data;
					return (
						<div
							key={id}
							role="presentation"
							className={cl`${styles.card}
							${sellerAddressInfo?.id === id ? styles.selected : styles.hover_card}`}
							onClick={() => {
								setSellerAddressInfo(data);
								setShowFilters(false);
							}}
						>
							<div className={cl`${styles.section} ${styles.info}`}>
								<p className={cl`${styles.card_text} ${styles.org_name}`}>{name}</p>
								<p className={cl`${styles.card_text} ${styles.address}`}>{`${address} ${pincode}`}</p>
								<p className={cl`${styles.card_text} ${styles.gst}`}>
									GST Number :
									{tax_number}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		)}
	</div>
);

function SellerAddress(props, ref) {
	const [sellerAddressInfo, setSellerAddressInfo] = useState();
	const [showFilters, setShowFilters] = useState(false);
	const { data = {}, loading } = useSellerAddress();

	useImperativeHandle(ref, () => ({
		sellerAddress: sellerAddressInfo,
	}));

	return (
		<Popover
			placement="bottom"
			visible={showFilters}
			onClickOutside={() => setShowFilters(false)}
			content={sellerAddressContent({
				setSellerAddressInfo,
				sellerAddressInfo,
				setShowFilters,
				addressdata: data?.list,
				loading,
			})}
			caret={false}
			interactive
		>
			<div
				className={cl`${styles.popover_btn} ${styles.flex_box}`}
				role="presentation"
				onClick={() => setShowFilters((prev) => !prev)}
			>
				<div className={styles.flex_box}>
					<IcALocation fill="#FADA29" width={18} height={18} />
					<p className={styles.text}>{`${sellerAddressInfo?.name || 'Seller Address'} `}</p>
				</div>
				<IcMArrowRotateDown fill="#333" width={13} height={13} />
			</div>
		</Popover>
	);
}

export default forwardRef(SellerAddress);
