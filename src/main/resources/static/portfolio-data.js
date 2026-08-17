window.PORTFOLIO_DATA = {
  ui: {
    tr: {
      role: "Bilgisayar Muhendisi",
      cvLine: "CV'yi goruntule",
      themeDark: "Gece",
      themeLight: "Gunduz",
      tickerLabel: "Secilmis calismalar",
      projects: "Projeler",
      elsewhere: "Iletisim",
      stack: "Teknolojiler",
      back: "Projeler",
      missing: "Proje bulunamadi"
    },
    en: {
      role: "Computer Engineer",
      cvLine: "View CV",
      themeDark: "Dark",
      themeLight: "Light",
      tickerLabel: "Selected work",
      projects: "Projects",
      elsewhere: "Contact",
      stack: "Stack",
      back: "Projects",
      missing: "Project not found"
    }
  },
  projects: [
    {
      slug: "ubeb-5g-road-safety",
      year: "2026",
      kind: { tr: "Teknofest", en: "Teknofest" },
      name: { tr: "UBEB - 5G Road Safety AI", en: "UBEB - 5G Road Safety AI" },
      one: {
        tr: "Yol videosunda arac, plaka ve arac ici riskli nesne tespiti yapan YOLO tabanli sistem.",
        en: "YOLO-based system detecting vehicles, plates and in-cabin risk objects on road video."
      },
      stack: ["Python", "YOLOv8", "OpenCV", "OCR", "PyTorch"],
      paras: {
        tr: [
          "TEKNOFEST 2026 5G ve Yapay Zeka ile Akilli Yol Guvenligi yarismasi icin gelistirilen cozum.",
          "Pipeline arac tespiti, plaka tespiti, OCR ve arac ici risk nesnesi analizini tek akis icinde toparliyor.",
          "Her kosu icin FPS, gecikme ve guven skoru gibi metrikler raporlanabilir sekilde uretiliyor."
        ],
        en: [
          "A solution for the TEKNOFEST 2026 5G and AI Smart Road Safety competition.",
          "The pipeline combines vehicle detection, plate detection, OCR and in-cabin risk-object analysis.",
          "Each run can report FPS, latency and confidence metrics."
        ]
      },
      video: "assets/projects/ubeb-5g-road-safety.webm",
      links: [{ label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }]
    },
    {
      slug: "ulak101-rag",
      year: "2026",
      kind: { tr: "Kurumsal RAG", en: "Enterprise RAG" },
      name: { tr: "ULAK101 RAG", en: "ULAK101 RAG" },
      one: {
        tr: "Kurumsal telekom arsivi uzerinde tamamen local calisan Turkce soru-cevap sistemi.",
        en: "Fully local Turkish question-answering system over a corporate telecom archive."
      },
      stack: ["Python", "Flask", "ChromaDB", "BM25", "Ollama", "React"],
      paras: {
        tr: [
          "ULAK Haberlesme arsivi icin kurulan RAG tabanli soru-cevap sistemi.",
          "Embedding modeli, vektor veritabani ve LLM varsayilan kurulumda ayni makinede calisiyor.",
          "Dense arama ve BM25 lexical arama RRF ile birlestiriliyor; kaynaklar metadata'dan ekleniyor."
        ],
        en: [
          "A RAG-based QA system over a corporate telecom archive.",
          "The embedding model, vector store and LLM run on the same machine in the default setup.",
          "Dense search and BM25 lexical search are fused with RRF; citations come from metadata."
        ]
      },
      links: [{ label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }]
    },
    {
      slug: "local-rag-foundry",
      year: "2026",
      kind: { tr: "Offline AI", en: "Offline AI" },
      name: { tr: "Local RAG Foundry", en: "Local RAG Foundry" },
      one: {
        tr: "Foundry Local uzerinde calisan, disari istek atmayan offline RAG asistani.",
        en: "Offline RAG assistant on Foundry Local with no outbound calls after setup."
      },
      stack: ["Python", "Foundry Local", "Qwen2.5", "TF-IDF", "SQLite", "Streamlit"],
      paras: {
        tr: [
          "Yerel dokuman koleksiyonu uzerinde calisan ve model indirildikten sonra dis servise baglanmayan RAG asistani.",
          "TF-IDF tabani opsiyonel embedding katmani ile gucleniyor; embedding yoksa sistem sessizce TF-IDF'e dusuyor."
        ],
        en: [
          "A RAG assistant over a local document collection that avoids external services after setup.",
          "A TF-IDF base can be strengthened with optional embeddings and degrades gracefully when they are absent."
        ]
      },
      links: [{ label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }]
    },
    {
      slug: "pokemon-tcg-agent",
      year: "2026",
      kind: { tr: "Kaggle", en: "Kaggle" },
      name: { tr: "Pokemon TCG AI Battle Agent", en: "Pokemon TCG AI Battle Agent" },
      one: {
        tr: "Eksik bilgili kart oyununda karar veren MCTS ve RL tabanli ajan.",
        en: "An imperfect-information card-game agent using MCTS and reinforcement learning."
      },
      stack: ["Python", "MCTS", "Reinforcement Learning", "Kaggle SDK"],
      paras: {
        tr: [
          "PTCG AI Battle Challenge icin gelistirilen ajan; rakibin eli bilinmedigi icin kararlar belirsizlik altinda veriliyor.",
          "Kural tabanli tabanin ustune MCTS ile hamle degerlendirme ve RL ile policy iyilestirme eklendi."
        ],
        en: [
          "An agent for the PTCG AI Battle Challenge where hidden hands create imperfect information.",
          "A rule-based base is extended with MCTS for move evaluation and RL for policy improvement."
        ]
      },
      links: [{ label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }]
    },
    {
      slug: "trendyol-datathon",
      year: "2026",
      kind: { tr: "Kaggle", en: "Kaggle" },
      name: { tr: "Trendyol E-Ticaret Datathon", en: "Trendyol E-Commerce Datathon" },
      one: {
        tr: "Arama terimi ve urun alakasini tahmin eden leak-free ikili siniflandirma modeli.",
        en: "Leak-free binary relevance model for search-term and product pairs."
      },
      stack: ["Python", "Transformers", "LightGBM", "Pandas", "Kaggle"],
      paras: {
        tr: [
          "Egitim verisinin yalniz pozitif ciftlerden olustugu bir e-ticaret alaka problemi.",
          "Kategori ve populerlik dengeli negatif ornekleme ile public leaderboard'a sizinti birakmayan kurgu olusturuldu."
        ],
        en: [
          "An e-commerce relevance task where the training set contains only positive pairs.",
          "Category and popularity-balanced negative sampling keeps the setup leak-free."
        ]
      },
      links: [{ label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }]
    },
    {
      slug: "weapon-detection",
      year: "2026",
      kind: { tr: "Bitirme projesi", en: "Senior project" },
      name: { tr: "Video Uzerinde Silah Tespiti", en: "Weapon Detection on Video" },
      one: {
        tr: "Seyrek etiketten tum kareleri ureten yari otomatik etiketleme hatti ve tespit modeli.",
        en: "Semi-automatic labelling pipeline and detector for weapon detection on video."
      },
      stack: ["Python", "OpenCV", "YOLO", "NumPy"],
      paras: {
        tr: [
          "Video kareleri uzerinde kisi ve silah kutularini uretmek icin yari otomatik etiketleme hatti kuruldu.",
          "Uretilen etiketler YOLO formatinda yaziliyor ve goruntu/video onizleme ile dogrulanabiliyor."
        ],
        en: [
          "A semi-automatic labelling pipeline generates person and weapon boxes across video frames.",
          "Labels are exported in YOLO format and can be verified through image and video previews."
        ]
      },
      links: [{ label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }]
    },
    {
      slug: "gps-free-positioning",
      year: "2026",
      kind: { tr: "Savunma", en: "Defence" },
      name: { tr: "GPS Kullanmadan Konum Tahmini", en: "GPS-Free Position Estimation" },
      one: {
        tr: "Ham IMU, barometre ve hava hizi verisinden GPS olmadan konum tahmini.",
        en: "Estimating position without GPS from raw IMU, barometer and airspeed data."
      },
      stack: ["Python", "Pandas", "Time-series ML", "Pixhawk logs"],
      paras: {
        tr: [
          "GPS sinyali olmadiginda konumu tahmin etme problemi uzerinde zaman serisi yaklasimi.",
          "Holybro Pixhawk ucus kayitlari ve dis dogrulama setiyle modelleme fazi planlandi."
        ],
        en: [
          "A time-series approach to estimating position when GPS is unavailable.",
          "Holybro Pixhawk flight logs and an external validation set shape the modelling phase."
        ]
      },
      links: [{ label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }]
    },
    {
      slug: "portfolio-decision-engine",
      year: "2025",
      kind: { tr: "Finansal modelleme", en: "Financial modelling" },
      name: { tr: "Portfoy Karar Motoru", en: "Portfolio Decision Engine" },
      one: {
        tr: "Risk profiline gore varlik agirligi oneren kriz modu destekli karar motoru.",
        en: "Decision engine proposing asset weights per risk profile with crisis-mode triggers."
      },
      stack: ["Python", "Pandas", "NumPy", "Matplotlib", "CLI"],
      paras: {
        tr: [
          "Varlik siniflari icin skor ureten ve risk profiline gore portfoy agirligi oneren karar motoru.",
          "Kriz modu VIX, CDS ve bilesik risk skoru gibi sert tetiklerle devreye giriyor."
        ],
        en: [
          "A decision engine that scores asset classes and proposes portfolio weights per risk profile.",
          "Crisis mode is triggered by VIX, CDS and composite risk-score rules."
        ]
      },
      links: [{ label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }]
    },
    {
      slug: "library-occupancy",
      year: "2025",
      kind: { tr: "IoT", en: "IoT" },
      name: { tr: "Kutuphane Masa Doluluk Takibi", en: "Library Desk Occupancy Tracking" },
      one: {
        tr: "Kutuphane masalarinin anlik doluluk durumunu kameradan cikaran sistem tasarimi.",
        en: "System design for reading live desk occupancy from camera feeds."
      },
      stack: ["Python", "Computer Vision", "PoE camera", "System design"],
      paras: {
        tr: [
          "Kameradan alinan goruntu uzerinde masa bolgeleri tanimlanip dolu/bos durumu cikariliyor.",
          "PoE kamera yerlesimi, kablolama ve donanim maliyeti dahil kurulum plani da hazirlandi."
        ],
        en: [
          "Desk regions are defined on camera feeds and classified as occupied or free.",
          "The proposal also includes PoE camera placement, cabling and hardware cost planning."
        ]
      },
      links: [{ label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }]
    },
    {
      slug: "cicd-spring-pipeline",
      year: "2026",
      kind: { tr: "DevOps", en: "DevOps" },
      name: { tr: "CI/CD Dagitim Hatti", en: "CI/CD Deployment Pipeline" },
      one: {
        tr: "Spring uygulamasini her push'ta imaj uretip EC2'ye dagitan GitHub Actions hatti.",
        en: "GitHub Actions pipeline that images and deploys a Spring app to EC2 on push."
      },
      stack: ["Java", "Spring Boot", "Maven", "Docker", "GitHub Actions", "AWS ECR", "EC2"],
      paras: {
        tr: [
          "Bir Spring Boot uygulamasinin etrafina kurulmus surekli entegrasyon ve dagitim hatti.",
          "GitHub Actions Docker image uretip Amazon ECR'a yollar, ardindan EC2 uzerinde docker compose ile servisi yeniler.",
          "Bu portfolio da ayni kaynak depodan ve ayni pipeline mantigiyle yayina gidiyor."
        ],
        en: [
          "A continuous integration and delivery pipeline around a Spring Boot application.",
          "GitHub Actions builds a Docker image, pushes it to Amazon ECR and refreshes the service on EC2 with docker compose.",
          "This portfolio ships from the same source repository through the same pipeline idea."
        ]
      },
      links: [
        { label: { tr: "Depo", en: "Repository" }, url: "https://github.com/umutuygur0/CI-CD-UMUTportfolio" },
        { label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }
      ]
    },
    {
      slug: "pile-capacity-ml",
      year: "2026",
      kind: { tr: "Akademik ML", en: "Academic ML" },
      name: { tr: "Kazik Tasima Kapasitesi Tahmini", en: "Pile Bearing Capacity Prediction" },
      one: {
        tr: "Zemin ve kazik verisinden tasima kapasitesi tahmin eden gradient boosting deney seti.",
        en: "Gradient boosting experiments predicting pile bearing capacity from soil data."
      },
      stack: ["Python", "CatBoost", "scikit-learn", "Pandas", "Jupyter"],
      paras: {
        tr: [
          "Geoteknik veriden kazik tasima kapasitesi tahmini icin model deneyleri yapildi.",
          "Veri analiz raporu, model cikti raporlari ve akademik metin birlikte tutuldu."
        ],
        en: [
          "Model experiments for predicting pile bearing capacity from geotechnical data.",
          "The work keeps data analysis, model reports and academic writing together."
        ]
      },
      links: [{ label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }]
    },
    {
      slug: "softmax-pipeline",
      year: "2025",
      kind: { tr: "Makine ogrenmesi", en: "Machine learning" },
      name: { tr: "Softmax Regresyon Hatti", en: "Softmax Regression Pipeline" },
      one: {
        tr: "Veri bolme, k-fold derece secimi ve 9 model karsilastirmasini kuran egitim hatti.",
        en: "Training pipeline with splits, k-fold degree selection and a nine-model comparison."
      },
      stack: ["Python", "PyTorch", "NumPy", "scikit-learn", "Matplotlib"],
      paras: {
        tr: [
          "Veri yukleme, polinom oznitelik uretimi, model, egitim ve degerlendirme moduller halinde ayrildi.",
          "Uc regularization secenegi ve uc learning-rate karsilastirmasiyla dokuz model raporlandi."
        ],
        en: [
          "Data loading, polynomial features, model, training and evaluation are split into modules.",
          "Nine models are compared across three regularisers and three learning rates."
        ]
      },
      links: [{ label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }]
    },
    {
      slug: "retail-warehouse",
      year: "2025",
      kind: { tr: "Veri modelleme", en: "Data modelling" },
      name: { tr: "Perakende Veri Modeli ve ABC Analizi", en: "Retail Data Model & ABC Analysis" },
      one: {
        tr: "On iki tablolu perakende semasi, ER diyagrami ve urun segmentasyonu analizi.",
        en: "Twelve-table retail schema, ER diagram and product segmentation analysis."
      },
      stack: ["Python", "Pandas", "Graphviz", "SQL", "Matplotlib"],
      paras: {
        tr: [
          "Satis, satin alma, tedarikci, urun, kanal, takvim ve stok tablolarindan olusan veri modeli.",
          "ER diyagrami koddan uretiliyor ve model uzerinde ABC segmentasyonu calistiriliyor."
        ],
        en: [
          "A retail model made of sales, purchasing, supplier, product, channel, calendar and stock tables.",
          "The ER diagram is generated from code and ABC segmentation runs on top of the model."
        ]
      },
      links: [{ label: { tr: "GitHub profili", en: "GitHub profile" }, url: "https://github.com/umutuygur0" }]
    },
    {
      slug: "personal-cv-site",
      year: "2025",
      kind: { tr: "Web", en: "Web" },
      name: { tr: "Kisisel CV Sitesi", en: "Personal CV Site" },
      one: {
        tr: "Ozgecmisin tek sayfada, derleme adimi olmadan yayinlanan HTML/CSS surumu.",
        en: "Single-page HTML/CSS version of the resume, published with no build step."
      },
      stack: ["HTML", "CSS"],
      paras: {
        tr: [
          "Ozgecmisin web surumu olarak basit, hizli ve harici bagimliliksiz bir sayfa.",
          "Bu portfolyonun ilk hali sayilabilir; icerik guncel tasarima tasindi."
        ],
        en: [
          "A simple, fast and dependency-light web version of the resume.",
          "It can be seen as the first version of this portfolio; the content moved into the current design."
        ]
      },
      links: [{ label: { tr: "CV", en: "Resume" }, url: "assets/umut-uygur-cv.pdf" }]
    }
  ]
};
