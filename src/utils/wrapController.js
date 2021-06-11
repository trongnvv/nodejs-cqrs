module.exports = (controller) => {
  return (req, res, next) => {
    controller(req, res, next)
      .then((result) => {
        next({
          success: true,
          data: result,
          message: req.message ? req.message : null,
        });
      })
      .catch(next);
  };
};
