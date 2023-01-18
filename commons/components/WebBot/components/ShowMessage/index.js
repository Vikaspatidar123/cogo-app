import { IcMDownload, IcMPdf } from '@cogoport/icons-react';
import {
	UserChat,
	BotChat,
	BotMessage,
	BotPic,
	UserPic,
	UserMessage,
	BotMessageBody,
	BotMessageBtns,
	BotContainer,
	BotMessageBtn,
	TimeStamp,
	BotImageDiv,
	UserImageDiv,
	PdfDiv,
} from '../styles';

import UserIcon from '../../icons/user_icon.svg';
import CogoLogo from '../../icons/cogo-logo.svg';
import { AllMesssages } from './styles';

function ShowMessage({ ButtonReply, messages }) {
	return (
		<AllMesssages>
			{messages.map((step) => {
				const { conversation_type, imgUrl, pdfUrl, response, sent_at } =
					step || {};
				const { message, btn } = response || {};
				return (
					<div>
						{conversation_type === 'received' ? (
							<BotContainer>
								<BotChat>
									<BotPic>
										<CogoLogo />
									</BotPic>
									<BotMessage>
										<BotMessageBody>
											{imgUrl && (
												<BotImageDiv>
													<img src={imgUrl} alt="img" />
													<IcMDownload
														className="bot-file-download"
														onClick={() => {
															window.open(imgUrl);
														}}
													/>
												</BotImageDiv>
											)}
											{pdfUrl && (
												<PdfDiv>
													<IcMPdf width={40} height={40} />
													{pdfUrl.split('/')[4]}
													<IcMDownload
														className="pdf-download"
														onClick={() => {
															window.open(pdfUrl);
														}}
													/>
												</PdfDiv>
											)}

											<div>{message}</div>
											<TimeStamp>{sent_at}</TimeStamp>
										</BotMessageBody>

										<BotMessageBtns>
											{btn?.map((bt) => {
												return (
													<BotMessageBtn
														onClick={() => {
															ButtonReply(bt);
														}}
													>
														{bt}
													</BotMessageBtn>
												);
											})}
										</BotMessageBtns>
									</BotMessage>
								</BotChat>
							</BotContainer>
						) : (
							<UserChat>
								<UserMessage>
									<>
										{imgUrl && (
											<UserImageDiv>
												<img src={imgUrl} alt="img" />
												<IcMDownload
													className="user-file-download"
													onClick={() => {
														window.open(imgUrl);
													}}
												/>
											</UserImageDiv>
										)}
										{pdfUrl && (
											<PdfDiv>
												<IcMPdf width={40} height={40} />
												{pdfUrl.split('/')[4]}
												<IcMDownload
													className="pdf-download"
													onClick={() => {
														window.open(pdfUrl);
													}}
												/>
											</PdfDiv>
										)}
									</>
									<div>{message}</div>
									<TimeStamp>{sent_at}</TimeStamp>
								</UserMessage>
								<UserPic>
									<UserIcon />
								</UserPic>
							</UserChat>
						)}
					</div>
				);
			})}
		</AllMesssages>
	);
}

export default ShowMessage;
