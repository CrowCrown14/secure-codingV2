import { FromSchema } from 'json-schema-to-ts'

const userCreateSessionRequestBody = {
    "title": "userCreateSessionRequestBody",
    "type": "object",
    "properties": {
        "email": {
            "type": "string"
        },
        "password": {
            "type": "string"
        }
    },
  } as const;

  export type UserCreateSessionRequestBody = FromSchema<typeof userCreateSessionRequestBody>