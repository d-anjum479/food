const getUserController = async (req, res) => {
  res.status(200).send({
    message: "ok",
  });
};

export { getUserController };
