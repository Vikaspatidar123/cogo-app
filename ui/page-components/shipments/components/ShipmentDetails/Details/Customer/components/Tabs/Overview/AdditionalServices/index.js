// import AddRate from '@cogo/bookings/AdditionalServices/components/AddRate';
// import { ShipmentDetailContext } from '@cogo/bookings/commons/Context';
// import EmptyState from '@cogo/bookings/commons/EmptyState';
// import { useSelector } from '@cogo/store';
// import { Button, Modal } from '@cogoport/front/components/admin';
// import { isEmpty } from '@cogoport/front/utils';
// import { IcMPlus } from '@cogoport/icons-react';
// import Loader from '../../Loader';

// import AddService from './AddService';
// import useRequestRate from './AddService/ChooseService/useRequestRate';
// import useList from './AddService/useList';
// import ItemAdded from './ItemAdded';
// import actions from './ItemAdded/actions';
// import getStaus from './ItemAdded/get_status';
// import ServicesLoader from './ItemAdded/ServicesLoader';
// import {
// 	Container,
// 	Added,
// 	AddedServices,
// 	Heading,
// 	SuggestedServices,
// 	ServiceContainer,
// 	ServiceName,
// 	BtnWrap,
// 	SuggestedContainer,
// } from './styles';
// import useAddedList from './useAddedList';
import { useState, useContext, useEffect } from 'react';

import useAddedList from './hooks/useAddedList';

import { useSelector } from '@/packages/store';
import { ShipmentDetailContext } from '@/ui/page-components/shipments/components/ShipmentDetails/common/Context';

const emptyStateContent = {
	heading     : 'No Services Founds!',
	description : 'Looks like you did not add any service.',
};

function List({ services, isSeller, quickAction, setQuickAction }) {
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
		<AddedServices>
			{listAdded?.map((item) => {
				const status = getStaus({ item });

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
		</AddedServices>
	);

	const handleClick = () => {
		setShowAll(true);
		setOpen(false);
	};

	useEffect(() => {
		if (quickAction === 'services') setShow(true);
	}, [quickAction]);

	return (
		<Container>
			<Added>
				<Heading>ADDITIONAL SERVICES</Heading>

				{!isEmpty(listAdded) ? (
					<AddedServices>
						{open ? (
							<>
								<div style={{ display: 'flex', flexWrap: 'wrap' }}>
									{addedItems?.map((item) => {
										const status = getStaus({ item });

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

								<BtnWrap className="first">
									{listAdded.length > 5 && (
										<Button
											className="primary md text"
											onClick={() => handleClick()}
										>
											View All services
										</Button>
									)}
								</BtnWrap>
							</>
						) : null}
						{showAll ? <div>{content}</div> : null}
					</AddedServices>
				) : (
					((ServicesLoading || isGettingShipment) && <ServicesLoader />) || (
						<EmptyState isMobile showContent={emptyStateContent} />
					)
				)}
			</Added>

			{!isGettingShipment ? (
				<SuggestedContainer>
					<SuggestedServices>
						{items.map((service) => (
							<ServiceContainer onClick={() => requestRate(service)}>
								<ServiceName>{service?.name}</ServiceName>
								<IcMPlus />
							</ServiceContainer>
						))}
					</SuggestedServices>

					{list?.length > 4 ? (
						<BtnWrap>
							<Button className="primary sm" onClick={() => setShow(true)}>
								+ Add Additional Services
							</Button>
						</BtnWrap>
					) : null}
				</SuggestedContainer>
			) : (
				<Loader />
			)}

			{addRate ? (
				<Modal
					show={addRate}
					onClose={() => setAddRate(null)}
					className="primary lg"
					closable={false}
					onOuterClick={() => setAddRate(null)}
				>
					<AddRate
						item={addRate?.item || addRate}
						shipment_data={shipment_data}
						status={addRate?.status}
						setAddRate={setAddRate}
						refetch={refetch}
					/>
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
		</Container>
	);
}

export default List;
