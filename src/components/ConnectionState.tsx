function ConnectionState({ isConnected }: { isConnected: boolean }) {
  return <div>{isConnected ? "connect" : "disconnect"}</div>;
}

export default ConnectionState;
