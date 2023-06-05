import { Button, Placeholder, Modal } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useContext, useEffect } from 'react';

import EmptyState from '../../../EmptyState';

import AddService from './AddService';
import useList from './AddService/hooks/useList';
import useAddedList from './hooks/useAddedList';
import ItemAdded from './ItemAdded';
import actions from './ItemAdded/actions';
import getStatus from './ItemAdded/getStatus';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import { ShipmentDetailContext } from '@/ui/page-components/shipments/components/ShipmentDetails/common/Context';
import useRequestRate from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useRequestRate';

const emptyStateContent = {
	heading     : 'No Services Founds!',
	description : 'Looks like you did not add any service.',
};

function AdditionalServicesList({ services, isSeller, quickAction, setQuickAction }) {
	const { scope, isShipper } = useSelector(({ general }) => ({
		isShipper : general.query.account_type === 'importer_exporter',
		scope     : general.scope,
	}));

	const [{ shipment_data, isGettingShipment }] = useContext(
		ShipmentDetailContext,
	);

	const [addRate, setAddRate] = useState(null);
	const [show, setShow] = useState(false);
	const [showAll, setShowAll] = useState(false);
	const [open, setOpen] = useState(true);

	const {
		list: listAdded,
		refetch,
		loading: ServicesLoading,
	} = useAddedList({
		shipment_id: shipment_data?.id,
		shipment_data,
		services,
	});

	const { requestRate } = useRequestRate({ setShow, refetch });

	const { list } = useList({
		shipment_id : shipment_data?.id,
		show        : true,
	});

	const items = list.slice(0, 4);
	const addedItems = listAdded.slice(0, 4);

	const content = (
		<div>
			{listAdded?.map((item) => {
				const status = getStatus({ item });

				return (
					<ItemAdded
						item={item}
						status={status}
						actionButton={actions({
							status,
							item,
							setAddRate,
							scope,
							isShipper,
						})}
						refetch={refetch}
					/>
				);
			})}
		</div>
	);

	const handleClick = () => {
		setShowAll(true);
		setOpen(false);
	};

	useEffect(() => {
		if (quickAction === 'services') setShow(true);
	}, [quickAction]);

	return (
		<div className={styles.container}>
			<div className={styles.added}>
				<div className={styles.heading}>ADDITIONAL SERVICES</div>

				{!isEmpty(listAdded) ? (
					<div>
						{open ? (
							<div>
								<div style={{ display: 'flex', flexWrap: 'wrap' }}>
									{addedItems?.map((item) => {
										const status = getStatus({ item });

										return (
											<ItemAdded
												item={item}
												status={status}
												actionButton={actions({
													status,
													item,
													setAddRate,
													scope,
													isShipper,
												})}
												refetch={refetch}
											/>
										);
									})}
								</div>

								<div className={`${styles.first} ${styles.button_wrap}`}>
									{listAdded.length > 5 && (
										<Button
											size="md"
											themeType="link"
											onClick={() => handleClick()}
										>
											View All services
										</Button>
									)}
								</div>
							</div>
						) : null}
						{showAll ? <div>{content}</div> : null}
					</div>
				) : (
					((ServicesLoading || isGettingShipment) && <Placeholder />) || (
						<EmptyState isMobile showContent={emptyStateContent} />
					)
				)}
			</div>

			{!isGettingShipment ? (
				<div className={styles.suggested_container}>
					<div className={styles.suggested_services}>
						{items.map((service) => (
							<div
								role="presentation"
								className={styles.service_container}
								onClick={() => requestRate(service)}
							>
								<span className={styles.service_name}>{service?.name}</span>
								<IcMPlus />
							</div>
						))}
					</div>

					{list?.length > 4 ? (
						<div className={styles.button_wrap}>
							<Button size="md" themeType="accent" onClick={() => setShow(true)}>
								+ Add Additional Services
							</Button>
						</div>
					) : null}
				</div>
			) : (
				<Placeholder />
			)}

			{addRate ? (
				<Modal
					show={addRate}
					onClose={() => setAddRate(null)}
					className="primary lg"
					closable={false}
					onOuterClick={() => setAddRate(null)}
				>
					{/* <AddRate
						item={addRate?.item || addRate}
						shipment_data={shipment_data}
						status={addRate?.status}
						setAddRate={setAddRate}
						refetch={refetch}
					/> */}
				</Modal>
			) : null}

			{show ? (
				<Modal
					className="primary lg"
					onClose={() => {
						setShow(false);
						setQuickAction('');
					}}
					show={show}
				>
					<AddService
						shipment_data={shipment_data}
						services={services}
						isSeller={isSeller}
						refetch={refetch}
						setShow={setShow}
					/>
				</Modal>
			) : null}
		</div>
	);
}

export default AdditionalServicesList;
