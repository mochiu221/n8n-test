import { INodeTypeBaseDescription, IVersionedNodeType, VersionedNodeType } from "n8n-workflow";
import { FriendGridV1 } from "./v1/FriendGridV1.node";

export class FriendGrid extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'FriendGrid',
			name: 'friendGrid',
			icon: 'file:friendGrid.svg',
			group: ['transform'],
			subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
			description: 'Consume SendGrid API',
			defaultVersion: 1,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new FriendGridV1(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
