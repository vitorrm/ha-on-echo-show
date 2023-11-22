import { openURL } from '../actions/echo-show/open-url.js'

export const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
	},
	handle(handlerInput) {
		const speakOutput = 'Ok'

		return openURL(
			handlerInput.responseBuilder,
			`${process.env.HA_ENDPOINT}/lovelace/default_view`,
		)
			.speak(speakOutput)
			.getResponse()
	},
}
