export = {
  post: {
    tags: ['Auth'],
    description:
      'sign-in using email and password, you will get a verify token and code. Then got to /verify route to verify using token and code to sign-in',
    operationId: 'signIn',
    security: [
      {
        appId: [],
        apiKey: [],
        appVersion: [],
        deviceInfo: [],
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/signInInput',
          },
        },
      },
    },
    responses: {
      200: {
        $ref: '#/components/responses/SuccessSignUp',
      },
      400: {
        $ref: '#/components/responses/BadRequest',
      },
      500: {
        $ref: '#/components/responses/InternalServerError',
      },
    },
  },
};
