import { openURL } from '../actions/echo-show/open-url.js'

export const OpenRecipesIntentHandler = {
	canHandle(handlerInput) {
		return (
			handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
			handlerInput.requestEnvelope.request.intent.name === 'OpenRecipesIntent'
		)
	},
	handle(handlerInput) {
		const speakOutput = 'Ok'

		return openURL(
			handlerInput.responseBuilder,
			`${process.env.HA_ENDPOINT}/lovelace/receitas`,
		)
			.speak(speakOutput)
			.getResponse()
	},
}
