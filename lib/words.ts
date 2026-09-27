// Başlangıç kelime havuzu. Veritabanı boşken bir kez yüklenir; sonrasında kelimeler görevli panelinden yönetilir.
// `quote` yalnızca metni doğrulanmış dizeler için doldurulur; emin olunmayan durumda `note` ile eseri tanıtın.
// Kelimeye özel resim DATA_DIR/art/kelimeler/<id>.png olarak durur; yoksa `image` alanındaki ortak resim kullanılır.
// kind: eser (klasik eser sözlüğü) · atasozu (atasözü ve deyimler) · yabanci (dilimize yerleşmiş yabancı sözcükler). Alan adları türe göre değişir.
export type Work = {id:string;title:string;author:string;period:string;month:string;kind?:string};
// meaning: günümüzdeki anlamı / karşılığı. oldMeaning: eserdeki (eski) anlamı. status: pending (öğrenci önerisi) · approved · rejected.
export type Word = {id:string;word:string;syllables:string;meaning:string;category:string;color:string;emoji:string;example:string;scene:string;image:string;work:string;quote?:string|null;note?:string|null;oldMeaning?:string|null;addedBy?:string|null;status?:string};
export const categories=['Değerler','Duygu','Doğa','Sanat','Eşya','Hayal'];
export const colors=['lilac','peach','yellow','sage'];
export const fallbackArt=['clouds','forest','sunrise','stars'];
// MEB "Dilimizin Zenginlikleri Projesi" 2025–2026 ortaöğretim eylem planındaki sözlük ayları ve temaları.
export const months=['Ekim','Kasım','Aralık','Şubat','Mart','Nisan','Mayıs'];
export const themes:Record<string,string>={Ekim:'Temel Eserlerle Sözlük Çalışmaları',Kasım:'Atasözleri ve Deyimler Sözlüğü',Aralık:'Dilimize Yerleşmiş Yabancı Sözcükler',Şubat:'Kutadgu Bilig ve Dîvânü Lügâti\'t-Türk Okumaları',Mart:'Mehmet Âkif ve Safahat Okumaları',Nisan:'Karşılaştırmalı Türk Lehçeleri Sözlüğü Okumaları',Mayıs:'Hoca Ahmet Yesevi ve Hikmet Okumaları'};
export const kinds={
eser:{label:'Eser sözlüğü',word:'Kelime',old:'Eserdeki (eski) anlamı',now:'Günümüzdeki anlamı',oldShort:'Eserde',nowShort:'Bugün',wordHint:'Örn. bilig',oldHint:'Örn. Bilgi, akıl',nowHint:'Bugün bu kelimeyi nasıl söylüyoruz? Hâlâ kullanılıyor mu?'},
atasozu:{label:'Atasözü ve deyim',word:'Atasözü / deyim',old:'Anlamı',now:'Açıklama',oldShort:'Anlamı',nowShort:'Açıklama',wordHint:'Örn. damlaya damlaya göl olur',oldHint:'Örn. Küçük birikimler zamanla büyür.',nowHint:'Atasözü mü deyim mi? Hangi durumda söylenir?'},
yabanci:{label:'Yabancı sözcük',word:'Yabancı sözcük',old:'Türkçe karşılığı',now:'Kökeni / açıklama',oldShort:'Türkçesi',nowShort:'Köken',wordHint:'Örn. selfie',oldHint:'Örn. özçekim',nowHint:'Hangi dilden geldi? Türkçesi neden daha iyi?'}};
export type Kind=keyof typeof kinds;
export const kindOf=(k?:{kind?:string}|null)=>kinds[(k?.kind??'eser') as Kind]??kinds.eser;
// Eserleri eylem planı ayına göre sıralar; ayı olmayanlar sona.
export const byMonth=(works:Work[])=>{const order=(k:Work)=>{const i=months.indexOf(k.month);return i<0?months.length:i;};return [...works].sort((a,b)=>order(a)-order(b));};
export const seedWorks: Work[] = [
// Ekim: temel eserlerden serbest sözlük çalışması
{id:'dede-korkut',title:'Dede Korkut Hikâyeleri',author:'Anonim',period:'Oğuz destan geleneği',month:'Ekim'},
{id:'mesnevi',title:'Mesnevî',author:'Mevlânâ Celâleddîn-i Rûmî',period:'13. yüzyıl',month:'Ekim'},
{id:'yunus-emre',title:'Yunus Emre Divanı',author:'Yunus Emre',period:'13.–14. yüzyıl',month:'Ekim'},
{id:'su-kasidesi',title:'Su Kasidesi',author:'Fuzûlî',period:'16. yüzyıl',month:'Ekim'},
{id:'vatan-silistre',title:'Vatan Yahut Silistre',author:'Namık Kemal',period:'1873',month:'Ekim'},
{id:'kasagi',title:'Kaşağı',author:'Ömer Seyfettin',period:'20. yüzyıl başı',month:'Ekim'},
{id:'calikusu',title:'Çalıkuşu',author:'Reşat Nuri Güntekin',period:'1922',month:'Ekim'},
{id:'semaver',title:'Semaver',author:'Sait Faik Abasıyanık',period:'1936',month:'Ekim'},
{id:'sessiz-gemi',title:'Sessiz Gemi',author:'Yahya Kemal Beyatlı',period:'20. yüzyıl',month:'Ekim'},
{id:'atasozleri-deyimler',title:'Atasözleri ve Deyimler',author:'(derleme)',period:'',month:'Kasım',kind:'atasozu'},
{id:'yabanci-sozcukler',title:'Dilimize Yerleşmiş Yabancı Sözcükler',author:'(derleme)',period:'',month:'Aralık',kind:'yabanci'},
{id:'kutadgu-bilig',title:'Kutadgu Bilig',author:'Yusuf Has Hâcib',period:'11. yüzyıl',month:'Şubat'},
{id:'divanu-lugatit-turk',title:'Dîvânü Lügâti\'t-Türk',author:'Kaşgarlı Mahmud',period:'11. yüzyıl',month:'Şubat'},
{id:'safahat',title:'Safahat',author:'Mehmet Âkif Ersoy',period:'20. yüzyıl',month:'Mart'},
{id:'istiklal-marsi',title:'İstiklâl Marşı',author:'Mehmet Âkif Ersoy',period:'1921',month:'Mart'},
{id:'turk-lehceleri-sozlugu',title:'Türk Lehçeleri Sözlüğü',author:'(derleme)',period:'',month:'Nisan'},
{id:'hikmetler',title:'Hikmetler',author:'Ahmet Yesevi',period:'12. yüzyıl',month:'Mayıs'}];
type Extra={quote?:string;note?:string};
type Seed=[word:string,work:string,oldMeaning:string,meaning:string,example:string,category:string,syllables:string,emoji:string,image:string,scene:string,extra?:Extra];
// Kelime · eser · eserdeki anlamı · günümüzdeki anlamı · örnek cümle · kategori · heceler (atasözü/deyimde türü) · simge · resim · sahne fikri · alıntı/not.
// Resim "kut.jpg" gibi uzantılıysa public/art altındaki kelimeye özel çizimdir; değilse ortak hazır resimdir.
// `quote` yalnızca metni doğrulanmış dizeler için doldurulur.
const seedRows:Seed[]=[
// Ekim · temel eserler
['Kopuz','dede-korkut','Eski Türklerin telli, gövdesi deriyle kaplı halk sazı.','Eski Türklerin telli, gövdesi deriyle kaplı halk sazı.','Festivalde robot kolumuz kopuzu çalmayı öğrendi.','Sanat','ko • puz','♫','forest','Çadırların önünde ateş başında kopuz çalan yaşlı bir ozan ve onu dinleyen gençler',{note:'Hikâyelerde Dede Korkut kopuzunu alıp boy boylar, soy soylar; yani olayları ozan olarak anlatır.'}],
['Ney','mesnevi','Kamıştan yapılan, üflenerek çalınan çalgı.','Kamıştan yapılan, üflenerek çalınan çalgı.','Neyin sesi rüzgârla birlikte bütün vadiye yayıldı.','Sanat','ney','♪','forest','Sazlık bir göl kıyısında ney üfleyen bir genç ve havada süzülen kuşlar',{note:'Mesnevî, sazlıktan koparılan neyin ayrılık şikâyetini dinlemeye çağıran beyitlerle başlar.'}],
['Sevi','yunus-emre','Sevgi.','Sevgi. Bugün “sevgi” diyoruz.','Sevi ile yapılan her iş gönülleri birbirine bağlar.','Değerler','se • vi','♡','forest','Farklı ülkelerden gençlerin el ele tutuştuğu yeşil bir tepe',{quote:'Ben gelmedim dava için, benim işim sevi için'}],
['Eşk','su-kasidesi','Gözyaşı.','Gözyaşı. Bugün kullanılmıyor.','Bayram sabahı dedemin gözlerinden sevinç eşki süzüldü.','Duygu','eşk','❍','clouds','Yağmur damlaları gibi parlayan gözyaşlarının gökkuşağına dönüştüğü bir gökyüzü',{quote:'Saçma ey göz eşkden gönlümdeki odlara su'}],
['Vatan','vatan-silistre','Bir milletin üzerinde yaşadığı, bağımsızlığını koruduğu toprak; yurt.','Yurt. Bugün de aynı anlamda kullanılır.','Vatan, üzerinde birlikte gülüp büyüdüğümüz topraktır.','Değerler','va • tan','⚑','sunrise','Gün doğarken dalgalanan bayrak ve tarlalarda, şehirlerde, denizde çalışan insanlar',{note:'Namık Kemal’in bu oyunu, Silistre Kalesi’nin savunmasını ve vatan sevgisini anlatır.'}],
['Kaşağı','kasagi','Atların tüylerini tımar etmekte kullanılan, dişli demir tarak.','Atların tüylerini tımar etmekte kullanılan, dişli demir tarak.','Dedemin ahırında paslanmış eski bir kaşağı bulduk.','Eşya','ka • şa • ğı','⋔','forest','Eski bir ahırda bir atı kaşağıyla tımar eden iki kardeş',{note:'Ömer Seyfettin’in hikâyesine adını veren bu eşya, bir çocuğun vicdanıyla hesaplaşmasının merkezindedir.'}],
['Çalıkuşu','calikusu','Çalılıklarda yaşayan, küçük, cıvıl cıvıl öten bir kuş.','Çalılıklarda yaşayan, küçük, cıvıl cıvıl öten bir kuş.','Bahçedeki çalıkuşu sabah erkenden şarkısına başladı.','Doğa','ça • lı • ku • şu','❦','forest','Çiçekli bir çalının dalında şarkı söyleyen küçük bir kuş',{note:'Reşat Nuri’nin romanında yerinde duramayan, neşeli Feride’nin lakabıdır.'}],
['Semaver','semaver','İçinde ateş yakılarak çay suyu kaynatılan, genellikle madenden araç.','Çay suyu kaynatılan madenî araç. Bugün de kullanılır.','Kış akşamları semaverin başında hep birlikte çay içeriz.','Eşya','se • ma • ver','♨','clouds','Buğulu pencereli sıcak bir mutfakta tüten parlak bir semaver',{note:'Sait Faik’in hikâyesinde sabahları kaynayan semaver, anne sevgisini ve evin sıcaklığını simgeler.'}],
['Meçhul','sessiz-gemi','Bilinmeyen.','Bilinmeyen. Bugün de kullanılır.','Uzay aracımız meçhul bir gezegene doğru yol aldı.','Hayal','meç • hul','✧','stars','Limandan yıldızlarla dolu bilinmeyen bir ufka doğru yola çıkan yelkenli bir gemi',{quote:'Meçhule giden bir gemi kalkar bu limandan'}],
// Kasım · atasözleri ve deyimler (heceler alanında türü: atasözü / deyim)
['damlaya damlaya göl olur','atasozleri-deyimler','Küçük birikimler zamanla büyük bir varlık oluşturur.','Atasözü. Sabırla yapılan küçük tasarrufları anlatırken söylenir.','Harçlığımdan her gün biraz ayırdım; damlaya damlaya göl olur derler ya, bisiklet paramı biriktirdim.','Değerler','atasözü','💧','clouds','Yağmur damlalarının birikerek pırıl pırıl bir göle dönüştüğü vadi'],
['sakla samanı gelir zamanı','atasozleri-deyimler','Gereksiz görülen bir şey bir gün işe yarayabilir.','Atasözü. Bir şeyi atmadan önce iki kez düşünmeyi öğütler.','Dedemin eski radyosu okul sergisinde en çok ilgi gören parça oldu; sakla samanı gelir zamanı.','Eşya','atasözü','🌾','forest','Eski bir ambarda saklanan saman balyaları ve kış günü onlarla beslenen atlar'],
['sabrın sonu selamettir','atasozleri-deyimler','Sabırlı olan sonunda iyiliğe ve kurtuluşa ulaşır.','Atasözü. Zor bir süreçte umudu korumayı öğütler.','Aylarca çalıştım ve sonunda kazandım; sabrın sonu selamettir.','Değerler','atasözü','⛰','sunrise','Uzun ve dik bir yolu tırmanıp zirvede güneşin doğuşunu izleyen bir yürüyüşçü'],
['ağzı kulaklarına varmak','atasozleri-deyimler','Çok sevinmek.','Deyim. Sevinçten yüzün gülmekten kendini alamaması.','Sınav sonucunu görünce ağzı kulaklarına vardı.','Duygu','deyim','☺','sunrise','Sınav sonucuna bakarken kocaman gülümseyen bir öğrenci'],
['etekleri zil çalmak','atasozleri-deyimler','Çok sevinmek, sevinçten yerinde duramamak.','Deyim. Büyük bir sevinci anlatır.','Tatil haberini alınca kardeşimin etekleri zil çaldı.','Duygu','deyim','🔔','clouds','Tatil haberiyle sevinçten zıplayan bir genç'],
['göz boyamak','atasozleri-deyimler','Aldatıcı davranışlarla gerçeği gizlemek.','Deyim. Olduğundan farklı görünmeye çalışmayı anlatır.','Ödevini yapmadan yapmış gibi görünerek göz boyamaya çalıştı.','Değerler','deyim','🎭','stars','Sahne ışıkları altında maske takmış bir oyuncu'],
// Aralık · dilimize yerleşmiş yabancı sözcükler (eserdeki anlam alanında Türkçe karşılığı)
['selfie','yabanci-sozcukler','özçekim','İngilizce kökenli. Türk Dil Kurumunun önerisi “özçekim”dir.','Selfie yerine özçekim diyelim: Tatilde ailemle güzel bir özçekim yaptık.','Hayal','sel • fie','📷','sunrise','Gün batımında sahilde telefonla birlikte fotoğraf çeken bir aile'],
['e-mail','yabanci-sozcukler','e-posta','İngilizce kökenli. Türkçesi “e-posta”dır.','E-mail yerine e-posta diyelim: Öğretmenime ödevimi e-postayla gönderdim.','Eşya','e • mail','✉','clouds','Bilgisayar ekranından kanatlanıp uçan bir mektup zarfı'],
['online','yabanci-sozcukler','çevrim içi','İngilizce kökenli. Türkçesi “çevrim içi”dir.','Online yerine çevrim içi diyelim: Yarışma bu yıl çevrim içi yapılacak.','Hayal','on • line','◉','stars','Işıklı çizgilerle birbirine bağlanan şehirler ve bilgisayar başındaki öğrenciler'],
['feedback','yabanci-sozcukler','geri bildirim','İngilizce kökenli. Türkçesi “geri bildirim”dir.','Feedback yerine geri bildirim diyelim: Öğretmenim yazıma güzel bir geri bildirim verdi.','Değerler','feed • back','↺','sunrise','Bir öğrencinin defterine not yazan gülümseyen öğretmen'],
['trend','yabanci-sozcukler','eğilim','İngilizce kökenli. Türkçesi “eğilim”dir.','Trend yerine eğilim diyelim: Gençler arasında kitap okuma eğilimi artıyor.','Hayal','trend','↗','stars','Yükselen bir ok biçiminde dizilmiş kitaplar'],
['rezervasyon','yabanci-sozcukler','yer ayırtma','Fransızca kökenli (réservation). Türkçesi “yer ayırtma”dır.','Rezervasyon yerine yer ayırtma diyelim: Tiyatro için önceden yer ayırttık.','Eşya','re • zer • vas • yon','🎟','forest','Tiyatro gişesinde bilet alan bir aile'],
// Şubat · Kutadgu Bilig ve Dîvânü Lügâti't-Türk
['kut','kutadgu-bilig','Baht, saadet, devlet','Uğur, mutluluk. Bugün “kutlu”, “kutlamak” kelimelerinde yaşıyor.','Dedem, bahçeye diktiğimiz fidanın evimize kut getireceğini söyledi.','Değerler','kut','✺','kut.jpg','Gün doğarken bir bahçeye fidan diken aile ve fidanın üstünde parlayan altın ışık'],
['bilig','kutadgu-bilig','Bilgi, akıl','Bilgi. “Bilmek” fiilinden türemiştir.','Kütüphanede bulduğum her kitap bana yeni bir bilig kazandırıyor.','Değerler','bi • lig','✎','bilig.jpg','Bulutların üstünde uçan kitaplardan oluşan bir kütüphane'],
['edgü','kutadgu-bilig','İyi','İyi, iyilik. Bugün yerini “iyi” kelimesi almıştır.','Komşumuza yardım etmek edgü bir davranıştır.','Değerler','ed • gü','♡','edgu.jpg','Yaşlı bir komşusunun alışveriş torbalarını taşıyan gülümseyen gençler'],
['yablak','kutadgu-bilig','Kötü, fena','Kötü. Bugün kullanılmıyor.','Yalan söylemek yablak bir huydur.','Değerler','yab • lak','☁','yablak.jpg','Kararmış bir bulutun altından güneşli bir yola çıkan bir yolcu'],
['öd','kutadgu-bilig','Zaman','Zaman, vakit. Bugün kullanılmıyor.','Tatilde öd o kadar hızlı geçti ki fark etmedim bile.','Hayal','öd','◷','od.jpg','Güneş saati ve kum saatleri arasında mevsimlerin değiştiği bir vadi'],
['körklüg','kutadgu-bilig','Güzel','Güzel. “Körk” (güzellik) kelimesinden türemiştir; “görkemli” ile akrabadır.','Bahar gelince bahçemiz körklüg çiçeklerle doldu.','Doğa','kör • klüg','❀','korklug.jpg','Rengârenk çiçeklerle dolu bir bahar bahçesi'],
['muñ','kutadgu-bilig','Dert, sıkıntı','Dert, keder. Bugün kullanılmıyor.','Arkadaşım muñunu bana anlatınca içi rahatladı.','Duygu','muñ','❍','mun.jpg','Bir bankta oturup dertleşen iki arkadaş ve aralarından doğan güneş'],
['budun','kutadgu-bilig','Halk, millet','Halk, millet. Orhun Yazıtları’nda da geçer; bugün “millet”, “ulus” diyoruz.','Bayram sabahı bütün budun meydanda bir araya geldi.','Değerler','bu • dun','⚑','budun.jpg','Bayram sabahı meydanda toplanan, el sallayan kalabalık bir halk'],
['yalŋuk','divanu-lugatit-turk','İnsan','İnsan. Bugün kullanılmıyor.','Her yalŋuk, iyilik yaptıkça güzelleşir.','Değerler','yal • ŋuk','☺','yalnuk.jpg','Farklı yaşlardan insanların el ele tutuştuğu yeşil bir tepe'],
['bitig','divanu-lugatit-turk','Yazı, kitap','Yazı, kitap. Eski Türkçede “biti-” yazmak demekti.','Okuduğum bitig beni bambaşka dünyalara götürdü.','Sanat','bi • tig','✎','bitig.jpg','Sayfalarından kuşlar ve yıldızlar çıkan açık bir kitap'],
['yagı','divanu-lugatit-turk','Düşman','Düşman. “Yağı” biçimiyle eskimiş olarak sözlükte durur.','Tembellik, başarının en büyük yagısıdır.','Değerler','ya • gı','⚔','yagi.jpg','Kale burçlarında nöbet tutan ve uzaktaki toz bulutunu izleyen askerler'],
['ordu','divanu-lugatit-turk','Hükümdar karargâhı, sarayı','Bir devletin silahlı kuvvetleri. Kelimenin anlamı zamanla değişmiştir.','Eski Türklerde hakanın ordusu, bugünkü başkent gibiydi.','Eşya','or • du','⛺','ordu.jpg','Bozkırda süslü çadırlardan kurulmuş bir hakan otağı'],
// Mart · Safahat ve İstiklâl Marşı
['tahassür','safahat','Hüzünlü özlem, iç çekiş','Özlem. “Hasret” kelimesiyle aynı köktendir.','Tatil bitince denize tahassür ile baktım.','Duygu','ta • has • sür','☾','clouds','Uzaklaşan bir gemiye iskeleden el sallayan bir genç'],
['mahzun','safahat','Üzgün, kederli','Üzgün, boynu bükük. Bugün de kullanılır.','Yağmur yüzünden maç iptal olunca mahzun bir şekilde eve döndük.','Duygu','mah • zun','☂','forest','Yağmurlu bir günde pencereden bakan boynu bükük bir genç ve kedisi'],
['nigâh','safahat','Bakış','Bakış. Bugün daha çok şiirde kullanılır.','Annemin şefkatli nigâhı beni hemen rahatlattı.','Duygu','ni • gâh','◉','sunrise','Çocuğuna şefkatle bakan bir anne ve sıcak bir ev ışığı'],
['hercai','safahat','Vefasız, kararsız','Kararsız, bir yerde durmayan. “Hercai menekşe” çiçeğinin adında da yaşar.','Hercai rüzgâr bir o yana bir bu yana esiyordu.','Doğa','her • ca • i','❦','forest','Rüzgârda bir o yana bir bu yana savrulan rengârenk menekşeler'],
['tuğyan','safahat','Taşkınlık, aşırılık','Taşkınlık, coşku. Bugün pek kullanılmıyor.','Maçı kazanınca sevincimiz tuğyan etti.','Duygu','tuğ • yan','≋','sunrise','Yatağından taşan coşkun bir nehir ve kıyıda sevinçle zıplayan gençler'],
['Şafak','istiklal-marsi','Güneş doğmadan önce gökyüzünde görülen kızıllık; tan.','Tan vakti. Bugün de kullanılır.','Şafak sökerken roketimiz fırlatma rampasında hazırdı.','Doğa','şa • fak','☀','sunrise','Kızıl bir şafak vaktinde dalgalanan al bayrak',{quote:'Korkma, sönmez bu şafaklarda yüzen al sancak'}],
['sancak','istiklal-marsi','Bayrak.','Bayrak. Bugün daha çok tarihî ve askerî bağlamda kullanılır.','Tören başlayınca al sancak gönderde dalgalandı.','Değerler','san • cak','⚑','sunrise','Gün doğarken bir tepenin üstünde dalgalanan al bayrak',{quote:'Korkma, sönmez bu şafaklarda yüzen al sancak'}],
['Hilâl','istiklal-marsi','Yeni ay; ayın ince, kavisli görünümü.','Hilal. Bugün de kullanılır; bayrağımızdaki ay.','Gökyüzündeki ince hilâl, teleskobumuzun ilk hedefi oldu.','Doğa','hi • lâl','☾','stars','Bir tepede teleskopla ince hilâli izleyen gençler',{quote:'Çatma, kurban olayım, çehreni ey nazlı hilâl!'}],
['Çehre','istiklal-marsi','Yüz; bir kimsenin yüzünün görünüşü.','Yüz. Bugün de kullanılır.','Ödülü alınca kardeşimin çehresi güneş gibi aydınlandı.','Duygu','çeh • re','☺','sunrise','Bilim fuarında ödül alan ve yüzü sevinçle parlayan bir öğrenci',{quote:'Çatma, kurban olayım, çehreni ey nazlı hilâl!'}],
['celâl','istiklal-marsi','Öfke, hiddet; büyüklük.','Öfke, hiddet. Bugün “celallenmek” (öfkelenmek) biçiminde yaşar.','Haksızlığı görünce dedemin yüzünde bir celâl belirdi.','Duygu','ce • lâl','⚡','stars','Fırtınalı bir gökyüzünün altında dimdik duran yaşlı bir çınar',{quote:'Kahraman ırkıma bir gül! Ne bu şiddet, bu celâl?'}],
['âfâk','istiklal-marsi','Ufuklar.','“Ufuk” kelimesinin çoğulu. Bugün “ufuklar” diyoruz.','Güneş doğarken bütün âfâk kızıla boyandı.','Doğa','â • fâk','◠','sunrise','Denizin üstünde kızıla boyanmış geniş ufuklar',{quote:'Garbın âfâkını sarmışsa çelik zırhlı duvar'}],
['serhat','istiklal-marsi','Sınır, sınır boyu.','Sınır bölgesi. Bugün daha çok tarihî bağlamda kullanılır.','Dedem gençliğinde doğu serhaddinde görev yapmış.','Değerler','ser • hat','⛰','forest','Karlı dağların arasında sınır boyunda nöbet tutan askerler',{quote:'Benim iman dolu göğsüm gibi serhaddim var'}],
['siper','istiklal-marsi','Korunak; korunmak için kazılan çukur ya da engel.','Bugün de kullanılır. “Siper etmek”: korumak için öne koymak.','Yağmur başlayınca şemsiyemi kardeşime siper ettim.','Değerler','si • per','⛨','forest','Fırtınada küçük kardeşini montuyla koruyan bir genç',{quote:'Siper et gövdeni, dursun bu hayâsızca akın'}],
['şühedâ','istiklal-marsi','Şehitler.','“Şehit” kelimesinin çoğulu.','Çanakkale’deki anıtın önünde şühedâ için saygı duruşunda bulunduk.','Değerler','şü • he • dâ','✦','sunrise','Gün batımında bir anıtın önünde saygıyla duran öğrenciler',{quote:'Şühedâ fışkıracak toprağı sıksan, şühedâ!'}],
['mabet','istiklal-marsi','Tapınak, ibadet yeri.','İbadet yeri. Bugün de kullanılır.','Tarihî mabedin kubbesi gün ışığında parlıyordu.','Sanat','ma • bet','⌂','clouds','Gün ışığında parlayan tarihî bir kubbe',{quote:'Değmesin mabedimin göğsüne nâmahrem eli'}],
['izmihlâl','istiklal-marsi','Yok olma, çöküş.','Yok olma. Bugün pek kullanılmıyor.','Eski imparatorluğun izmihlâli yavaş yavaş gelmişti.','Değerler','iz • mih • lâl','☍','stars','Yıkık sütunların arasından filizlenen genç bir ağaç',{quote:'Ebediyyen sana yok, ırkıma yok izmihlâl'}],
['istiklâl','istiklal-marsi','Bağımsızlık.','Bağımsızlık. “İstiklâl Marşı” adında yaşar.','Milletimiz istiklâl uğruna büyük fedakârlıklar yaptı.','Değerler','is • tik • lâl','★','sunrise','Gün doğarken bayrak direğine koşan gençler',{quote:'Hakkıdır, Hakk’a tapan milletimin istiklâl!'}],
// Mayıs · Hikmetler
['hikmet','hikmetler','Bilgece söz, öğüt','Bilgece söz; bir şeyin gizli sebebi. “Bunda bir hikmet var” deriz.','Dedemin her sözünde bir hikmet saklıdır.','Değerler','hik • met','✧','stars','Ateş başında torunlarına hikâye anlatan bilge bir dede'],
['gafil','hikmetler','Bilgisiz, dikkatsiz','Dikkatsiz, olup bitenden habersiz. “Gafil avlanmak” deyiminde yaşar.','Gafil davranıp ödevimi evde unuttum.','Hayal','ga • fil','⌛','clouds','Ağacın altında uyuyakalmış bir gencin yanından geçen tavşan'],
['zikir','hikmetler','Anma, Allah’ı anma','Anma. Bugün “zikretmek” (anmak) biçiminde kullanılır.','Öğretmenimiz, bilim insanlarını saygıyla zikretti.','Değerler','zi • kir','✺','stars','Yıldızlı bir gecede sessizce gökyüzünü seyreden bir derviş']];
export type Card = {id:string;wordId:string;sentence:string;nickname:string;scene:string;style:string;image:string;mode:string;createdAt:number;approved:number};
// Alt adreste yayında (BASE_PATH) bütün yerel adreslerin önüne eklenir; next.config.ts derlemede doldurur.
export const base=process.env.NEXT_PUBLIC_BASE_PATH||'';
export const art=(name:string)=>name.includes('.')?`${base}/art/${name}`:`${base}/art/${name}.png`;
// Kelimeye özel resim: yüklenmiş dosya ya da public/art altındaki çizim. Yoksa null ("Görsel bekleniyor").
export const ownArt=(w:Word,illustrated:Record<string,number>)=>illustrated[w.id]?wordArt(w.id,illustrated[w.id]):w.image.includes('.')?art(w.image):null;
export const cover=(id:string,version:number)=>`${base}/api/cover/${id}?v=${version}`;
export const wordArt=(id:string,version:number)=>`${base}/api/word-art/${id}?v=${version}`;
export const workOf=(works:Work[],w:Word)=>works.find(x=>x.id===w.work)??{id:w.work,title:'',author:'',period:'',month:'',kind:'eser'};
// Türkçe harfleri sadeleştirip adres dostu kimlik üretir: "Çalıkuşu" → "calikusu".
const ascii:Record<string,string>={ç:'c',ğ:'g',ı:'i',ö:'o',ş:'s',ü:'u',â:'a',î:'i',û:'u',ñ:'n',ŋ:'n'};
export const slug=(s:string)=>s.toLocaleLowerCase('tr').replace(/[çğıöşüâîûñŋ]/g,c=>ascii[c]).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40);
// Cümlede kelime aranırken şapka işaretleri (â, î, û), ünsüz yumuşaması (şafak → şafağı) ve ünlü düşmesi (gönül → gönlü) dikkate alınır.
const fold=(s:string)=>s.toLocaleLowerCase('tr').replace(/â/g,'a').replace(/î/g,'i').replace(/û/g,'u');
const soft:Record<string,string>={k:'ğ',p:'b',t:'d',ç:'c'};
const vowel=/[aeıioöuü]/;
// Atasözü ve deyimlerde her sözcük ayrı aranır; sondaki fiilin -mak/-mek eki atılır ("ağzı kulaklarına varmak" → "…vardı").
export function usesWord(sentence:string,word:string):boolean{const parts=word.trim().split(/\s+/);if(parts.length<2)return usesOne(sentence,word);const last=parts.at(-1)!,verb=/m[ae]k$/.test(last)?last.slice(0,-3):last;return [...parts.slice(0,-1),verb].every(p=>usesOne(sentence,p));}
// Kelime cümledeki bir sözcüğün başında aranır (Türkçede ekler sona gelir): "şafak" içindeki "afak" âfâk sayılmaz.
function usesOne(sentence:string,word:string){const tokens=fold(sentence).split(/[^\p{L}\p{N}-]+/u),w=fold(word),last=w.at(-1)!;const drop=w.length>=4&&!vowel.test(last)&&vowel.test(w.at(-2)!)&&!vowel.test(w.at(-3)!)?w.slice(0,-2)+last:'';
const forms=[w,soft[last]?w.slice(0,-1)+soft[last]:'',drop].filter(Boolean);return tokens.some(t=>forms.some(f=>t.startsWith(f)));}
export const seedWords: Word[] = seedRows.map(([word,work,oldMeaning,meaning,example,category,syllables,emoji,image,scene,extra],i)=>({id:slug(word),word,syllables,meaning,oldMeaning,category,color:colors[i%colors.length],emoji,example,scene,image,work,status:'approved',quote:extra?.quote??null,note:extra?.note??null}));
