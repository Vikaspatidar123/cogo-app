import styled from '@cogoport/front/styled';
import Input from '@cogoport/front/components/Input';
import { IcMAttach, IcMImage, IcMPdf } from '@cogoport/icons-react';

export const BotBody = styled.div`
	background-color: rgba(248, 249, 250, 1);
	height: 76%;
	overflow: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const MessagesWithMenu = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`;
export const MenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;
export const BotFooter = styled.div`
	z-index: 2000;
	padding: 0px 5px;
	display: flex;
	justify-content: space-between;
	margin-left: 10px;
	margin-right: 10px;
	margin-top: ${({ isFile }) => (isFile ? '0px' : '10px')};
`;

export const BotContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
`;
export const AdminActive = styled.div`
	display: flex;
	width: 40%;
	padding: 8px;
	margin: 12px 0px;
	flex-direction: column;
	align-items: center;
	background: #d9eafd;
	border: 1px solid #1e90ff;
	border-radius: 5px;
`;

export const SendInput = styled(Input)`
	width: 100%;
	height: 40px;
	padding: 2px;
	margin: 0 6px;
	font-size: 14px;
	border: none;
	color: #bdbdbd;

	&:focus-within {
		border: none;
		box-shadow: none;
		color: rgb(44, 62, 80);
	}
`;

export const FooterIcons = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`;

export const ChatSpace = styled.div`
	padding: 60px;
`;
export const Center = styled.div`
	display: flex;
	color: #9ab7fe;
	align-items: center;
	justify-content: center;
`;
export const UserChat = styled.div`
	min-height: 35px;
	display: flex;
	justify-content: end;
	margin: 1px;
`;

export const BotChat = styled.div`
	min-height: 35px;
	width: 100%;
	display: flex;
`;
export const BotPic = styled.div`
	height: 32px;
	width: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	padding: 4px;
	background-color: #e0e0e040;

	svg {
		border-radius: 6px;
		height: 24px;
		width: 24px;
	}
`;

export const UserPic = styled(BotPic)`
	svg {
		border-radius: 6px;
		height: 30px;
		width: 30px;
	}
`;

export const BotMessage = styled.div`
	width: 80%;
`;

export const BotMessageBtns = styled.div`
	width: 100%;
	display: flex;
	justify-content: left;
	flex-direction: row;
	flex-wrap: wrap;
`;

export const MessageDiv = styled.div`
	background: #e0e0e0;
	color: #4b5c6d;
	display: flex;
	flex-direction: column;
	width: fit-content;
	max-width: 80%;
	padding: 4px 8px;
	margin: 5px 5px 5px 10px;
	border-radius: 4px;
	word-break: break-word;
	font-weight: 400;
	font-size: 12px;
	position: relative;
`;

export const BotMessageBody = styled.div`
	background: #e0e0e0;
	color: #4b5c6d;
	display: flex;
	flex-direction: column;
	width: fit-content;
	max-width: 80%;
	padding: 4px 8px;
	margin: 5px 5px 5px 10px;
	border-radius: 4px;
	word-break: break-word;
	font-weight: 400;
	font-size: 12px;
	position: relative;

	::after {
		content: '';
		position: absolute;
		top: 4px;
		left: -5px;
		width: 0;
		height: 0;
		border-top: 6px solid transparent;
		border-bottom: 6px solid transparent;
		border-right: 6px solid #e0e0e0;
	}
`;

export const UserMessage = styled(BotMessageBody)`
	background: #ffde01;
	color: darkslategray;
	margin: 5px 10px 5px 5px;

	::after {
		content: '';
		position: absolute;
		top: 4px;
		right: -5px;
		left: unset;
		width: 0;
		height: 0;
		border-top: 6px solid transparent;
		border-bottom: 6px solid transparent;
		border-left: 6px solid #ffde01;
		border-right: none;
	}
`;

export const BotMessageBtn = styled.button`
	font-size: 10px;
	background: #ffff;
	display: flex;
	padding: 5px 4px;
	margin: 2px;
	border: 1px solid #ffde01;
	border-radius: 6px;
	box-shadow: 2px -2px 2px 0 rgba(178, 178, 178, 0.4);

	&:focus {
		background: #ffde01;
		color: #ffffff;
	}
	&:active {
		background: #ffde01;
		color: #ffffff;
	}
	&:hover {
		background: #ffde01;
		color: #ffffff;
	}
`;

export const TimeStamp = styled.div`
	font-size: 7px;
	text-align: right;
`;
export const LoadBtn = styled.button`
	padding-top: 5px;
	border: none;
	outline: none;
	display: flex;
	background: none;
	align-items: center;
	justify-content: center;
	width: 100%;
`;
export const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

export const UploderBox = styled.div`
	.primary.drag.upload-area {
		all: unset !important;
	}
	align-self: flex-start;

	.main_upload_container {
		border: none;
		padding: 10px 10px;
	}
	.drag.upload-container {
		font-size: 10px;
		svg {
			height: 20px;
			width: 20px;
		}
	}

	svg {
		height: 16px;
		width: 16px;
	}

	.core-ui-uploaded-file {
		p {
			width: 50px !important;
		}
	}
`;
export const Header = styled.div`
	display: flex;
`;

export const BotImageDiv = styled.div`
	img {
		margin-top: 5px;
		width: 200px;
		height: auto;
		border-radius: 5px;
	}
	.bot-file-download {
		background-color: white;
		position: relative;
		bottom: 20px;
		width: 15px;
		height: 15px;
		border-radius: 1px;
	}
`;

export const UserImageDiv = styled.div`
	img {
		margin-top: 8px;
		width: 200px;
		height: auto;
		position: relative;
		left: 8px;
		border-radius: 3px;
		overflow: hidden;
	}
	.user-file-download {
		background-color: white;
		position: relative;
		right: 10px;
		width: 15px;
		height: 15px;
		border-radius: 3px;
	}
`;

export const PdfDiv = styled.div`
	width: 200px;
	padding: 10px;
	border-radius: 5px;
	margin-top: 3px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.pdf-download {
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
`;

export const FileDiv = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const ShowFile = styled.div`
	height: ${({ appear }) => (appear ? `25px` : `0px`)};
	background: #fff;
	transition: left 1s;
	justify-content: space-between;
	display: flex;
	align-items: center;
	margin: auto;
	width: 90%;
`;

export const FileText = styled.div`
	height: 100%;
	font-size: 14px;
	color: #bdbdbd;
`;

export const FileDetails = styled.div`
	display: flex;
	font-size: 12px;
	color: #bdbdbd;
	align-items: center;
	justify-content: space-around;
	width: 100%;
`;

export const FileIconHolder = styled.div`
	height: 30px;
	width: 30px;
	display: flex;
	align-items: center;
`;

export const ImagePreview = styled(IcMImage)`
	height: 27px;
	width: 27px;
	fill: #bdbdbd;
`;

export const PDFIcon = styled(IcMPdf)`
	height: 27px;
	width: 27px;
	fill: #bdbdbd;
`;

export const AttachIcon = styled(IcMAttach)`
	height: 35px;
	width: 29px;
	fill: #bdbdbd;
	align-self: flex-end;
`;
