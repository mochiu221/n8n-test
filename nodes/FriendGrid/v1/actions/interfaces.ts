import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type FriendGridMap = {
	user: 'createContact';
};

export type FriendGrid = AllEntities<FriendGridMap>;

export type FriendGridUser = Entity<FriendGridMap, 'user'>;

export type UserProperties = PropertiesOf<FriendGridUser>;
