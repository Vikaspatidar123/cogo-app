export const FIREBASE_CONFIG = {
	apiKey            : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain        : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL       : process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId         : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket     : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId : process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
	appId             : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId     : process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const firestoreChatbotPath = '/customer_chat/platform_chat/rooms';
export const firestoreWhatsappPath = '/customer_chat/whatsapp/rooms';
