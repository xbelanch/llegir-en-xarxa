#  Documentació del disseny del miniop *Llegir en xarxa*

Aquest document té com a finalitat identificar aquells elements tant de l'àmbit del disseny com tècnic que permetin, en la mesura del possible:

* organitzar i distribuir les tasques de manera que...
* ...agilitzi el procés de desenvolupament i finalització del producte dins del calendari establert i, per tant,...
* ...proporcioni una visió general perquè ajudi a quantificar el cost econòmic d'hores en les tasques de:
  * recerca
  * documentació
  * consultoria
  * implementació
  * publicació

## Objectiu

Adaptar el contingut del miniop *Llegir en xarxa* en una "novel·la visual" on els estudiants interactuaran amb diferents aplicacions d'un mòbil fictici. El treball d'adaptació implicarà, per una banda, l'adequació dels continguts a aquest entorn fictici sense que això imploqui una afectació en el disseny original de la seqüència didàctica del miniop i, d'altra banda, la creació *ad hoc* de diferents recursos que permetin a l'estudiant recòrrer la seqüència de continguts (passatges) fins arribar a la proposta de la realització del projecte del miniop.


## Referències

Des dels principis del 2010 que diferents desenvolupadors han trobat en la metàfora visual de les aplicacions d'escriptori o apps de missatgeries instantànies un recurs idoni per a desenvolupar *ficcions interactives* o *novel·les visuals* amb un grau molt elevat d'immersió per part del jugador en la història o trama del joc. 

L'article [Why more video games look and feel like text messaging with friends](https://www.theverge.com/2017/3/28/15027520/video-games-smartphone-mobile-text-messages) descriu perfectament com la pràctica diària d'enviar missatges a familiars, amics, companys de feina, o compartir fotografies, vídeos, música... ha atrapat l'atenció no només en el món del cinema i la televisió sinó també en el món dels videojocs, amb la diferència que aquest últim, el jugador no participa com a simple espectador, sinó com a actor principal de la història.

Potser, una de les idees que es desprenen d'aquesta proposta, queda perfectament reflectida en l'anàlisi que fa l'autora de les tres novel·les visuals (Sara Is Missing, Replica, i A Normal Lost Phone):

> They task you with breaking into and exploring the contents of a stranger’s phone to find out more about the owner. By piecing together clues across text messages, emails, photos, and video clips, you’re able to figure out PIN codes and passwords. As you dive deeper into each phone, their stories unfold through the owner’s relationships and secrets.

O dit d'una altra manera: la fragmentació de la informació en els diferents formats disponibles avui dia en qualsevol mòbil (text, fotografia, àudio, música, videos, notes, correus, pàgines web visitades...) permet l'elaboració d'una narrativa no líneal que, a l'usuari final, no li resulta aliena. 

Deixem aquí una llista de referències de videojocs basats en aquest gènere de novel·la visual:

* [I've been texting with an astronaut](https://boingboing.net/2015/05/07/lifeline-astronaut-game.html)
* [Replica](https://somigames.com/replica/)
* [Emily is away](http://emilyisaway.com/)
* [Sara is Missing](https://saraismissing.itch.io/sim)
* [A normal lost phone](http://www.anormallostphone.com/)
* [Another Lost Phone: Laura's Story](https://store.steampowered.com/app/689910/Another_Lost_Phone_Lauras_Story/)
* [Simulacra: Pipe Dreams](https://store.steampowered.com/app/878320/SIMULACRA_Pipe_Dreams/)
* [Simulacra 2](https://store.steampowered.com/app/1011190/SIMULACRA_2/)
* [Alt-Frequencies](https://www.theverge.com/2019/5/19/18625057/alt-frequencies-audio-mystery-game-time-travel-accidental-queens-normal-another-lost-phone)
* [10 best texting games and text-based games for Android!](https://www.androidauthority.com/best-texting-games-text-based-games-android-926860/)

## Especificacions mòbil fictici

En aquesta secció s'inclou la llista de característiques del mòbil fictici que caldria implementar amb la idea de donar resposta a la integració de les diferents tipologies de continguts del miniop com també aquelles que permetin la interacció o jugabilitat de l'usuari amb la narrativa del miniop:

* **Pantalla d'inici** (sistema de desbloqueig)
* **Configuració**
* **Telèfon** 
* **Fotos**
* **Rellotge**
* **Recordatoris**
* **Notes**
* **Consells** (ajuda)
* **Calculadora**
* **Correu**
* **Podcasts**
* **Vídeos**
* **Biblioteca**
* **Arxius**
* **Navegador**
* **Calendari**
* **Missatgeria**
* **Tasques**: ha de servir d'ajuda a l'estudiant per saber què ha fet o les tasques que té pendent abans d'arribar al projecte.


## Estratègies interactivitat amb l'usuari


### Reptes

* Connectar-se a la xarxa wifi de la biblioteca perquè permeti navegar per aquelles pàgines visitades per la propietària del mòbil.
* Determinats continguts del mòbil requeriran d'una contrasenya.


## Disseny de la interfície



## Tecnologia

Possibles opcions:

### Progressive web app

Segons una primera avaluació del producte, es proposa l'ús de la tecnologia *progressive web app*. Sense haver d'entrar en detalls ([Why Progressive Web Apps](https://medium.com/the-web-tub/why-progressive-web-apps-a2c74bd6afdc)), aquest enfocament hauria de permetre l'agilitat suficient per desenvolupar les diferents parts, fonamentalment visual i lògica.

Una possible llibreria seria [Onsen UI](https://onsen.io/), que conté una llarga llista de components UI per a la creació de la interfície de la _web app_.

D'altra banda, s'inclou una sèrie de _demos_ (amb codi font) basats en HTML5, CSS3 i Javascript que, en certa manera, poden ser de gran ajut en la creació de la interfície de la novel·la visual del miniop:

* [Mobile Phone Simulator](https://github.com/RGladys/Mobile-Phone-Simulator)
* [Android v1.0 built rm11048294](https://codepen.io/biustudio/pen/gqVNKo)
* [Icons IOS](https://codepen.io/tessat/pen/dqcCo)
* [Google Android Lollipop](https://codepen.io/simoberny/pen/LVBgyE)
* [Android Lock Screen](https://codepen.io/khadkamhn/pen/EVaJLy)
* [Direct Messaging](https://codepen.io/supah/pen/jqOBqp)
* [Interactive CSS3 iPhone 6](https://codepen.io/MorenoDiDomenico/pen/jEyKxK)
* [WhatsApp in Pure CSS and JS](https://codepen.io/zenorocha/pen/eZxYOK)
* [Phone Gallery - grid switcher](https://codepen.io/simonpatrat/pen/meMJmx)

### Javascript Game Engine

És també una opció pensant en aquesta [demo realitzada amb PhaserJS](https://phaser.io/examples/v3/view/scenes/drag-scenes-demo#), però s'ajustava més a la metàfora de sistema operatiu fictici.


### MYOE (Make Your Own Engine) and CYOL (Choose Your Own Libraries) 

Per últim, pensar en la creació d'un web engine perquè permeti genera "visuals novels" similars a la dels exemples. 

Exemples de projectes similars: 

* [Monogatari Visual Novel Engine](https://monogatari.io/)
* [Awesome-Visual-Novel-Engine](https://github.com/kserks/Awesome-Visual-Novel-Engine)


## Cronograma


