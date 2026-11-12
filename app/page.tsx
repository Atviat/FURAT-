import FuratMap from "@/components/FuratMap";

const cities = ["الرمادي", "الفلوجة", "هيت", "حديثة", "عانة", "راوة", "القائم", "الرطبة"];

export default function Home() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="فُرات الرئيسية">
          <span className="brand-mark"><span /></span>
          <span><strong>فُرات</strong><small>FURAT</small></span>
        </a>
        <div className="top-actions">
          <span className="region-pill"><i /> محافظة الأنبار</span>
          <button className="icon-button" aria-label="القائمة">☰</button>
        </div>
      </header>

      <section className="intro">
        <p className="eyebrow">ANBAR’S SMART MAP</p>
        <h1>اكتشف الأنبار، <em>دربك يبدأ هنا.</em></h1>
        <p className="subhead">أماكنك وطرقك وخدماتك… كلها في مكان واحد.</p>
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input aria-label="ابحث عن مكان" placeholder="ابحث عن مدينة، شارع أو مكان..." />
          <button type="button">بحث</button>
        </div>
      </section>

      <section className="map-section" aria-label="خريطة محافظة الأنبار">
        <div className="map-heading">
          <div><span className="live-dot" /> <strong>خريطة الأنبار</strong><small>استكشف المحافظة</small></div>
          <span className="map-tag">خريطة تجريبية</span>
        </div>
        <FuratMap />
        <div className="map-note">الخريطة تعرض بيانات OpenStreetMap. قد تختلف تغطية الطرق والأماكن حسب توفر البيانات.</div>
      </section>

      <section className="cities-section">
        <div className="section-title"><div><p className="eyebrow">EXPLORE THE REGION</p><h2>مدن الأنبار</h2></div><span>اكتشف مناطق المحافظة</span></div>
        <div className="city-grid">
          {cities.map((city, index) => <button className="city-card" key={city} type="button">
            <span className="city-number">{String(index + 1).padStart(2, "0")}</span><strong>{city}</strong><span className="city-arrow">↗</span>
          </button>)}
        </div>
      </section>

      <section className="coming">
        <div className="coming-icon">✦</div>
        <div><strong>الأنبار أقرب مما تتخيل</strong><p>نعمل على إضافة دليل الأماكن والخدمات والملاحة خطوة بخطوة.</p></div>
      </section>

      <footer><span>فُرات | FURAT</span><span>صُنع لخدمة الأنبار ♡</span></footer>
    </main>
  );
}
