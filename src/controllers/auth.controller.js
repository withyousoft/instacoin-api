const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { authService, usersService } = require('../services');

module.exports = {
  signin: catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const response = await authService.signin(email, password);
    return res.status(StatusCodes.OK).json(response);
  }),

  refreshToken: catchAsync(async (req, res) => {
    const { token, refreshToken } = req.body;
    const response = await authService.refreshToken(token, refreshToken);
    return res.status(201).json(response);
  }),

  forgotPassword: catchAsync(async (req, res) => {
    const { email } = req.body;
    await authService.forgotPassword(email);
    return res.status(StatusCodes.NO_CONTENT).end();
  }),

  resetPassword: catchAsync(async (req, res) => {
    const {
      params: { token },
      body: { newPassword },
    } = req;
    await authService.resetPassword(token, newPassword);
    return res.status(StatusCodes.NO_CONTENT).end();
  }),

  customAuthWithInstagram: catchAsync(async (req, res) => {
    const { instagramId, instagramUsername } = req.body;
    const existedUser = await usersService.getByInstagramId(instagramId);
    if (!existedUser) {
      await usersService.create({ name: instagramUsername, email: instagramId, password: instagramId });
    }
    const response = await authService.signin(instagramId, instagramId);
    return res.status(StatusCodes.OK).json(response);
  }),
};
