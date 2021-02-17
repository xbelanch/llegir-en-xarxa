//--
//-- Mail.js
//--
//-- @Note:
//-- @Todo:
//-- @From:
import PhoneApp from '/scenes/main/PhoneApp';
import MailListObject from '/prefabs/mail/MailList.js';

export default class MailApp extends PhoneApp
{
  constructor()
  {
    super({ key: 'MailApp'});
  }

  init()
  {
    let t = this;

    super.init();
    t.getConfig('mail');

    t.elements = {
      'title': {
        'fontSize': t.calcDPR(26),
        'y': t.calcDPR(80)
      },
      'headings': {
        'fontSize': t.calcDPR(20),
        'padding': t.calcDPR(28)
      }
    }
  }

  create()
  {
    // --- This need to refactor?
    let t = this;

    // --- Title
    let text = t.add.text(0,0,
      "Correu",
      t.getTextProperties({fontSize : t.elements['title']['fontSize']})
    );

    t.addRow(text);

    // --- Display a list mails
    let mails = new MailListObject(t, t.config);
  }
}
