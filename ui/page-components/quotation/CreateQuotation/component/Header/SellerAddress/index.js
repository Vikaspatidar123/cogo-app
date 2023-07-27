import { cl, Popover, Tooltip, Placeholder } from '@cogoport/components';
import { IcALocation, IcMArrowRotateDown, IcMPlusInCircle } from '@cogoport/icons-react';
import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

import useCreateSeller from '../../../hooks/useCreateSeller';
import useSellerAddress from '../../../hooks/useSellerAddress';
import CreateSellerModal from '../CreateSellerModal';

import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';

const LOADER_ARR = [...Array(3).keys()];

function SellerAddressContent({
	setSellerAddressInfo, setShowFilters, sellerAddressInfo,
	addressdata = [], loading, setOpenModal,
}) {
	const geo = getGeoConstants();
	const REGISTRATION_LABEL = geo.others.registration_number.label;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>Select Seller Address</div>
				<div
					onClick={() => {
						setOpenModal(true);
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
				LOADER_ARR.map((ele) => (
					<div key={ele} className={styles.card}>
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
								${(sellerAddressInfo?.id === id || sellerAddressInfo?.billingAddressId === id)
									? styles.selected : styles.hover_card}`}
								onClick={() => {
									setSellerAddressInfo(data);
									setShowFilters(false);
								}}
							>
								<div className={cl`${styles.section} ${styles.info}`}>
									<p className={cl`${styles.card_text} ${styles.org_name}`}>{name}</p>
									<p className={cl`${styles.card_text} ${styles.address}`}>
										{`${address} ${pincode}`}
									</p>
									<p className={cl`${styles.card_text} ${styles.gst}`}>
										{REGISTRATION_LABEL}
										{' '}
										Number :
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
}

function SellerAddress(props, ref) {
	const { sellerDetails = {} } = props;
	const [sellerAddressInfo, setSellerAddressInfo] = useState();
	const [showFilters, setShowFilters] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const { data = {}, loading, getSellerAddress } = useSellerAddress();
	const {
		createSellerAddres,
		loading : createLoading,
	} = useCreateSeller();

	useImperativeHandle(ref, () => (
		sellerAddressInfo
	));

	useEffect(() => {
		if (sellerDetails?.billingAddressId) {
			setSellerAddressInfo(sellerDetails);
		}
	}, [sellerDetails, sellerDetails?.billingAddressId]);

	return (
		<>
			<Popover
				placement="bottom"
				visible={showFilters}
				onClickOutside={() => setShowFilters(false)}
				content={(
					<SellerAddressContent
						setSellerAddressInfo={setSellerAddressInfo}
						sellerAddressInfo={sellerAddressInfo}
						setShowFilters={setShowFilters}
						addressdata={data?.list}
						loading={loading}
						setOpenModal={setOpenModal}
					/>
				)}
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
						<p className={styles.text}>
							{`${sellerAddressInfo?.name
						|| sellerAddressInfo?.billingPartyName || 'Seller Address'} `}

						</p>
					</div>
					<IcMArrowRotateDown fill="#333" width={13} height={13} />
				</div>
			</Popover>
			<CreateSellerModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				createSellerAddres={createSellerAddres}
				getSellerAddress={getSellerAddress}
				loading={createLoading}
			/>

		</>

	);
}

export default forwardRef(SellerAddress);
