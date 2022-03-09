export const UserPermission = {
  Access: 1 << 0,
  ViewProfile: 1 << 1,
  SendMessage: 1 << 2,
  Invite: 1 << 3,
};

export const ChannelPermission = {
  View: 1 << 0,
  SendMessage: 1 << 1,
  ManageMessages: 1 << 2,
  ManageChannel: 1 << 3,
  VoiceCall: 1 << 4,
  InviteOthers: 1 << 5,
  EmbedLinks: 1 << 6,
  UploadFiles: 1 << 7,
  Masquerade: 1 << 8,
};

export const ServerPermission = {
  View: 1 << 0,
  ManageRoles: 1 << 1,
  ManageChannels: 1 << 2,
  ManageServer: 1 << 3,
  KickMembers: 1 << 4,
  BanMembers: 1 << 5,
  ChangeNickname: 1 << 12,
  ManageNicknames: 1 << 13,
  ChangeAvatar: 1 << 14,
  RemoveAvatars: 1 << 15,
};

export const BadgesFlags = {
  Developer: 1 << 0,
  Translator: 1 << 1,
  Supporter: 1 << 2,
  ResponsibleDisclosure: 1 << 3,
  Founder: 1 << 4,
  PlatformModeration: 1<<5,
  ActiveSupporter: 1<<6,
  Paw: 1<<7,
  EarlyAdopter: 1 << 8,
  ReservedRelevantJokeBadge1: 1<<9
}

export const U32_MAX = 2 ** 32 - 1; // 4294967295

export const DEFAULT_PERMISSION_DM =
  ChannelPermission.View +
  ChannelPermission.SendMessage +
  ChannelPermission.ManageChannel +
  ChannelPermission.VoiceCall +
  ChannelPermission.InviteOthers +
  ChannelPermission.EmbedLinks +
  ChannelPermission.UploadFiles +
  ChannelPermission.Masquerade;
  
export const Events = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  DROPPED: 'dropped',
  READY: 'ready',
  LOGOUT: 'logout',
  PACKET: 'packet',
  MESSAGE: 'message',
  MESSAGE_UPDATE: 'message/update',
  MESSAGE_DELETE: 'message/delete',
  CHANNEL_CREATE: 'channel/create',
  CHANNEL_DELETE: 'channel/delete',
  CHANNEL_UPDATE: 'channel/update',
  SERVER_UPDATE: 'server/update',
  SERVER_DELETE: 'server/delete',
  ROLE_DELETE: 'role/delete',
  ROLE_UPDATE: 'role/update',
  MEMBER_UPDATE: 'member/update',
  MEMBER_JOIN: 'member/join',
  MEMBER_LEAVE: 'member/leave',
  MEMBER_RELATIONSHIP: 'member/relationship'
}

export const Colors = {
  DEFAULT: '#000000',
  WHITE: '#ffffff',
  AQUA: '#1abc9c',
  GREEN: '#57f287',
  BLUE: '#3498db',
  YELLOW: '#fee75c',
  PURPLE: '#9b59b6',
  LUMINOUS_VIVID_PINK: '#e91e63',
  FUCHSIA: '#eb459e',
  GOLD: '#f1c40f',
  ORANGE: '#e67e22',
  RED: '#ed4245',
  GREY: '#95a5a6',
  NAVY: '#34495e',
  DARK_AQUA: '#11806a',
  DARK_GREEN: '#1f8b4c',
  DARK_BLUE: '#206694',
  DARK_PURPLE: '#71368a',
  DARK_VIVID_PINK: '#ad1457',
  DARK_GOLD: '#c27c0e',
  DARK_ORANGE: '#a84300',
  DARK_RED: '#992d22',
  DARK_GREY: '#979c9f',
  DARKER_GREY: '#7f8c8d',
  LIGHT_GREY: '#bcc0c0',
  DARK_NAVY: '#2c3e50',
  BLURPLE: '#5865f2',
  GREYPLE: '#99aab5',
  DARK_BUT_NOT_BLACK: '#2c2f33',
  NOT_QUITE_BLACK: '#23272a',
};