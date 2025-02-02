export const CancelAndStopIntentHandler = {
	canHandle(handlerInput) {
		return (
			handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
			(handlerInput.requestEnvelope.request.intent.name ===
				'AMAZON.CancelIntent' ||
				handlerInput.requestEnvelope.request.intent.name ===
					'AMAZON.StopIntent')
		)
	},
	handle(handlerInput) {
		const speakOutput = 'Ok!'
		return handlerInput.responseBuilder.speak(speakOutput).getResponse()
	},
}
