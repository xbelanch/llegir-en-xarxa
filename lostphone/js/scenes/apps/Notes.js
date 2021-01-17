//--
//-- Notes.js
//--
//-- @Note:
//-- @Todo:
//-- @From:
import LostPhoneScene from '../LostPhoneScene';

class NotesApp extends LostPhoneScene
{
  constructor()
  {
    super();
  }

  init()
  {
    let t = this;
    super.init();
    t.registry.set('activeApp', 'notesApp');
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
