export const userInfos = (user) => {
  const formatedUser = {
    id: user._id,
    userName: user.userName,
    email: user.email,
    emailConfirmed: user.verified,
    project: user.projects,
    surveys: user.surveys,
    panels: user.panels,
    theme: user.theme,
    // firstConnection: user.firstConnection,
  };
  return formatedUser;
};
