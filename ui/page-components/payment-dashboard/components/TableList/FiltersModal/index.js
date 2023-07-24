import { Flex, Text, Button, Select } from '@cogoport/front/components';
import { IcMFilter, IcMSearchdark, IcMRefresh } from '@cogoport/icons-react';
import React, { useState } from 'react';

import statusOptions from '../../../constants/status-options';

import { ModalWrapper, SearchContainer, SelectWrapper } from './style';

const options = [];
for (let i = 0; i < 100; i += 1) {
	options.push({ label: `label${i}`, value: `value${i}` });
}

const Sort_Options = [
	{ label: 'Total Amount', value: 'grandTotal' },
	{ label: 'Due Date', value: 'dueDate' },
	{ label: 'Invoice date', value: 'invoiceDate' },
];

const Sort_By_Options = [
	{ label: 'Acending', value: 'Asc' },
	{ label: 'Decending', value: 'Desc' },
];

function FiltersModal({
	getInvoiceDetails,
	setRequestType,
	searchQuery,
	onQueryChange,
	orderBy,
	setOrderBy,
	setPagination,
	setInvoiceStatus,
	invoiceStatus,
}) {
	const [show, setShow] = useState(false);
	const onClick = () => {
		setShow(true);
	};

	const resetFilter = () => {
		setRequestType('All');
		setOrderBy({ key: '', order: 'Asc' });
		onQueryChange('');
		setPagination(1);
	};

	return (
		<Flex>
			<Flex
				style={{
					width           : '30px',
					height          : '30px',
					backgroundColor : '#FFFFFF',
					borderRadius    : '30px',
					justifyContent  : 'center',
					alignItems      : 'center',
					boxShadow       : '0px 2px 25px rgba(56, 59, 68, 0.1)',
				}}
			>
				<IcMFilter fill="#356EFD" size={16.8} onClick={() => onClick()} />
			</Flex>
			<Flex
				style={{
					width           : '30px',
					height          : '30px',
					backgroundColor : '#FFFFFF',
					borderRadius    : '30px',
					justifyContent  : 'center',
					alignItems      : 'center',
					marginLeft      : '8px',
					boxShadow       : '0px 2px 25px rgba(56, 59, 68, 0.1)',
				}}
			>
				<IcMRefresh onClick={() => getInvoiceDetails()} size={21} />
			</Flex>
			{show && (
				<ModalWrapper
					show={show}
					closeOnEscape
					position="bottom"
					fullscreen
					onOuterClick={() => setShow(false)}
					onClose={() => setShow(false)}
				>
					<Flex direction="column">
						<Flex
							alignItems="center"
							padding="10px 0px"
							margin="-10px 0px 10px 0px"
						>
							<Text
								color="#000000"
								marginRight={4}
								style={{ fontWeight: '500', paddingRight: 10 }}
							>
								Search and Filter
							</Text>
							<Button
								size="sm"
								style={{ background: '#ffffff', color: '#333' }}
								onClick={() => {
									resetFilter();
									setShow(false);
								}}
							>
								RESET FILTERS
							</Button>
						</Flex>
						<SearchContainer
							style={{
								width  : '100%',
								height : '44px',
								border : '1px solid #E0E0E0',
								margin : '10px 0px',
							}}
						>
							<IcMSearchdark className="input-icons" />
							<input
								className="input-field"
								onChange={(e) => onQueryChange(e?.target?.value)}
								type="text"
								value={searchQuery}
								placeholder="Search by Invoice ID"
							/>
						</SearchContainer>
					</Flex>
					<Flex direction="column" margin="10px 0px">
						<Flex marginBottom={5}>
							<Text size={12} color="#828282">
								Payment Status
							</Text>
						</Flex>
						<Select
							placeholder="Select Status"
							options={statusOptions}
							size="sm"
							value={invoiceStatus}
							onChange={(e) => {
								setInvoiceStatus(e);
								setPagination(1);
							}}
							isClearable
						/>
					</Flex>
					<Flex direction="column" margin="10px 0px">
						<Flex marginBottom={5}>
							<Text size={12} color="#828282">
								Sort View via Status
							</Text>
						</Flex>
					</Flex>
					<Flex direction="column" margin="10px 0px">
						<Flex marginBottom={5}>
							<Text size={12} color="#828282">
								Sort By
							</Text>
						</Flex>
						<Flex flex={2}>
							<Flex flex={1} marginRight={5}>
								<SelectWrapper
									style={{ width: '100%' }}
									onChange={(e) => setOrderBy((rest) => ({ ...rest, key: e }))}
									placeholder="Select Option"
									value={orderBy.key}
									options={Sort_Options}
								/>
							</Flex>
							<Flex flex={1} marginLeft={5}>
								<SelectWrapper
									style={{ width: '100%' }}
									onChange={(e) => setOrderBy((rest) => ({ ...rest, order: e }))}
									placeholder="Sort By"
									value={orderBy.order}
									options={Sort_By_Options}
								/>
							</Flex>
						</Flex>
					</Flex>

					<Flex margin="30px 0px 0px 0px">
						<Button
							onClick={() => setShow(false)}
							style={{ width: '89px', height: '33px', borderRadius: '4px' }}
						>
							Apply
						</Button>
					</Flex>
				</ModalWrapper>
			)}
		</Flex>
	);
}

export default FiltersModal;
