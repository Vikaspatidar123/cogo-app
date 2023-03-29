import { Popover, Button } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

import { useRequest } from '@/packages/request';

function OrganizationDetails({ org_id, org_name, branch_id }) {
	const [show, setShow] = useState(false);
	const [users, setUsers] = useState([]);

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'list_organization_users',
			method : 'get',
		},
		{ manual: true },
	);

	const getOrgUsers = async () => {
		const params = {
			filters: {
				organization_id        : org_id,
				organization_branch_id : branch_id,
				status                 : 'active',
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
		<div className={styles.container}>
			<div className={`${styles.option_label} ${styles.bold}`}>
				USERS -
				{org_name}
			</div>

			{(users || []).map((user) => (
				<div className={styles.card}>
					<div className={styles.option_label} style={{ width: '33%' }}>{user?.name}</div>
					<div
						role="presentation"
						className={`${styles.option_label} ${styles.clickable}`}
						style={{ width: '31%' }}
						onClick={() => goTo(`tel:${user?.mobile_number}`)}
					>
						{user?.mobile_country_code}
						{user?.mobile_number}
					</div>

					<div
						role="presentation"
						className={`${styles.option_label} ${styles.clickable}`}
						style={{ width: '36%', marginLeft: 10 }}
						onClick={() => goTo(`mailto:${user?.email}`)}
					>
						{user?.email}
					</div>
				</div>
			))}
		</div>
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
					marginLeft : 20,
					display    : 'flex',
					alignItems : 'center',
					border     : '1px solid #000000',
					background : '#ffffff',
					color      : '#000000',
				}}
				onClick={() => setShow(true)}
			>
				DETAILS
				{' '}
				<IcMArrowRotateDown style={{ marginLeft: 4 }} />
			</Button>
		</Popover>
	);
}

export default OrganizationDetails;
