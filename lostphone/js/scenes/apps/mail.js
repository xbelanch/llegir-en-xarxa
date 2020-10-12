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

  init()
  {
    let t = this;
    super.init();
    t.registry.set('activeApp', 'mailApp');    
  }

  preload()
  {
    let t = this;
    super.preload();
    t.colors = t.cache.json.get('config').colors;
    t.config = t.cache.json.get('mail');

  }
  
  create()
  {
    // --- This need to refactor?
    let t = this;
    super.create();

    // --- Display a list mails
    t.listMails();
  }

  listMails()
  {
    let t = this;
    new MailListObject(t, t.config);
  }

}
