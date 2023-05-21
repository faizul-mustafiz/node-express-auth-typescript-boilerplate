export = {
  get: {
    tags: ['Users'],
    description: 'This route is for getting a user',
    operationId: 'getOneUser',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id',
        },
        required: true,
        description: 'A single user id',
      },
    ],
    security: [
      {
        appId: [],
        apiKey: [],
        appVersion: [],
        accessToken: [],
      },
    ],
    responses: {
      200: {
        $ref: '#/components/responses/SuccessGetUser',
      },
      401: {
        $ref: '#/components/responses/Unauthorized',
      },
      403: {
        $ref: '#/components/responses/Forbidden',
      },
      404: {
        $ref: '#/components/responses/NotFound',
      },
      500: {
        $ref: '#/components/responses/InternalServerError',
      },
    },
  },
};
