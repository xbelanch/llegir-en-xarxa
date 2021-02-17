
/**
 * Get password from the URL
 */
Phaser.Game.prototype.getPassword = function() {
  const url = window.location.href;
  const param = 'pass';
  const reg = new RegExp( '[?&]' + param + '=([^&#]*)', 'i' );
  const passValue = reg.exec(url);

  return passValue;
}

/**
 * Update URL with password
 */
Phaser.Game.prototype.updateURL = function(value) {
  const url = window.location.href;
  const passValue = this.getPassword();

  let path = url;
  if (passValue) {
    path = url.replace(passValue[0], "");
  }

  if (value !== undefined) {
    window.history.pushState("", "", path + '?pass=' + value);
  } else {
    window.history.pushState("", "", path);
  }
};