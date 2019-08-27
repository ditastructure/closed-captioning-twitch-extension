let clientId = '';
let channelId = '';
let token = '';
let tuid = '';
let channelName = '';

const twitch = window.Twitch.ext;

twitch.onContext(function (context) {
  twitch.rig.log(context);

  document.body.className = 'theme-' + context.theme;
});

twitch.onAuthorized(function (auth) {
  // save our credentials
  clientId = auth.clientId;
  channelId = auth.channelId;
  token = auth.token;
  tuid = auth.userId;

  fetch('https://api.twitch.tv/kraken/channels/' + channelId, {
    headers: {
      'client-id': clientId,
      'accept': 'application/vnd.twitchtv.v5+json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    twitch.rig.log(data);
    channelName = data.name;
    updateCaptions();
  }).catch(function (error) {
    twitch.rig.log(error);
  });
});

function updateCaptions () {
  if (!channelName) {
    twitch.rig.log('No channel name');
  } else {
    twitch.rig.log('Updating captions');

    fetch('https://closed-captioning.glitch.me/api/captions/' + channelName)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        twitch.rig.log(data);
        document.querySelector('#captions span').innerText = data.caption;
        setTimeout(updateCaptions, 1000);
      })
      .catch(function (error) {
        twitch.rig.log(error);
      });
  }
}
