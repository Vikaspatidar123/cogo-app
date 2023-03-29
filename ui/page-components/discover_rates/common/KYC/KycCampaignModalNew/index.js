/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useSelector } from '@/packages/store';
import { Flex, Text, BgImage } from '@cogoport/front/components';
import { Modal } from '@cogo/deprecated_legacy/ui';
import styled from '@cogoport/front/styled';
import getStaticPath from '@cogo/static';
import FormBody from './FormBody';

export const KycCampaignEbook = ({ onFinalSubmit = () => {}, onDontShow = () => {}, trackAnalytics = false }) => {
	const { scope, agent_id, user_profile, isMobile } = useSelector(({ general, profile }) => ({
		scope        : general?.scope,
		agent_id     : profile?.id,
		organization : profile?.organization,
		countryId    : profile?.organization?.country_id || profile?.partner?.country_id,
		user_profile : profile,
		isMobile     : general?.isMobile,
	}));

	const initialValues = {
		preferred_languages : user_profile?.preferred_languages,
		registration_number : user_profile?.organization?.registration_number,
		mobile              : {
			mobile_country_code : user_profile?.mobile_country_code,
			mobile_number       : user_profile?.mobile_number,
		},
		country_id   : user_profile?.organization?.country_id || user_profile?.partner?.country_id,
		country_code : user_profile?.mobile_country_code,
	};

	return (
		<Flex style={{ overflow: 'hidden', marginBottom: '-16px' }} display="block">
			<Flex marginBottom={12} display="block">
				<Text size={isMobile ? 22 : 30} marginLeft={15} bold>Get your FREE eBook!</Text>
				<Text size={isMobile ? 22 : 30} marginLeft={15} color="#000000">'A guide to find buyers for your import export business'</Text>
			</Flex>
			<FormBody
				{...initialValues}
				scope={scope}
				agent_id={agent_id}
				onFinalSubmit={onFinalSubmit}
				onDontShow={onDontShow}
				trackAnalytics={trackAnalytics}
			/>
		</Flex>
	);
};

export const KycCampaignEbookModal = ({ trackAnalytics = false }) => {
	const { isMobile, kyc_status, profile_id, organization_id } = useSelector(({ general, profile }) => ({
		isMobile        : general?.isMobile,
		kyc_status      : profile?.organization?.kyc_status,
		profile_id      : profile?.id,
		organization_id : profile?.organization?.id,
	}));

	useEffect(() => {
		const haveShown = localStorage.getItem(`ebook-modal-${profile_id}-${organization_id}`) === 'true';
		if (!haveShown) {
			if (kyc_status === 'rejected' || kyc_status === 'pending_from_user') {
				setShow(true);
			} else {
				setAlreadyFilled(true);
				setShowEbook(true);
			}
		}
	}, [kyc_status, profile_id, organization_id]);

	const [show, setShow] = useState(false);
	const [showEbook, setShowEbook] = useState(false);
	const [alreadyFilled, setAlreadyFilled] = useState(false);

	return (
		<Container>
			<Modal
				show={(kyc_status === 'rejected' || kyc_status === 'pending_from_user') && show}
				onClose={() => { setShow(false); }}
				closable
				width={1020}
				fullscreen={isMobile}
			>
				<KycCampaignEbook
					trackAnalytics={trackAnalytics}
					onFinalSubmit={() => {
						localStorage.setItem(`ebook-modal-${profile_id}-${organization_id}`, 'true');
						setShow(false);
						setShowEbook(true);
					}}
					onDontShow={() => {
						setShowEbook(false);
						setShow(false);
					}}
				/>
			</Modal>
			<Modal
				show={showEbook}
				onClose={() => setShowEbook(false)}
				closable
				fullscreen={isMobile}
			>
				<Flex padding={16} alignItems="center" direction="column">
					<Text bold marginBottom={16} align="center" size={alreadyFilled ? 18 : 24}>
						{alreadyFilled
							? 'A Guide to Find Buyers for your Import-Export Business'
							: 'Thank you for submitting your KYC'}
					</Text>
					<StyledAnchor
						style={{ marginBottom: 8 }}
						href="https://cogoport-production.sgp1.digitaloceanspaces.com/3c6a0440a6d3c94ef79752c1dbb5cf06/Find%20buyers%20for%20your%20business.pdf"
						download
						target="_blank"
						onClick={() => {
							localStorage.setItem(`ebook-modal-${profile_id}-${organization_id}`, 'true');
						}}
					>
						Download Ebook Now!
					</StyledAnchor>
					<ClearButton
						type="button"
						onClick={() => {
							setShowEbook(false);
							setShow(false);
							localStorage.setItem(`ebook-modal-${profile_id}-${organization_id}`, 'true');
						}}
						style={{ marginBottom: 16 }}
					>
						Don't show this again
					</ClearButton>
					<BgImage style={{ marginBottom: -32 }} width={240} height={240} src={getStaticPath('/images/ebook.png')} />
				</Flex>
			</Modal>
		</Container>
	);
};

const Container = styled.div`
	.ui-modal-dialog {
		padding: 0px;
		overflow: hidden;
	}
`;

const StyledAnchor = styled.a`
	display: inline-block;
	background-color: #2C3E50;
	border-color: #2C3E50;
	color: #FFF;
	padding: 16px 32px;
	font-size: 18px;
	border-radius: 8px;
	cursor: pointer;
	text-decoration: none;
`;

const ClearButton = styled.button`
	border: none;
	background-color: transparent;
	color: #999999;
	font-size: 12px;
	cursor: pointer;
	text-decoration: underline;
`;
