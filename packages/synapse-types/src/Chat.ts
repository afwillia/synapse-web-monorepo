// Type for AgentAccessLevel
export enum AgentAccessLevel {
  PUBLICLY_ACCESSIBLE = 'PUBLICLY_ACCESSIBLE',
  READ_YOUR_PRIVATE_DATA = 'READ_YOUR_PRIVATE_DATA',
  WRITE_YOUR_PRIVATE_DATA = 'WRITE_YOUR_PRIVATE_DATA',
}

// Type for CreateAgentSessionRequest
export type CreateAgentSessionRequest = {
  /**
   * Required. Specifies the access level that the agent will have during this session only.
   */
  agentAccessLevel: AgentAccessLevel
  /**
   * Optional. When provided, the registered agent will be used for this session. When excluded the default 'baseline' agent will be used.
   */
  agentRegistrationId?: string
}
export type UpdateAgentSessionRequest = {
  /**
   * Required. Specifies the access level that the agent will have during this session only.
   */
  agentAccessLevel: AgentAccessLevel
  /**
   * The unique identifier for a conversation with an agent. The sessionId issued by Synapse when the session is started.
   * The caller must provide this sessionId with each chat request to identify a specific conversation with an agent.
   * A sessionId can only be used by the user that created it.
   */
  sessionId: string
}

// Type for AgentSession
export type AgentSession = {
  /**
   * The unique identifier for a conversation with an agent. The sessionId issued by Synapse when the session is started.
   * The caller must provide this sessionId with each chat request to identify a specific conversation with an agent.
   * A sessionId can only be used by the user that created it.
   */
  sessionId: string
  /**
   * Specifies the access level that the agent will have during this session only.
   */
  agentAccessLevel: AgentAccessLevel
  /**
   * The date this session was started.
   */
  startedOn: string
  /**
   * Identifies the agent that will be used for this session. The default value is null, which indicates
   * that the default agent will be used.
   */
  agentRegistrationId?: string
}

// Type for ListAgentSessionsRequest
export type ListAgentSessionsRequest = {
  /**
   * Forward the returned 'nextPageToken' to get the next page of results.
   */
  nextPageToken?: string
}

// Type for ListAgentSessionsResponse
export type ListAgentSessionsResponse = {
  /**
   * A single page of agent sessions.
   */
  page: AgentSession[]
  /**
   * Forward this token to get the next page of results.
   */
  nextPageToken?: string
}

// Type for AgentChatRequest
export type AgentChatRequest = {
  /**
   * The sessionId that identifies the conversation with the agent.
   */
  sessionId: string
  /**
   * The user's text message to send to the agent.
   */
  chatText: string
  /**Optional. When trace is enabled, the agent will include information about its decision process and the functions/tools it will use to process this request. Default value is false. */
  enableTrace?: boolean
}

// Type for AgentChatResponse
export type AgentChatResponse = {
  /**
   * The sessionId that identifies the conversation with the agent.
   */
  sessionId: string
  /**
   * The agent's text response to the user's request.
   */
  responseText: string
}

// Represents a request for a single page of a session's history
export type SessionHistoryRequest = {
  /**
   * The sessionId that identifies the conversation with the agent.
   */
  sessionId?: string
  nextPageToken?: string // Optional field to request the next page of results
}

// Represents a single interaction between the user and an agent
export type Interaction = {
  usersRequestText: string // The text of the user's request
  usersRequestTimestamp: string // ISO 8601 date-time format for when the user made the request
  agentResponseText: string // The text of the agent's response
  agentResponseTimestamp: string // ISO 8601 date-time format for when the agent produced the response
}

// Represents a response containing a single page of a session's history
export type SessionHistoryResponse = {
  sessionId: string // The session ID of this conversation's history
  page: Interaction[] // Array of interactions in the session's history, ordered by interaction timestamp
  nextPageToken?: string // Optional token to retrieve the next page of results
}

// TraceEvent type
export type TraceEvent = {
  /**
   * The time stamp identifies when the agent generated this trace event.
   * It is also used to uniquely identify this event within the context of this asynchronous job.
   */
  timestamp: number
  /**
   * The trace text message generated by the agent while processing a chat request.
   */
  message: string
}

// TraceEventsResponse type
export type TraceEventsResponse = {
  /**
   * The job ID issued when the agent chat request job was started.
   */
  jobId: string
  /**
   * A single page of trace events ordered by time stamp descending.
   */
  page: TraceEvent[]
}

export type TraceEventsRequest = {
  /**
   * The job ID issued when the agent chat request job was started.
   */
  jobId: string

  /**
   * When a time stamp value is provided, only trace events that occurred after the provided time stamp will be included in the results.
   */
  newerThanTimestamp?: number // Optional since the JSON definition allows for it to be omitted
}