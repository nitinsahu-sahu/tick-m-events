export interface UnreadCounts {
  [conversationId: string]: number;
}

interface avatar {
  public_id: string;
  url: string;
}

interface Organizer {
  _id: string;
  name: string;
  email: string;
  avatar: avatar;
}

interface Event {
  _id: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  description: string;
  averageRating: number;
}

interface ServiceRequest {
  _id: string;
  serviceType: string;
  budget: string;
  description: string;
  additionalOptions: string;
}

interface ProviderProposal {
  amount: number | null;
  days: number;
  message: string;
}

export interface ConversationUser {
  _id: string;
  eventId: Event;
  organizerId: Organizer;
  serviceRequestId: ServiceRequest;
  providerId: string;
  status: string;
  contractStatus: string;
  orgBudget: number;
  orgRequirement: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  providerHasProposed: boolean;
  providerProposal: ProviderProposal;
}



interface Message {
  msgId?: string;
  user: {
    _id: string;
    name: string;
    email: string;
    profile: string;
  };
  message: string;
  updatedAt?: string;
  type: string;
  senderDeleteStatus?: string;
  receiverDeleteStatus?: string;
  tempId?: string; // Make this optional
}

export interface ConversationData {
  convId: any;
  userData: any;
  _id: string;
}

export interface MessagesState {
  conversationId?: string;
  receiver?: {
    receiverId: string;
  };
  messages: Message[];
}

interface User {
  receiverId: string;
  email: string;
  name: string;
  avatar: string;
}

export interface SocketUser {
  userId: string;
  socketId: string;
}
export interface SelectedUser {
  user: User;
  conversationId: string;
}