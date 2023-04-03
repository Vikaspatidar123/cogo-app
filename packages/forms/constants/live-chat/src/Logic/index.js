import SDK from '@livechat/chat-sdk';

// Initialize ChatSDK instance
export const ChatSDK = new SDK({ debug: true, apiVersion: 'v3.3' });

// Custom methods created with `ChatSDK.methodFactory`:

/**
 * Returns list of last 10 archived chats
 * Based on: https://developers.livechat.com/docs/messaging/agent-chat-api/rtm-reference#list-archives
 */
export const getArchives = () =>
	ChatSDK.methodFactory({
		action: 'list_archives',
		payload: { pagination: { limit: 10 } },
	});

/**
 * Returns threads that the current Agent has access to in a given chat.
 * @param {string} chat_id
 * @param {string[]} thread_ids
 * Based on: https://developers.livechat.com/docs/messaging/agent-chat-api/rtm-reference#list-threads
 */
export const getChatThreads = (chat_id, thread_ids) =>
	ChatSDK.methodFactory({
		action: 'list_threads',
		payload: { chat_id, thread_ids },
	});

/**
 * Restarts an archived chat..
 * @param {string} chat_id
 * Based on: https://developers.livechat.com/docs/messaging/agent-chat-api/rtm-reference#resume-chat
 */

export const resumeChat = (chat_id) =>
	ChatSDK.methodFactory({
		action: 'resume_chat',
		payload: { chat: { id: chat_id } },
	});

/**
 * Returns the info about the Customer with a given id.
 * @param {string} id
 * Based on: https://developers.livechat.com/docs/messaging/agent-chat-api/rtm-reference#get-customer
 */

export const getCustomer = (id) =>
	ChatSDK.methodFactory({
		action: 'get_customer',
		payload: { id },
	});
