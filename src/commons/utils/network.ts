export function isLocalhost(ipString) {
  return (
    ipString === '127.0.0.1' ||
    ipString === '::ffff:127.0.0.1' ||
    ipString === '::1'
  );
}
