import { KafkaClient } from "@buxlo/common";

class MessageBroker {
  private _kafka: KafkaClient;
  constructor() {
    this._kafka = new KafkaClient();
  }

  async connect() {
    const KAFKA_BROKER = process.env.KAFKA_BROKER || "localhost:9092";
    const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || "user-service";
    const KAFKA_GROUP_ID = process.env.KAFKA_GROUP_ID || "user-group";
    await this._kafka.connect(KAFKA_CLIENT_ID, [KAFKA_BROKER], KAFKA_GROUP_ID);
    this.setupConsumers();
  }

  async disconnect() {
    try {
      console.log("Disconnecting from Kafka...");
      await this._kafka.disconnect();
      console.log("Disconnected from Kafka");
    } catch (error) {
      console.error("Error while disconnecting from Kafka:", error);
    }
  }

  private setupConsumers() {
  }

  getKafkaClient() {
    return this._kafka;
  }
}

export const messageBroker = new MessageBroker();
