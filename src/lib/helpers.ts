import {
  Message,
  MessageBehavior,
  MessageDBSelect,
  Thread,
  ThreadWithMessagesAndParticipants,
  User,
  UserDBSelect,
  UserID,
} from "./types";

export function mapDbThreadToTextsThread(
  obj: ThreadWithMessagesAndParticipants
) {
  const thread: Thread = {
    id: obj.id,
    title: obj.title === null ? undefined : obj.title,
    isUnread: obj.isUnread === null ? false : obj.isUnread,
    lastReadMessageID:
      obj.lastReadMessageID === null ? undefined : obj.lastReadMessageID,
    isReadOnly: obj.isReadOnly === null ? false : obj.isReadOnly,
    isArchived: obj.isArchived === null ? undefined : obj.isArchived,
    isPinned: obj.isPinned === null ? undefined : obj.isPinned,
    type: obj.type || "single",
    timestamp: obj.timestamp || new Date(),
    imgURL: obj.imgURL === null ? undefined : obj.imgURL,
    createdAt: obj.createdAt === null ? undefined : obj.createdAt,
    description: obj.description === null ? undefined : obj.description,
    messageExpirySeconds:
      obj.messageExpirySeconds === null ? undefined : obj.messageExpirySeconds,
    participants: {
      items: obj.participants.map((userId) => {
        return mapDbUserToTextsUser(userId.participants);
      }),
      hasMore: false,
    },
    messages: {
      items: obj.messages.map((message) => {
        return mapDbMessageToTextsMessage(message);
      }),
      hasMore: false,
    },
    extra: obj.extra || undefined,
  };

  return thread;
}

export function mapDbMessageToTextsMessage(obj: MessageDBSelect) {
  const message: Message = {
    id: obj.id,
    timestamp: obj.timestamp || new Date(),
    editedTimestamp:
      obj.editedTimestamp === null ? undefined : obj.editedTimestamp,
    expiresInSeconds:
      obj.expiresInSeconds === null ? undefined : obj.expiresInSeconds,
    senderID: obj.senderID === null ? "" : obj.senderID,
    text: obj.text === null ? undefined : obj.text,
    seen: obj.seen === null ? undefined : obj.seen,
    threadID: obj.threadID === null ? undefined : obj.threadID,
    isDelivered: obj.isDelivered === null ? undefined : obj.isDelivered,
    isHidden: obj.isHidden === null ? undefined : obj.isHidden,
    isSender: obj.isSender === null ? undefined : obj.isSender,
    isAction: obj.isAction === null ? undefined : obj.isAction,
    isDeleted: obj.isDeleted === null ? undefined : obj.isDeleted,
    isErrored: obj.isErrored === null ? undefined : obj.isErrored,
    behavior: obj.behavior ? (obj.behavior as MessageBehavior) : undefined,
    accountID: obj.accountID === null ? undefined : obj.accountID,
    extra: obj.extra || undefined,
  };

  return message;
}

export function mapDbUserToTextsUser(obj: UserDBSelect) {
  const user: User = {
    id: obj.id,
    username: obj.username === null ? undefined : obj.username,
    phoneNumber: obj.phoneNumber === null ? undefined : obj.phoneNumber,
    email: obj.email === null ? undefined : obj.email,
    fullName: obj.fullName === null ? undefined : obj.fullName,
    nickname: obj.nickname === null ? undefined : obj.nickname,
    imgURL: obj.imgURL === null ? undefined : obj.imgURL,
    isVerified: obj.isVerified === null ? undefined : obj.isVerified,
    cannotMessage: obj.cannotMessage === null ? undefined : obj.cannotMessage,
    isSelf: obj.isSelf === null ? undefined : obj.isSelf,
  };

  return user;
}

export const extraMap = new Map<UserID, any>();

export function getExtra(userID: UserID) {
  const extra = extraMap.get(userID);

  return extra;
}
