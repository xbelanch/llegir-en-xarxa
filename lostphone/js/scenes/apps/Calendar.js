//--
//-- Calendar.js
//--
//-- @Note:
//-- @Todo:
//-- @From:
import LostPhoneScene from '../LostPhoneScene';

export default class CalendarApp extends LostPhoneScene
{
  constructor()
  {
    super();
  }

  init()
  {
    let t = this;
    super.init();
    t.registry.set('activeApp', 'calendarApp');
  }

  preload()
  {
    super.preload();
  }

  create()
  {
    let t = this;
    super.create();
  }

}
