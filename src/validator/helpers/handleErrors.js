export default (error) => {
  if (error.details && error.details.length) {
    throw (error.details.map(({ message, path }) => ({ param: path, message })));
  }

  throw error;
};
