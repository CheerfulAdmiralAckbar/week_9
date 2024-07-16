const isData = async (req, res, next) => {
  console.log("isData middleware hit and username: ", req.body.username);
  try {
    if (!req.body.username) {
      res.status(422).json({ message: "data is incomplete" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// checks if string is lowercase and makes lower
const isLowerCase = async (req, res, next) => {
  try {
    // code here

    req.body.username = req.body.username.toLowerCase();
    // req.body.username is the string "MICHAEL"
    // req.body.username = "michael"

    // const lowerCheck = new String(req.body.username);
    // if (req.body.username !== req.body.username.toLowerCase()) {
    //   req.body.username = req.body.username.toLowerCase();
    // }

    // const checkLower = (data) => {
    //   return data === data.toLowerCase();
    // };

    // if (!checkLower(req.body.username)) {
    //   req.body.username = req.body.username.toLowerCase();
    // }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// checks if email is valid using regex
const isValidEmail = async (req, res, next) => {
  try {
    // code here

    // const checkEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/;

    // if (!checkEmail.test(req.body.username)) {
    //   res.status(422).json({ message: "email not valid" });
    // }

    const checkEmail = new RegExp(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/);

    console.log("regex checkEmail: ", checkEmail);

    if (!checkEmail.test(req.body.email)) {
      res.status(422).json({ message: "email not valid" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const isValidUser = async (req, res, next) => {
  const username = req.body.username.toLowerCase();
  try {
    if (!req.body.username || !req.body.password) {
      res.status(422).json({ message: "Username or password not entered" });
      return;
    }

    const user = User.findOne({ where: { username } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    if (user.password !== req.body.password) {
      res.status(403).json({ message: "Incorrect user details " });
    }

    req.user = user;
    next();
  } catch (error) {
    res.json({ error: error, message: error.message });
  }
};

module.exports = {
  isData,
  isLowerCase,
  isValidEmail,
  isValidUser,
};
