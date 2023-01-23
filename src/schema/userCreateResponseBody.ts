import { FromSchema } from 'json-schema-to-ts'

export const userCreateResponseBody = {
    "title": "userCreateResponseBody",
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "firstName": {
            "type": "string"
        },
        "lastName": {
            "type": "string"
        },
        "email": {
            "type": "string"
        }
    },
  } as const;

  export type UserCreateResponseBody = FromSchema<typeof userCreateResponseBody>