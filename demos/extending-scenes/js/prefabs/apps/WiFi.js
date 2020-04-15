//
// --- Wifi App
//

class WiFi extends App
{
  constructor()
  {
    // init() i preload() haurien de ser mètodes comunes a totes les apps
    super();
  }

  // @NOTE:
  // Recorda que els mètodes preload i init estan derivats de la class App
  
  create()
  {
    let t = this;
    console.log(t.MyApp + ' ' + t.From);
    t.myPrivate();
  }
}
