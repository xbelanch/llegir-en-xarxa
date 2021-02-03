import WebFont from '/libs/webFontLoader'
// ---- WebFontFile.js
// Source: https://gist.github.com/supertommy/bc728957ff7dcb8016da68b04d3a2768

//const WebFont = window.WebFont;

export class WebFontFile extends Phaser.Loader.File
{
  /**
   * @param {Phaser.Loader.LoaderPlugin} loader
   * @param {string | string[]} fontNames
   * @param {string} [service]
   */

  constructor(loader, fontNames, service = 'google')
  {
    super(loader, {
      type: 'webfont',
      key: fontNames.toString()
    });

    this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames];
    this.service = service;
    this.fontsLoadedCount = 0;
  }
  load()
  {
    const config = {
      fontactive: (familyName) => {
	this.checkLoadedFonts(familyName)
      },
      fontinactive: (familyName) => {
	this.checkLoadedFonts(familyName)
      }
    }

    switch (this.service)
    {
      case 'google':
      config[this.service] = this.getGoogleConfig()
      break

      case 'adobe-edge':
      config['typekit'] = this.getAdobeEdgeConfig()

      default:
      throw new Error('Unsupported font service')
    }
    WebFont.load(config)
  }

  getGoogleConfig()
  {
    return {
      families: this.fontNames
    }
  }

  getAdobeEdgeConfig()
  {
    return {
      id: this.fontNames.join(';'),
      api: '//use.edgefonts.net'
    }
  }

  checkLoadedFonts(familyName)
  {
    if (this.fontNames.indexOf(familyName) < 0)
    {
      return
    }

    ++this.fontsLoadedCount
    if (this.fontsLoadedCount >= this.fontNames.length)
    {
      this.loader.nextFile(this, true)
    }
  }
}
