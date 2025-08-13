import { INodeTypeDescription, NodeConnectionType } from "n8n-workflow";

import * as user from './user';

export const versionDescription: INodeTypeDescription = {
	displayName: 'FriendGrid',
	name: 'friendGrid',
	icon: 'file:friendGrid.svg',
	group: ['transform'],
	version: 1,
	subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
	description: 'Consume SendGrid API',
	defaults: {
		name: 'FriendGrid',
	},
	inputs: [NodeConnectionType.Main],
	outputs: [NodeConnectionType.Main],
	credentials: [
		{
			name: 'friendGridApi',
			required: true,
		},
	],
	properties: [
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			options: [
				{
					name: 'User',
					value: 'user',
				},
			],
			default: 'user',
			noDataExpression: true,
			required: true,
			description: 'Create a new user',
		},
		...user.descriptions,
	],
};
