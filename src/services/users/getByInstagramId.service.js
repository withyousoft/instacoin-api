const { usersRepository } = require('../../repositories');

module.exports.getByInstagramId = async (instagramId) => {
  const user = await usersRepository.get({ email: instagramId });
  return user;
};
