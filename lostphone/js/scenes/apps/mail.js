//--
//-- Mail.js
//--
//-- @Note:
//-- @Todo:
//-- @From:


class MailApp extends App
{
  constructor()
  {
    super();
    this.config = null;
  }

  preload()
  {
    let t = this;
    t.colors = t.cache.json.get('config').colors;
    t.config = t.cache.json.get('mail');

  }
  
  init()
  {
    let t = this;
    t.registry.set('activeApp', 'mailApp');    
  }

  create()
  {
    // --- This need to refactor?
    let t = this;
    let { width, height } = t.getPhoneDimensions();
    t.width = width;
    t.height = height;
    t.x = width / 2;
    t.y = height / 2;
    let scale = t.getImageScale('home-wallpaper');
    let wallpaper = t.add.image(t.x, t.y, 'home-wallpaper')
        .setOrigin(0.5, 0.5)
        .setScale(scale.w, scale.h);
    t.graphics = t.add.graphics();

    // --- Display a list mails
    t.listMails();
  }

  listMails()
  {
    let t = this;
    new MailListObject(t, t.config);
  }

}
