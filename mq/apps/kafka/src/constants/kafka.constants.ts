export const KAFKA_CONSTANTS = {
  CLIENT: {
    get KAFKA_HOSTNAME() {
      return "localhost";
    },
    get KAFKA_BROKERS() {
      const HOSTNAME = KAFKA_CONSTANTS.CLIENT.KAFKA_HOSTNAME;

      return [`${HOSTNAME}:9092`, `${HOSTNAME}:9093`, `${HOSTNAME}:9094`];
    }
  },
  CONSUMER: {
    get KAFKA_CONSUMER_GROUP_ID() {
      return "kafka-sample-consumer";
    }
  }
};
