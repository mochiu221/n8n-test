import { INodeProperties } from "n8n-workflow";
import * as createContact from './createContact';

export { createContact };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Create Contact',
				value: 'createContact',
				description: 'Create a new contact',
				action: 'Create a new contact',
			}
		],
		default: 'create',
		noDataExpression: true,
	},
	...createContact.description
];
