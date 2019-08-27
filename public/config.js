let token, userId;

const twitch = window.Twitch.ext;

twitch.onContext((context) => {
  twitch.rig.log(context);

  document.body.className = 'theme-' + context.theme;
});

twitch.onAuthorized((auth) => {
  token = auth.token;
  userId = auth.userId;
});
