# Kelimeden Hayale · Temel Eserlerden Görsel Destekli Sözlük

MEB “Dilimizin Zenginlikleri Projesi” **2025–2026 ortaöğretim eylem planındaki** sözlük etkinliklerinin dijital karşılığı. Lise öğrencileri ayın eserinden ya da temasından buldukları kelimeleri, atasözlerini ve yabancı sözcükleri anlam ve örnek cümleleriyle ekler; öğretmen onaylar; onaylananlar görselli, oyunlaştırılmış bir sınıf sözlüğüne dönüşür.

## Eylem planındaki karşılığı

| Ay | Plandaki etkinlik | Uygulamada |
|---|---|---|
| Ekim | Temel eserlerle sözlük çalışmaları: Yazar/Eser Sözlük Oluşturma, Çevrimiçi Sözlük Oluşturma | Kelime ekle → öğretmen onayı → Sözlük Kitabı. Temel eserler (Dede Korkut, Mesnevî, Çalıkuşu…) |
| Kasım | Atasözleri ve Deyimler Sözlüğü, Atasözü/Deyim Resimleme | “Atasözleri ve Deyimler” teması (alanlar: anlamı / açıklama), görselli sayfalar |
| Aralık | Dilimize yerleşmiş yabancı sözcükler: Türkçesini Söyleyelim, Çevrimiçi Anlamını Bul | “Yabancı Sözcükler” teması (alanlar: Türkçe karşılığı / kökeni); Anlamını Bul oyununda doğru Türkçe karşılığı seçme |
| Şubat | Kutadgu Bilig ve Dîvânü Lügâti't-Türk: Hatırlatmaca, Anlamını Bul | Eser kartları (gizli harfli kelimeler), Kelimeyi / Anlamını Bul |
| Mart | Mehmet Âkif ve Safahat: İstiklâl Marşı’ndan en az üç kelimeyle cümle ve afiş (8.2) | **İstiklâl Marşı afişi**: kullanılan kelimeler kendiliğinden tanınır, afiş PNG indirilir / yazdırılır |
| Nisan | Karşılaştırmalı Türk Lehçeleri Sözlüğü, Anlamını Bul | Türk Lehçeleri Sözlüğü teması (kelimeler öğrencilerden gelir) |
| Mayıs | Hoca Ahmet Yesevi ve Hikmet okumaları, Anlamını Bul | Hikmetler kelimeleri, Anlamını Bul |
| Ocak / Haziran | Dönem sonu iyi örnekler, yıl sonu şöleni | Ortak kartlar galerisi ve yazdırılabilir sözlük kitapçığı |

Aynı tablo uygulamada “Nasıl çalışır?” sayfasında da yer alır.

## Bölümler

| Bölüm | Ne yapar |
|---|---|
| **Sözlük Kitabı** | Onaylı kelimeler ay sırasıyla, 4–6 maddelik kâğıt dokulu sayfalara dizilir. En az üç kelimesi olan eser kendi sayfalarını alır; az kelimeli eserler ayın teması altında birlikte sayfalanır. Her madde: kelime, anlamlar (temaya göre adlandırılır), doğrulanmış alıntı, örnek cümle, görsel. Sayfa sonunda kelime–anlam eşleştirmesi; tamamlanan sayfa “✓ Tamamlandı” olur. |
| **Eserler** | Eserler ay ve tema başlıkları altında kart kart (kapak, yazar, dönem, kelime sayısı). Esere girilince kelimeler maskeli gelir (`K _ T`); şıklardan ya da yazarak doğru tahmin edilen kart açılır; hepsi açılınca eser “Tamamlandı”. |
| **Tahmin Oyunu** | İki yön: **Kelimeyi Bul** (anlamdan gizli harfli kelimeye; kolay %30 / zor %70 gizli, şıklı ya da yazılı) ve **Anlamını Bul** (kelimeden dört anlamdan doğrusuna). Aya göre süzme, oturum skoru ve seri. |
| **İstiklâl Marşı afişi** | Mart etkinliği. Marştaki kelimeler (anlamları ve dizeleriyle) listelenir; öğrenci en az üçünü kullanarak cümle kurar, üç renk seçeneğinden biriyle A4 afiş indirir ya da yazdırır. |
| **Hatıra Kartı** | Kelimeyle kendi cümleni yazıp görselli kart oluşturma; kartlar “Kartlarım”da birikir, kitapçık olarak yazdırılır. |
| **+ Kelime ekle** | Öğrenci formu: tema ve eser (aylara göre gruplu), kelime / atasözü / yabancı sözcük, anlamlar, örnek cümle, ad-sınıf (isteğe bağlı). Öneri **onay bekler**; onaylanana kadar hiçbir bölümde görünmez. |

