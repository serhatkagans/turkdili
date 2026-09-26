# Kelimeden Hayale

Çocukların kelime keşfettiği, kendi cümlesini yazdığı ve resimli TEKNOFEST hatıra kartı oluşturduğu uygulama.

## Çalıştırma

Node 22.13+ ile `npm install`, ardından `npm run dev`. Yerel adres sunucu çıktısında gösterilir. `npm run build` dağıtım paketini oluşturur. Sunucu çalışırken `npm test`, kart kaydı, geri okuma, onay öncesi gizlilik ve giriş doğrulamasını denetler. `npx tsc --noEmit` tür kontrolüdür.

## Kullanım

1. Kelimeyi seç, anlamını tahmin et, açıklamasını aç.
2. Kelimeyi kullanarak cümleni yaz. Takma ad isteğe bağlıdır.
3. Sahneyi tarif et, çizim tarzını seç, kartını oluştur.
4. Kartı PNG indir, yazdır, QR kodla aç veya bağlantısını kopyala.
5. Alt bölümdeki görevli girişinden kartı onayla. Onaylanmış kartlar ortak sözlükte görünür.

Kartlar D1 veritabanında kalıcıdır. Üretilen resimler R2'de saklanır. Yerel veriler `.wrangler` klasöründe tutulur; canlı verilerden ayrıdır. Testler yalnızca yerel veritabanında onaylanmamış deneme kartları oluşturur.

## Görevli anahtarı

Rastgele anahtarın yerel kopyası `work/gorevli-anahtari.txt` içindedir; kaynak kontrolüne girmez. Anahtar `.dev.vars` içinde yerel sunucuya, Sites ortamında gizli `ADMIN_TOKEN` olarak canlı sunucuya tanımlandı. Anahtarı yalnızca görevliyle paylaşın. Yenilemek için iki ortamı da güncelleyin. `.dev.vars` değiştiğinde yerel sunucuyu yeniden başlatın.

## Yapay zekâ bağlantısı

Varsayılan denemede önceden hazırlanmış çocuk kitabı çizimleri kullanılır. Bunlar öğrencinin tarifinden yeni üretilmiş gibi gösterilmez. Cümle ve sahne öğrencinindir; deneme modunda tarz seçimi görseli değiştirmez.

Canlı üretim için güvenilir bir sunucuya ait `IMAGE_SERVICE_URL` ve gizli `IMAGE_SERVICE_TOKEN` tanımlayın. `.env.example` gerekli adları gösterir; yerelde `.dev.vars`, yayında Sites ortam değişkenleri kullanılır. Uygulama belirli bir ticari sağlayıcıya bağlı değildir; hazır bir sağlayıcı anahtarını tek başına girmek yeterli değildir.

Bağlantı sözleşmesi: uygulama Bearer yetkilendirmesiyle `{ "prompt": "…", "size": "1024x1024" }` JSON gönderir. Servis `{ "image_base64": "…" }` şeklinde PNG döndürmelidir. Servis tarafında yaşa uygun içerik denetimi ve kullanım sınırı uygulanmalıdır. Uygulama 90 saniye zaman aşımı, PNG kontrolü ve yaklaşık 10 MB dosya sınırı uygular. Hata halinde öğrencinin girdiği metinler ekranda kalır. Canlı servis bu kurulumda mevcut olmadığı için uçtan uca yapay zekâ üretimi denenmedi.

## Kelimeler ve eserler

`lib/words.ts` içinde 12 örnek kelime vardır. Açıklamalar eğitim amaçlı sadeleştirilmiştir. Eser listesi teslim edilmediğinden uydurma yazar, eser veya alıntı eklenmedi. Etkinlik öncesinde doğrulanmış eser havuzu eklenmelidir.

## Görseller

Yerleşik imagegen aracıyla üretildi; fotoğraf değildir. Dosyalar `public/art/clouds.png`, `forest.png`, `sunrise.png`, `stars.png` ve sosyal paylaşım resmi `public/og.png`.

Çizim yönergeleri: 7–12 yaşa uygun, dokulu guaj çocuk kitabı çizimi; yuvarlak formlar, turkuaz robot, turuncu sırt çantası, sarı ceketli çocuk kâşif, neşeli pastel renkler, yazı ve logo olmadan tam kare kompozisyon. Dört sahne: bulut adasında sihirli kitap okuma; hayvanların arasında fidan dikme; göl kıyısında gün doğumunu izleme; teleskopla yıldızları keşfetme. Sosyal kart: krem kâğıt, lacivert yazı, turuncu vurgu, açık kitaptan yükselen hayal adası; başlık “Kelimeden Hayale”, alt başlık “Bir kelime seç. Bir dünya oluştur.”

## Yayın ve erişim

Sites yayını başlangıçta yalnızca sahibine açıktır. QR bağlantıları aynı erişim koşullarına tabidir; herkese açık etkinlikten önce erişim ayrıca düzenlenmelidir. Kart bağlantısını bilen yetkili ziyaretçiler onaylanmamış kartı da açabilir; ortak sözlük yalnızca onaylı kartları listeler.
