export const RMQ_CONSTANTS = {
  get RMQ_USERNAME(): string {
    return "root";
  },
  get RMQ_PASSWORD(): string {
    return "password";
  },
  get RMQ_HOSTNAME(): string {
    return "localhost";
  },
  get RMQ_PORT(): number {
    return 5672;
  },
  get RMQ_QUEUE(): string {
    return "test";
  }
};