Açılan eser kartları, tamamlanan kitap sayfaları ve oyun skoru yalnızca o tarayıcı sekmesinin oturumunda tutulur; sunucuya kaydedilmez.

Kelime denetimi (örnek cümle, afiş) Türkçenin ek yapısına göre çalışır: kelime cümledeki bir sözcüğün başında aranır (“şafak” içindeki “afak” âfâk sayılmaz), ünsüz yumuşaması ve ünlü düşmesi tanınır (serhat → serhaddinde, mabet → mabedin), deyimlerde fiil çekimi kabul edilir (ağzı kulaklarına varmak → vardı). Serbest metin tahmininde büyük/küçük harf, şapka ve Türkçe harf farkı yok sayılır; eski harfler düz harfle kabul edilir (`yalnuk` → yalŋuk).

## Çalıştırma

Node 22.13+ gerekir.

```bash
npm install
cp .env.example .env.local   # ADMIN_USER ve ADMIN_PASSWORD'ü doldurun
npm run dev                   # http://localhost:3000
```

Geliştirme sunucusunu tarayıcıda `localhost` adresiyle açın; `127.0.0.1` ile açıldığında Next geliştirme betikleri yüklenmez ve düğmeler çalışmaz (yayın derlemesinde bu sorun yoktur).

Yayın için `npm run build` ve `npm start`. Uygulama tek bir Node süreci ve SQLite dosyasıyla çalışır; nginx gibi bir ters vekil arkasında VPS'e kurulabilir. Alt adreste (ör. `aiotechs.cloud/turkdili`) yayın için `.env.local` içine `BASE_PATH=/turkdili` yazıp yeniden derleyin; ters vekil `/turkdili` yolunu önek silmeden uygulamaya iletmelidir.

Denetimler:

```bash
npx tsc --noEmit                                  # tür kontrolü
npm run lint
TEST_BASE_URL=http://localhost:3000 npm test      # sunucu çalışırken
```

Testler yalnızca onaylanmamış deneme kartları ve deneme kelime önerileri oluşturur; bunlar hiçbir sözlükte görünmez. Görevli panelinden reddedilebilir.

## Veri

Bütün veriler `DATA_DIR` (varsayılan `./data`) altındadır ve kaynak kontrolüne girmez:

- `kelimeden-hayale.db`: SQLite. `works` (eserler ve temalar: ad, yazar, dönem, **ay**, **tür**), `words` (kelimeler: kelime, eser, **eserdeki anlam**, **günümüz anlamı**, örnek cümle, ekleyen, **durum** `pending/approved/rejected`, görünürlük), `cards` (hatıra kartları).
- `art/kelimeler/<kelime-kimliği>.png|jpg|webp`: yüklenen kelime görselleri.
- `art/kapaklar/<eser-kimliği>.png|jpg|webp`: eser kapakları.
- `art/<kart-kimliği>.png`: yapay zekâ ile üretilen kart görselleri.

Eski veritabanı ilk açılışta veri kaybı olmadan yeni sütunlara geçirilir. Başlangıç verisi (`lib/words.ts`: eylem planının yedi ayına dağılmış 17 eser/tema, 53 kelime, atasözü ve yabancı sözcük) sürümlüdür ve her sürüm bir kez yüklenir. Yeni sürüm mevcut veritabanında yalnızca eksik kayıtları ekler; görevlinin düzenlemeleri ve seçtiği aylar korunur. Eserlerin türü (`eser`, `atasozu`, `yabanci`) formdaki alan adlarını belirler. Başlangıç verisi test/demo amaçlıdır; anlamları ve İstiklâl Marşı alıntılarını etkinlik öncesinde bir Türk dili ve edebiyatı öğretmenine kontrol ettirin.

