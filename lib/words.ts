// Başlangıç kelime havuzu. Veritabanı boşken bir kez yüklenir; sonrasında kelimeler görevli panelinden yönetilir.
// `quote` yalnızca metni doğrulanmış dizeler için doldurulur; emin olunmayan durumda `note` ile eseri tanıtın.
// Kelimeye özel resim DATA_DIR/art/kelimeler/<id>.png olarak durur; yoksa `image` alanındaki ortak resim kullanılır.
export type Work = {id:string;title:string;author:string;period:string};
export type Word = {id:string;word:string;syllables:string;meaning:string;category:string;color:string;emoji:string;example:string;scene:string;image:string;work:string;quote?:string|null;note?:string|null};
export const categories=['Değerler','Duygu','Doğa','Sanat','Eşya','Hayal'];
export const colors=['lilac','peach','yellow','sage'];
export const fallbackArt=['clouds','forest','sunrise','stars'];
export const seedWorks: Work[] = [
{id:'kutadgu-bilig',title:'Kutadgu Bilig',author:'Yusuf Has Hâcib',period:'11. yüzyıl'},
{id:'dede-korkut',title:'Dede Korkut Hikâyeleri',author:'Anonim',period:'Oğuz destan geleneği'},
{id:'mesnevi',title:'Mesnevî',author:'Mevlânâ Celâleddîn-i Rûmî',period:'13. yüzyıl'},
{id:'yunus-emre',title:'Yunus Emre Divanı',author:'Yunus Emre',period:'13.–14. yüzyıl'},
{id:'su-kasidesi',title:'Su Kasidesi',author:'Fuzûlî',period:'16. yüzyıl'},
{id:'vatan-silistre',title:'Vatan Yahut Silistre',author:'Namık Kemal',period:'1873'},
{id:'istiklal-marsi',title:'İstiklâl Marşı',author:'Mehmet Âkif Ersoy',period:'1921'},
{id:'kasagi',title:'Kaşağı',author:'Ömer Seyfettin',period:'20. yüzyıl başı'},
{id:'calikusu',title:'Çalıkuşu',author:'Reşat Nuri Güntekin',period:'1922'},
{id:'semaver',title:'Semaver',author:'Sait Faik Abasıyanık',period:'1936'},
{id:'sessiz-gemi',title:'Sessiz Gemi',author:'Yahya Kemal Beyatlı',period:'20. yüzyıl'}];
export const seedWords: Word[] = [
{id:'kut',word:'Kut',syllables:'kut',meaning:'Mutluluk, uğur, talih; eski Türklerde yöneticiye Tanrı tarafından verildiğine inanılan güç.',category:'Değerler',color:'yellow',emoji:'✺',example:'Dedem, bahçeye diktiğimiz fidanın evimize kut getireceğini söyledi.',scene:'Gün doğarken bir bahçeye fidan diken aile ve fidanın üstünde parlayan altın ışık',image:'sunrise',work:'kutadgu-bilig',note:'Eserin adı “kut veren bilgi”, yani insana mutluluk kazandıran bilgi demektir.'},
{id:'bilig',word:'Bilig',syllables:'bi • lig',meaning:'Bilgi.',category:'Değerler',color:'lilac',emoji:'✎',example:'Kütüphanede bulduğum her kitap bana yeni bir bilig kazandırıyor.',scene:'Bulutların üstünde uçan kitaplardan oluşan bir kütüphane',image:'clouds',work:'kutadgu-bilig',note:'Yusuf Has Hâcib, eserinde bilgiyi insanı ve devleti yücelten en büyük güç olarak anlatır.'},
{id:'kopuz',word:'Kopuz',syllables:'ko • puz',meaning:'Eski Türklerin telli, gövdesi deriyle kaplı halk sazı.',category:'Sanat',color:'peach',emoji:'♫',example:'Festivalde robot kolumuz kopuzu çalmayı öğrendi.',scene:'Çadırların önünde ateş başında kopuz çalan yaşlı bir ozan ve onu dinleyen çocuklar',image:'forest',work:'dede-korkut',note:'Hikâyelerde Dede Korkut kopuzunu alıp boy boylar, soy soylar; yani olayları ozan olarak anlatır.'},
{id:'sevi',word:'Sevi',syllables:'se • vi',meaning:'Sevgi.',category:'Değerler',color:'peach',emoji:'♡',example:'Sevi ile yapılan her iş gönülleri birbirine bağlar.',scene:'Farklı ülkelerden çocukların el ele tutuşup kocaman bir kalp çizdiği yeşil bir tepe',image:'forest',work:'yunus-emre',quote:'Ben gelmedim dava için, benim işim sevi için'},
{id:'ney',word:'Ney',syllables:'ney',meaning:'Kamıştan yapılan, üflenerek çalınan çalgı.',category:'Sanat',color:'sage',emoji:'♪',example:'Neyin sesi rüzgârla birlikte bütün vadiye yayıldı.',scene:'Sazlık bir göl kıyısında ney üfleyen bir çocuk ve havada süzülen nota şeklinde kuşlar',image:'forest',work:'mesnevi',note:'Mesnevî, sazlıktan koparılan neyin ayrılık şikâyetini dinlemeye çağıran beyitlerle başlar.'},
{id:'esk',word:'Eşk',syllables:'eşk',meaning:'Gözyaşı.',category:'Duygu',color:'lilac',emoji:'❍',example:'Bayram sabahı dedemin gözlerinden sevinç eşki süzüldü.',scene:'Yağmur damlaları gibi parlayan gözyaşlarının gökkuşağına dönüştüğü bir gökyüzü',image:'clouds',work:'su-kasidesi',quote:'Saçma ey göz eşkden gönlümdeki odlara su'},
{id:'od',word:'Od',syllables:'od',meaning:'Ateş.',category:'Doğa',color:'yellow',emoji:'✹',example:'Ocaktaki od, soğuk kış gecesinde bütün evi ısıttı.',scene:'Yıldızlı bir gecede kamp ateşinin etrafında ısınan kâşifler',image:'stars',work:'su-kasidesi',quote:'Saçma ey göz eşkden gönlümdeki odlara su'},
{id:'vatan',word:'Vatan',syllables:'va • tan',meaning:'Bir milletin üzerinde yaşadığı, bağımsızlığını koruduğu toprak; yurt.',category:'Değerler',color:'peach',emoji:'⚑',example:'Vatan, üzerinde birlikte gülüp büyüdüğümüz topraktır.',scene:'Gün doğarken dalgalanan bayrak ve tarlalarda, şehirlerde, denizde çalışan insanlar',image:'sunrise',work:'vatan-silistre',note:'Namık Kemal’in bu oyunu, Silistre Kalesi’nin savunmasını ve vatan sevgisini anlatır.'},
{id:'safak',word:'Şafak',syllables:'şa • fak',meaning:'Güneş doğmadan önce gökyüzünde görülen kızıllık; tan.',category:'Doğa',color:'yellow',emoji:'☀',example:'Şafak sökerken roketimiz fırlatma rampasında hazırdı.',scene:'Kızıl bir şafak vaktinde fırlatma rampasında bekleyen bir roket',image:'sunrise',work:'istiklal-marsi',quote:'Korkma, sönmez bu şafaklarda yüzen al sancak'},
{id:'hilal',word:'Hilâl',syllables:'hi • lâl',meaning:'Yeni ay; ayın ince, kavisli görünümü.',category:'Doğa',color:'lilac',emoji:'☾',example:'Gökyüzündeki ince hilâl, teleskobumuzun ilk hedefi oldu.',scene:'Bir tepede teleskopla ince hilâli izleyen çocuklar',image:'stars',work:'istiklal-marsi',quote:'Çatma, kurban olayım, çehreni ey nazlı hilâl!'},
{id:'cehre',word:'Çehre',syllables:'çeh • re',meaning:'Yüz; bir kimsenin yüzünün görünüşü.',category:'Duygu',color:'sage',emoji:'☺',example:'Ödülü alınca kardeşimin çehresi güneş gibi aydınlandı.',scene:'Bilim fuarında ödül alan ve yüzü sevinçle parlayan bir çocuk',image:'sunrise',work:'istiklal-marsi',quote:'Çatma, kurban olayım, çehreni ey nazlı hilâl!'},
{id:'kasagi',word:'Kaşağı',syllables:'ka • şa • ğı',meaning:'Atların tüylerini tımar etmekte kullanılan, dişli demir tarak.',category:'Eşya',color:'sage',emoji:'⋔',example:'Dedemin ahırında paslanmış eski bir kaşağı bulduk.',scene:'Eski bir ahırda bir atı kaşağıyla tımar eden iki kardeş',image:'forest',work:'kasagi',note:'Ömer Seyfettin’in hikâyesine adını veren bu eşya, bir çocuğun vicdanıyla hesaplaşmasının merkezindedir.'},
{id:'semaver',word:'Semaver',syllables:'se • ma • ver',meaning:'İçinde ateş yakılarak çay suyu kaynatılan, genellikle madenden araç.',category:'Eşya',color:'peach',emoji:'♨',example:'Kış akşamları semaverin başında hep birlikte çay içeriz.',scene:'Buğulu pencereli sıcak bir mutfakta tüten parlak bir semaver',image:'clouds',work:'semaver',note:'Sait Faik’in hikâyesinde sabahları kaynayan semaver, anne sevgisini ve evin sıcaklığını simgeler.'},
{id:'calikusu',word:'Çalıkuşu',syllables:'ça • lı • ku • şu',meaning:'Çalılıklarda yaşayan, küçük, cıvıl cıvıl öten bir kuş.',category:'Doğa',color:'yellow',emoji:'❦',example:'Bahçedeki çalıkuşu sabah erkenden şarkısına başladı.',scene:'Çiçekli bir çalının dalında şarkı söyleyen küçük bir kuş ve ona gülümseyen bir kız',image:'forest',work:'calikusu',note:'Reşat Nuri’nin romanında yerinde duramayan, neşeli Feride’nin lakabıdır.'},
{id:'mechul',word:'Meçhul',syllables:'meç • hul',meaning:'Bilinmeyen.',category:'Hayal',color:'lilac',emoji:'✧',example:'Uzay aracımız meçhul bir gezegene doğru yol aldı.',scene:'Limandan yıldızlarla dolu bilinmeyen bir ufka doğru yola çıkan yelkenli bir uzay gemisi',image:'stars',work:'sessiz-gemi',quote:'Meçhule giden bir gemi kalkar bu limandan'}];
export type Card = {id:string;wordId:string;sentence:string;nickname:string;scene:string;style:string;image:string;mode:string;createdAt:number;approved:number};
export const art=(name:string)=>`/art/${name}.png`;
export const wordArt=(id:string,version:number)=>`/api/word-art/${id}?v=${version}`;
export const workOf=(works:Work[],w:Word)=>works.find(x=>x.id===w.work)??{id:w.work,title:'',author:'',period:''};
// Türkçe harfleri sadeleştirip adres dostu kimlik üretir: "Çalıkuşu" → "calikusu".
const ascii:Record<string,string>={ç:'c',ğ:'g',ı:'i',ö:'o',ş:'s',ü:'u',â:'a',î:'i',û:'u'};
export const slug=(s:string)=>s.toLocaleLowerCase('tr').replace(/[çğıöşüâîû]/g,c=>ascii[c]).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40);
// Cümlede kelime aranırken şapka işaretleri (â, î, û), ünsüz yumuşaması (şafak → şafağı) ve ünlü düşmesi (gönül → gönlü) dikkate alınır.
const fold=(s:string)=>s.toLocaleLowerCase('tr').replace(/â/g,'a').replace(/î/g,'i').replace(/û/g,'u');
const soft:Record<string,string>={k:'ğ',p:'b',t:'d',ç:'c'};
const vowel=/[aeıioöuü]/;
export function usesWord(sentence:string,word:string){const s=fold(sentence),w=fold(word),last=w.at(-1)!;const drop=w.length>=4&&!vowel.test(last)&&vowel.test(w.at(-2)!)&&!vowel.test(w.at(-3)!)?w.slice(0,-2)+last:'';return s.includes(w)||(!!soft[last]&&s.includes(w.slice(0,-1)+soft[last]))||(!!drop&&s.includes(drop));}
