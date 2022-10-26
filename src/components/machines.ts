import { assign } from "cypress/types/lodash";
import { createMachine } from "xstate";

export const fetchUser = (userId: number) =>
  fetch(`url/to/user/${userId}`).then((res) => res.json());

interface userContext {
  userId: number;
  user: any;
  error: any;
}

const userMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFdZgE4DoCWEA2YAxAGICiAKgMIASA2gAwC6ioADgPazYAu27AdixAAPRAEYALADZM9KQCZpATgkAORfLGrVAGhABPRPIDMxzAFYAvpb2oMmPOwCGEbPyiEIAsDn4A3dgBrHxhuAFU0dAZmJBAOLl4BIVEECQB2GSl6JXlVYwl0+SlzKT1DBDEszDSrGxA7LEcXNw8MdHYsVjwnbgAzDoBbTFCIjGiheJ4+QViUyRk5RSkVdQlNbTLEPOtbSMxep2w8ZHQiACUKM4BNcdjJxJnQOelZBWU1DS1dA3FVMQtrHV+OwIHAhA0cPgwBNOFMkrNEGtXvJzJsECYJDt6nsmq53DCEtNkohjGIzGoJKTjEopBTjDU0ZV6AC6hDYMgAMYcuDwO6wh7EhC0mTmJTGBRpHI01QMn4VVQSFm7ewHI4naF8wnwp6I+SMsTyCx5Uwm035LENAlwx4iRAAWlKcodgMsQA */
  createMachine<userContext>({
    context: { userId: 42, user: undefined, error: undefined },
    id: "user",
    initial: "idle",
    states: {
      idle: {
        on: {
          FETCH: {
            target: "loading",
          },
        },
      },
      loading: {
        invoke: {
          src: (context, event) => fetchUser(context.userId),
          id: "getUser",
          onDone: [
            {
              target: "success",
              actions: assign({ user: (_, event) => event.data }),
            },
          ],
          onError: [
            {
              target: "failure",
              actions: assign({ error: (_, event) => event.data }),
            },
          ],
        },
      },
      success: {},
      failure: {
        on: {
          RETRY: {
            target: "loading",
          },
        },
      },
    },
  });
