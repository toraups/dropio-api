class RootController {
  // @desc    Get root message
  // @route   GET /
  // @access  Public
  static getRootMessage = (req, res) => {
    res
      .status(200)
      .json({ message: "Welcome to Dropio API", timestamp: new Date() });
  };
}

export default RootController;