## Görevli (öğretmen) paneli

**`/admin`** adresinden (ya da sayfa altındaki “Görevli paneli” bağlantısından) açılır; `ADMIN_USER` / `ADMIN_PASSWORD` ile tanımlanan kullanıcı adı ve şifreyle girilir. Oturum yalnızca o tarayıcı sekmesi açık kaldıkça hatırlanır.

- **Özet**: onaylı kelime, bekleyen öneri, eksik görsel, bekleyen kart sayıları; eser başına tablo (tıklayınca ilgili listeye gider); en çok katkı veren öğrenciler/sınıflar.
- **Öneriler**: öğrencilerin gönderdiği kelimeler. Tek tek ya da işaretleyip **toplu** onayla / reddet; düzenle. Reddedilen silinmez, geri alınabilir.
- **Kelimeler**: bütün kayıtlar. Arama (harf/şapka farkı gözetmez) ve eser, durum, görsel, görünürlük filtreleri. Düzenle, gizle/göster, kalıcı sil; toplu işlemler. Hatıra kartı bağlı kelime silinmez, gizlenir.
- **Görseller**: görseli olmayan onaylı kelimeler. Tek tek ya da **toplu** yükleme; dosya adı kelimeyle eşleşir (`kut.png`, `yalnuk.jpg`, `Körklüg.webp`), eşleşmeyenler raporlanır. Kare (1:1) PNG/JPG/WEBP, en fazla 8 MB.
- **Eserler ve kapaklar**: kapak yükleme, eylem planı ayı ve tür (eser sözlüğü / atasözü ve deyim / yabancı sözcük).
- **Hatıra kartları**: öğrenci kartlarını ortak galeride yayımla / yayımlama.
- **Excel / CSV**: bütün kelimeleri Excel’de açılan CSV olarak indir; Excel’den kopyala-yapıştır ya da CSV dosyasıyla en fazla 500 satır içe aktar. Sütunlar: *Kelime · Eser · Eserdeki anlamı · Günümüzdeki anlamı · Örnek cümle · Ekleyen* (başlık adları esnektir; başlık yoksa bu sıra kullanılır). Eser adı ya da kimliği mevcut bir eserle eşleşmelidir. Her satır ayrı doğrulanır, hatalı satırlar gerekçesiyle gösterilir. İstenirse “onay bekleyen” olarak aktarılır.
- **+ Kelime ekle**: görevlinin eklediği kelime doğrudan onaylıdır; gerekirse yeni eser de eklenir.

Görseli olmayan kelime sözlükte “Görsel bekleniyor” olarak gösterilir. Kelime görselleri ayrıca (ör. Gemini ile) üretilip panelden yüklenir. `public/art/` altındaki `kut.jpg` gibi başlangıç çizimleri seed verisindeki kelimelere bağlıdır; panelden yüklenen görsel bunların önüne geçer.

## Yapay zekâ (isteğe bağlı)

`GEMINI_API_KEY` tanımlıysa hatıra kartında cümle geri bildirimi, içerik denetimi ve görsel üretimi açılır; görevli panelinde “YZ ile üret” düğmesi görünür. Alternatif olarak `IMAGE_SERVICE_URL` + `IMAGE_SERVICE_TOKEN` ile kendi görsel servisiniz bağlanabilir: uygulama Bearer yetkilendirmesiyle `{ "prompt": "…", "size": "1024x1024" }` gönderir, servis `{ "image_base64": "…" }` döndürür. `AI_DAILY_IMAGE_LIMIT` günlük üretimi sınırlar. Yapay zekâ bağlı değilken uygulama hazır görsellerle çalışır. Sözlük kelimelerinin görselleri hiçbir zaman otomatik üretilmez.

## Gizlilik

Hedef kitle ortaöğretim (lise) öğrencileridir; yapay zekâ öğretmenin tonu, içerik denetimi ve görsel yönergesi buna göre ayarlıdır. Öğrenciden gerçek ad yerine takma ad ya da “ad, sınıf” istenir; soyadı, okul ve iletişim bilgisi istenmez. Kart bağlantısını bilenler kartı görüntüleyebilir; ortak galeri ve sözlük yalnızca onaylı içeriği listeler.
