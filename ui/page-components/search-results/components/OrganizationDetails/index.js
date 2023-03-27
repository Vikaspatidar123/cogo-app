import React, { useState, useEffect } from 'react';
import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';
import { Popover, Button } from '@cogoport/front/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { Container, OptionLabel, Card } from './styles';

const OrganizationDetails = ({ org_id, org_name, branch_id }) => {
	const [show, setShow] = useState(false);
	const [users, setUsers] = useState([]);
	const { scope, isMobile } = useSelector(({ general }) => ({
		scope: general?.scope,
		isMobile: general?.isMobile,
	}));

	const { trigger } = useRequest(
		'get',
		false,
		scope,
	)('/list_organization_users');

	const getOrgUsers = async () => {
		const params = {
			filters: {
				organization_id: org_id,
				organization_branch_id: branch_id,
				status: 'active',
			},
			page_limit: 1000,
		};
		const res = await trigger({ params });
		if (!res.hasError) {
			setUsers(res?.data?.list || []);
		}
	};

	const goTo = (href) => {
		if (typeof window !== 'undefined') {
			window.open(href);
		}
	};

	useEffect(() => {
		getOrgUsers();
	}, [org_id]);

	const renderBody = () => (
		<Container>
			<OptionLabel className="bold">USERS - {org_name}</OptionLabel>

			{(users || []).map((user) => (
				<Card>
					<OptionLabel style={{ width: '33%' }}>{user?.name}</OptionLabel>

					<OptionLabel
						style={{ width: '31%' }}
						className="clickable"
						onClick={() => goTo(`tel:${user?.mobile_number}`)}
					>
						{user?.mobile_country_code} {user?.mobile_number}
					</OptionLabel>

					<OptionLabel
						style={{ width: '36%', marginLeft: 10 }}
						className="clickable"
						onClick={() => goTo(`mailto:${user?.email}`)}
					>
						{user?.email}
					</OptionLabel>
				</Card>
			))}
		</Container>
	);

	return (
		<Popover
			theme="light"
			show={show}
			interactive
			onOuterClick={() => setShow(false)}
			content={renderBody()}
		>
			<Button
				style={{
					marginLeft: 20,
					display: 'flex',
					alignItems: 'center',
					border: '1px solid #000000',
					background: '#ffffff',
					color: '#000000',
					marginTop: isMobile ? '20px' : '',
				}}
				onClick={() => setShow(true)}
			>
				DETAILS <IcMArrowRotateDown style={{ marginLeft: 4 }} />
			</Button>
		</Popover>
	);
};

export default OrganizationDetails;
