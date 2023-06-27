export function useDynamicIntelligence() {
	const intelligence = [
		'Can I help you with anything today?',
		'How can I help you today?',
		'🙋‍♀️ How may I assist you? Let me know if you need any help.',
		"💬 Don't hesitate to ask for help! What can I assist you with?",
		"🤔 Do you have any questions or concerns? I'm here to help.",
		"👋 Hello! I'm here to help you",
	];

	const intelligenceLabel = Math.floor(Math.random() * intelligence.length);
	const chooseIntelligence = intelligence[intelligenceLabel];

	return { chooseIntelligence };
}
