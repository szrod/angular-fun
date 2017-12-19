export type WebSocketFactory = (url: string, protocols?: string | string[]) => WebSocket;

export const defaultWebsocketFactory: WebSocketFactory = (url: string, protocol?: string): WebSocket =>
  new WebSocket(url, protocol);
