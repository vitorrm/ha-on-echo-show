import Alexa from 'ask-sdk-core'

/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
export const FallbackIntentHandler = {
	canHandle(handlerInput) {
		return (
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) ===
				'AMAZON.FallbackIntent'
		)
	},
	handle(handlerInput) {
		const speakOutput = 'Assistente não entendeu. Repita.'

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt(speakOutput)
			.getResponse()
	},
}
