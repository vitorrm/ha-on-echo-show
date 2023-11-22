import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const document = require('../../../documents/launchDocument.json')

const TOKEN = 'someToken'

export function openURL(responseBuilder, url) {
	return responseBuilder
		.addDirective({
			type: 'Alexa.Presentation.APL.RenderDocument',
			document,
			token: TOKEN,
		})
		.addDirective({
			type: 'Alexa.Presentation.APL.ExecuteCommands',
			token: TOKEN,
			commands: [
				{
					type: 'OpenURL',
					source: url,
					onFail: {
						type: 'SetValue',
						componentId: 'errorText',
						property: 'text',
						value: "That didn't work",
					},
				},
			],
		})
}
