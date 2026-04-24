export type Lang = "ar" | "fr";

export const translations = {
  ar: {
    dir: "rtl" as "rtl" | "ltr",
    nav: {
      about: "حول",
      growth: "النمو",
      benefits: "الفوائد",
      howto: "كيفية الزراعة",
      business: "الفرص",
      gallery: "المعرض",
      contact: "اتصل بنا",
    },
    hero: {
      eyebrow: "أزولا — تونس",
      headline: ["مستقبل", "الفلاحة", "المستدامة"],
      subtitle: "حل طبيعي سريع النمو للأعلاف والتسميد العضوي. نزرع أزولا في تونس لإطعام الماشية وإحياء التربة.",
      cta1: "اكتشف أكثر",
      cta2: "ابدأ مشروعك",
      scroll: "اكتشف",
    },
    about: {
      tag: "ما هي أزولا؟",
      title: "نبتة مائية تغيّر قواعد اللعبة",
      body:
        "أزولا سرخس مائي صغير يطفو فوق الماء ويعقد علاقة فريدة مع بكتيريا تثبت النيتروجين من الهواء. النتيجة: نموّ مذهل، بروتين عالي، وتربة أكثر خصوبة — دون أسمدة كيميائية.",
      pillars: [
        { t: "تثبيت النيتروجين", d: "علاقة تكافلية تحوّل الهواء إلى سماد طبيعي." },
        { t: "نمو فائق", d: "تتضاعف الكتلة الحيوية كل 3–5 أيام." },
        { t: "مصدر بروتين", d: "25–30٪ بروتين خام جاف." },
      ],
    },
    growth: {
      tag: "الأداء والنمو",
      title: "أرقام تتحدث عن ثورة خضراء",
      sub: "أزولا تنمو أسرع من أي محصول علفي تقليدي تعرفه.",
      stats: [
        { value: 5, suffix: " أيام", label: "تتضاعف الكتلة الحيوية كل" },
        { value: 2, suffix: " طن/هكتار", label: "إنتاج أسبوعي" },
        { value: 30, suffix: "٪", label: "نسبة البروتين" },
      ],
      compareTitle: "أزولا مقابل المحاصيل التقليدية",
      compare: [
        { name: "أزولا", value: 100, color: "fresh" },
        { name: "الصويا", value: 35, color: "mint" },
        { name: "الذرة", value: 22, color: "water" },
      ],
      compareNote: "إنتاج البروتين النسبي لكل هكتار في الأسبوع",
      coverageLabel: "تغطية أزولا الحية",
      coverageNote: "تتقدّم التغطية مع تمرير الصفحة — محاكاة لانتشار النبتة على الماء.",
    },
    benefits: {
      tag: "الفوائد",
      title: "لماذا يختار الفلاحون أزولا",
      items: [
        { icon: "Beef", t: "بروتين عالي", d: "25–30٪ بروتين خام، مثالي للماشية والدواجن والأسماك." },
        { icon: "Wallet", t: "تخفيض كلفة العلف", d: "بديل اقتصادي ومستدام لأعلاف الصويا والذرة." },
        { icon: "Sprout", t: "خصوبة التربة", d: "سماد عضوي غني بالنيتروجين يحيي الأرض." },
        { icon: "Leaf", t: "صديقة للبيئة", d: "تستهلك القليل من الماء وتمتص ثاني أكسيد الكربون." },
      ],
    },
    howto: {
      tag: "خطوة بخطوة",
      title: "كيف تزرع أزولا؟",
      steps: [
        { t: "تجهيز الحوض", d: "حوض ضحل بمساحة مفتوحة وضوء جيد." },
        { t: "عمق الماء", d: "احتفظ بعمق 10–15 سم من الماء النقي." },
        { t: "المغذيات", d: "أضف كمية بسيطة من السماد العضوي." },
        { t: "المتابعة", d: "راقب الحرارة ودرجة الحموضة بشكل يومي." },
        { t: "الحصاد", d: "احصد جزءاً يومياً واترك الباقي للنمو." },
      ],
    },
    business: {
      tag: "فرصة استثمارية",
      title: "مدخلات قليلة. مخرجات سريعة.",
      sub: "أزولا تفتح آفاقاً جديدة للفلاح والمستثمر التونسي.",
      points: [
        { t: "كلفة تأسيس منخفضة", d: "أحواض بسيطة وموارد محلية." },
        { t: "عائد سريع", d: "حصاد أسبوعي منذ الشهر الأول." },
        { t: "سوق متنامية", d: "طلب متزايد على الأعلاف والأسمدة العضوية." },
      ],
    },
    gallery: {
      tag: "المعرض",
      title: "مزارع أزولا — تونس",
      caption: "مزرعة أزولا — تونس",
    },
    testimonials: {
      tag: "آراء",
      title: "ماذا يقول شركاؤنا",
      items: [
        { name: "محمد الحاج", role: "فلاح، صفاقس", quote: "خفّضت كلفة العلف بنسبة 40٪ منذ بدأت زراعة أزولا. النتائج فاقت توقعاتي." },
        { name: "ليلى بن عمر", role: "مستثمرة، تونس", quote: "مشروع أنيق وعائد سريع. أزولا فرصة حقيقية للاستثمار الأخضر." },
        { name: "أحمد الطرابلسي", role: "مربي ماشية، القيروان", quote: "حليب أوفر وأبقار أكثر صحة. أنصح كل فلاح بتجربة أزولا." },
      ],
    },
    contact: {
      tag: "ابدأ معنا",
      title: "هل أنت جاهز لزراعة المستقبل؟",
      sub: "تواصل معنا اليوم وابدأ مشروعك مع أزولا.",
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      message: "رسالتك",
      send: "أرسل الرسالة",
      whatsapp: "تواصل عبر واتساب",
      success: "تم إرسال رسالتك بنجاح!",
      location: "تونس",
    },
    footer: {
      tagline: "زراعة المستقبل، اليوم.",
      rights: "جميع الحقوق محفوظة",
    },
  },
  fr: {
    dir: "ltr" as "rtl" | "ltr",
    nav: {
      about: "À propos",
      growth: "Croissance",
      benefits: "Bénéfices",
      howto: "Culture",
      business: "Opportunité",
      gallery: "Galerie",
      contact: "Contact",
    },
    hero: {
      eyebrow: "AZOLA — Tunisie",
      headline: ["L'avenir", "de l'agriculture", "durable"],
      subtitle:
        "Une solution naturelle à croissance rapide pour l'alimentation animale et la fertilisation organique. Cultivée en Tunisie.",
      cta1: "Découvrir",
      cta2: "Démarrer votre projet",
      scroll: "Explorer",
    },
    about: {
      tag: "Qu'est-ce que l'Azolla ?",
      title: "Une fougère aquatique qui change la donne",
      body:
        "L'Azolla est une minuscule fougère aquatique qui flotte sur l'eau et entretient une symbiose unique avec des bactéries fixatrices d'azote. Le résultat : une croissance spectaculaire, des protéines élevées, et des sols régénérés — sans engrais chimiques.",
      pillars: [
        { t: "Fixation de l'azote", d: "Une symbiose qui transforme l'air en fertilisant." },
        { t: "Croissance rapide", d: "La biomasse double tous les 3 à 5 jours." },
        { t: "Source de protéines", d: "25 à 30 % de protéines brutes en matière sèche." },
      ],
    },
    growth: {
      tag: "Performance",
      title: "Des chiffres qui parlent d'une révolution verte",
      sub: "L'Azolla pousse plus vite que toutes les cultures fourragères classiques.",
      stats: [
        { value: 5, suffix: " jours", label: "Doublement de la biomasse en" },
        { value: 2, suffix: " t/ha", label: "Production par semaine" },
        { value: 30, suffix: " %", label: "Teneur en protéines" },
      ],
      compareTitle: "Azolla face aux cultures classiques",
      compare: [
        { name: "Azolla", value: 100, color: "fresh" },
        { name: "Soja", value: 35, color: "mint" },
        { name: "Maïs", value: 22, color: "water" },
      ],
      compareNote: "Production relative de protéines par hectare et par semaine",
      coverageLabel: "Couverture Azolla en direct",
      coverageNote: "La couverture progresse au défilement — simulation de la propagation sur l'eau.",
    },
    benefits: {
      tag: "Bénéfices",
      title: "Pourquoi les agriculteurs choisissent l'Azolla",
      items: [
        { icon: "Beef", t: "Riche en protéines", d: "25 à 30 % de protéines, idéal pour bétail, volaille et poissons." },
        { icon: "Wallet", t: "Réduction des coûts", d: "Une alternative économique au soja et au maïs." },
        { icon: "Sprout", t: "Fertilité des sols", d: "Engrais organique riche en azote qui régénère la terre." },
        { icon: "Leaf", t: "Écologique", d: "Faible empreinte hydrique, capture le CO₂." },
      ],
    },
    howto: {
      tag: "Étape par étape",
      title: "Comment cultiver l'Azolla",
      steps: [
        { t: "Bassin", d: "Un bassin peu profond, ouvert et bien éclairé." },
        { t: "Profondeur", d: "Maintenir 10 à 15 cm d'eau propre." },
        { t: "Nutriments", d: "Ajouter une petite dose de matière organique." },
        { t: "Entretien", d: "Surveiller température et pH quotidiennement." },
        { t: "Récolte", d: "Prélever chaque jour, laisser le reste se régénérer." },
      ],
    },
    business: {
      tag: "Opportunité",
      title: "Peu d'intrants. Des résultats rapides.",
      sub: "L'Azolla ouvre de nouveaux horizons aux agriculteurs et investisseurs tunisiens.",
      points: [
        { t: "Faible investissement", d: "Bassins simples et ressources locales." },
        { t: "Retour rapide", d: "Récolte hebdomadaire dès le premier mois." },
        { t: "Marché en plein essor", d: "Demande croissante en alimentation et fertilisation bio." },
      ],
    },
    gallery: {
      tag: "Galerie",
      title: "Fermes d'Azolla — Tunisie",
      caption: "Ferme d'Azolla — Tunisie",
    },
    testimonials: {
      tag: "Témoignages",
      title: "Ce que disent nos partenaires",
      items: [
        { name: "Mohamed El Haj", role: "Agriculteur, Sfax", quote: "J'ai réduit mes coûts d'alimentation de 40 % grâce à l'Azolla. Les résultats dépassent mes attentes." },
        { name: "Leïla Ben Omar", role: "Investisseuse, Tunis", quote: "Un projet élégant, à retour rapide. L'Azolla est une vraie opportunité d'investissement vert." },
        { name: "Ahmed Trabelsi", role: "Éleveur, Kairouan", quote: "Plus de lait et des bêtes en meilleure santé. Je recommande à tout agriculteur." },
      ],
    },
    contact: {
      tag: "Démarrer",
      title: "Prêt à cultiver l'avenir ?",
      sub: "Contactez-nous aujourd'hui et lancez votre projet Azolla.",
      name: "Nom complet",
      phone: "Téléphone",
      message: "Votre message",
      send: "Envoyer le message",
      whatsapp: "Discuter sur WhatsApp",
      success: "Votre message a bien été envoyé !",
      location: "Tunisie",
    },
    footer: {
      tagline: "Cultiver l'avenir, dès aujourd'hui.",
      rights: "Tous droits réservés",
    },
  },
};

export type Translation = (typeof translations)["ar"];
