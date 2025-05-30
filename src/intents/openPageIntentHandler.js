import { getSlot } from 'ask-sdk-core'
import { openURL } from '../actions/echo-show/open-url.js'

export const OpenPageIntentHandler = {
	canHandle(handlerInput) {
		return (
			handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
			handlerInput.requestEnvelope.request.intent.name === 'OpenPageIntent'
		)
	},
	handle(handlerInput) {
		const pageNumber = getSlot(handlerInput.requestEnvelope, 'page')
		console.log('pageNumber', pageNumber.value)

		return openURL(
			handlerInput.responseBuilder,
			`${process.env.CAMERA_ENDPOINT}`,
			// `${process.env.HA_ENDPOINT}/lovelace/default_view`,
		).getResponse()
	},
}
