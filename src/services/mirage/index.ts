import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from "miragejs";

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/messages", (schema, request) => {
        const { roomId } = request.queryParams as {
          roomId: number;
        };

        const messages = [];

        for (let i = 0; i < 5; i++) {
          messages.push({
            id: i + 1,
            content: `message ${i + 1} of room ${roomId}`,
            author: {
              id: i % 2,
              name: `Name User ${i + 1}`,
              nickname: `Nickname User ${i + 1}`,
            },
          });
        }

        return new Response(200, {}, { messages });
      });

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
