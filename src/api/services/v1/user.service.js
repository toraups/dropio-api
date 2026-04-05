import User from "../../models/user.model.js";
import ValidationError from "../../utils/error-factory/ValidationError.js";
import AuthenticationError from "../../utils/error-factory/AuthenticationError.js";
import QueryBuilder from "../../utils/QueryBuilder.js";

class UserService {
  // Update profile
  static updateMe = async (id, input) => {
    const { name } = input;

    const user = await User.findById(id);

    if (name) user.name = name;
    await user.save();

    return { message: "User profile updated", data: user.toObject() };
  };

  // Update password
  static updatePassword = async (id, input) => {
    const { oldPassword, newPassword } = input;

    const user = await User.findById(id).select("+password");

    if (!oldPassword || !newPassword) {
      throw new ValidationError("Old and new passwords must be provided");
    }

    if (oldPassword === newPassword) {
      throw new ValidationError(
        "New password cannot be the same as the old password",
      );
    }

    if (!(await user.verifyPassword(oldPassword))) {
      throw new AuthenticationError("Invalid credentials");
    }

    user.password = newPassword;
    await user.save();

    return { message: "User password updated", data: user.toObject() };
  };

  // Delete profile
  static deleteMe = async (id) => {
    await User.findByIdAndDelete(id);

    return { message: "User profile deleted" };
  };

  // @desc    Get users
  // @access  Public
  static getUsers = async (queryParams) => {
    const query = new QueryBuilder(User, queryParams)
      .search(["name", "email"])
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const users = await query.exec();

    return { message: "Users retrieved", data: users };
  };
}

export default UserService;
