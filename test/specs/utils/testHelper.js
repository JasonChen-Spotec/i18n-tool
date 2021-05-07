export const getRequestParams = async nextObj => {
  const { CALL, PUT } = nextObj.value;
  if (CALL) {
    return {
      apiPath: await nextObj.value.CALL.fn(),
      args: nextObj.value.args
    };
  }

  if (PUT) {
    return PUT.action;
  }

  return {};
};

