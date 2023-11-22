// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
export const ErrorHandler = {
	canHandle() {
		return true
	},
	handle(handlerInput, error) {
		console.log(`Error handled:`, error)
		console.log(
			`handlerInput.requestEnvelope.request:`,
			handlerInput.requestEnvelope.request,
		)
		console.log(
			'handlerInput.requestEnvelope.request.intent.name:',
			handlerInput.requestEnvelope.request.intent.name,
		)
		const speakOutput = 'Houve algum erro com o assistente'

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt(speakOutput)
			.getResponse()
	},
}
