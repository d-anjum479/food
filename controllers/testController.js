const testController = (req, res) => {
  try {
    return res.status(200).send({
      success: true,
      message: "Test Output Success",
    });
  } catch (error) {
    console.log(`testController Error - ${error}`);
  }
};

export { testController };
