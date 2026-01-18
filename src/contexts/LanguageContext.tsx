import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "lv" | "ru";

interface Translations {
  [key: string]: {
    en: string;
    lv: string;
    ru: string;
  };
}

export const translations: Translations = {
  // Navigation
  home: { en: "Home", lv: "Sākums", ru: "Главная" },
  collections: { en: "Collections", lv: "Kolekcijas", ru: "Коллекции" },
  about: { en: "About", lv: "Par mums", ru: "О нас" },
  bespoke: { en: "Bespoke", lv: "Individuālais dizains", ru: "На заказ" },
  contact: { en: "Contact", lv: "Kontakti", ru: "Контакты" },

  // Hero
  diamonds: { en: "DIAMONDS", lv: "DIMANTI", ru: "БРИЛЛИАНТЫ" },
  discoverLatestJewelry: { en: "Discover our latest jewelry", lv: "Atklājiet mūsu jaunākos rotaslietas", ru: "Откройте наши новые украшения" },
  heroDescription: {
    en: "creations crafted with love and attention to detail. Our features exquisite pieces adorned with sparkling diamonds, adding luxury and elegance to your ensemble.",
    lv: "radītas ar mīlestību un uzmanību detaļām. Mūsu izsmalcināti darbi rotāti ar mirdzošiem dimantiem, piešķirot jūsu tēlam greznību un eleganci.",
    ru: "созданные с любовью и вниманием к деталям. Наши изысканные изделия, украшенные сверкающими бриллиантами, добавят роскоши и элегантности вашему образу."
  },
  goToCatalog: { en: "Go To Catalog", lv: "Uz katalogu", ru: "В каталог" },

  // Collections
  ourCollections: { en: "Our Collections", lv: "Mūsu kolekcijas", ru: "Наши коллекции" },
  curatedExcellence: { en: "Curated Excellence", lv: "Augstākā kvalitāte", ru: "Отборное совершенство" },
  collectionsDescription: {
    en: "Each piece in our collection represents the pinnacle of diamond craftsmanship, sourced ethically and cut to perfection.",
    lv: "Katrs mūsu kolekcijas eksemplārs pārstāv augstāko dimantu meistarības līmeni, iegūts ētiski un griezts līdz pilnībai.",
    ru: "Каждое изделие в нашей коллекции представляет вершину мастерства огранки бриллиантов, добытых этично и ограненных до совершенства."
  },
  necklaces: { en: "Necklaces", lv: "Kaklarotas", ru: "Колье" },
  rings: { en: "Rings", lv: "Gredzeni", ru: "Кольца" },
  earrings: { en: "Earrings", lv: "Auskari", ru: "Серьги" },
  bracelets: { en: "Bracelets", lv: "Aproces", ru: "Браслеты" },
  pieces: { en: "pieces", lv: "gabali", ru: "шт." },
  explore: { en: "Explore", lv: "Apskatīt", ru: "Смотреть" },
  necklacesDesc: { en: "Elegant pendants & statement pieces", lv: "Eleganti kuloni un izsmalcināti rotājumi", ru: "Элегантные подвески и эффектные украшения" },
  ringsDesc: { en: "Engagement & eternity bands", lv: "Saderināšanās un mūžības gredzeni", ru: "Обручальные и вечные кольца" },
  earringsDesc: { en: "Studs, drops & chandeliers", lv: "Nagliņas, pilieni un lustras", ru: "Пусеты, капли и люстры" },
  braceletsDesc: { en: "Tennis & bangle collections", lv: "Tenisa un stīvu aproču kolekcijas", ru: "Теннисные и жесткие браслеты" },

  // About
  ourStory: { en: "Our Story", lv: "Mūsu stāsts", ru: "Наша история" },
  whereEastMeets: { en: "Where East Meets", lv: "Kur Austrumi satiek", ru: "Где Восток встречает" },
  baltic: { en: "Baltic", lv: "Baltiju", ru: "Балтику" },
  aboutP1: {
    en: "Surat Diamond Latvia was born from a vision to bring the legendary diamond expertise of Surat, India's diamond heartland, to the sophisticated markets of the Baltic region.",
    lv: "Surat Diamond Latvia dzima no vīzijas nest leģendāro Suratas dimantu ekspertīzi, Indijas dimantu sirdi, uz izsmalcināto Baltijas reģiona tirgu.",
    ru: "Surat Diamond Latvia родилась из желания принести легендарное мастерство огранки из Сурата, бриллиантового сердца Индии, на изысканные рынки Балтийского региона."
  },
  aboutP2: {
    en: "From our elegant showroom in Riga's historic center, we offer an exclusive selection of certified diamonds and bespoke jewelry that honors both traditions—Indian precision cutting and European design aesthetics.",
    lv: "No mūsu elegantā izstāžu zāle Rīgas vēsturiskajā centrā mēs piedāvājam ekskluzīvu sertificētu dimantu un individuālu rotaslietu izvēli, kas godina abas tradīcijas — Indijas precīzo griešanu un Eiropas dizaina estētiku.",
    ru: "Из нашего элегантного шоу-рума в историческом центре Риги мы предлагаем эксклюзивную коллекцию сертифицированных бриллиантов и украшений на заказ, чтящих обе традиции — индийскую точность огранки и европейскую эстетику дизайна."
  },
  discoverHeritage: { en: "Discover Our Heritage", lv: "Atklājiet mūsu mantojumu", ru: "Узнайте о нашем наследии" },
  suratHeritage: { en: "Surat Heritage", lv: "Suratas mantojums", ru: "Наследие Сурата" },
  suratHeritageDesc: { en: "Direct connections to Surat, the diamond capital of India, ensuring access to the finest stones.", lv: "Tiešie sakari ar Suratu, Indijas dimantu galvaspilsētu, nodrošinot piekļuvi vislabākajiem akmeņiem.", ru: "Прямые связи с Суратом, бриллиантовой столицей Индии, обеспечивая доступ к лучшим камням." },
  expertCraftsmanship: { en: "Expert Craftsmanship", lv: "Meistara darbs", ru: "Мастерство" },
  expertCraftsmanshipDesc: { en: "Every piece is crafted by master artisans with decades of experience in fine jewelry.", lv: "Katru gabalu izveido meistari ar gadu desmitiem ilgu pieredzi augstākās klases rotaslietās.", ru: "Каждое изделие создано мастерами с многолетним опытом работы с ювелирными украшениями." },
  ethicalSourcing: { en: "Ethical Sourcing", lv: "Ētiska ieguva", ru: "Этичная добыча" },
  ethicalSourcingDesc: { en: "Committed to conflict-free diamonds and sustainable, responsible practices.", lv: "Apņemšanās izmantot bezkonfliktu dimantus un ilgtspējīgu, atbildīgu praksi.", ru: "Приверженность бесконфликтным бриллиантам и устойчивым, ответственным практикам." },
  balticElegance: { en: "Baltic Elegance", lv: "Baltijas elegance", ru: "Балтийская элегантность" },
  balticEleganceDesc: { en: "Blending Indian diamond expertise with Latvian design sensibilities.", lv: "Apvienojot Indijas dimantu ekspertīzi ar Latvijas dizaina izjūtu.", ru: "Сочетание индийского мастерства огранки с латвийским дизайнерским чутьем." },

  // Testimonials
  testimonials: { en: "Testimonials", lv: "Atsauksmes", ru: "Отзывы" },
  wordsOfAppreciation: { en: "Words of Appreciation", lv: "Pateicības vārdi", ru: "Слова благодарности" },

  // Bespoke
  bespokeCreation: { en: "Bespoke Creation", lv: "Individuālais radījums", ru: "Изготовление на заказ" },
  yourVisionOurCraft: { en: "Your Vision, Our Craft", lv: "Jūsu vīzija, mūsu meistarība", ru: "Ваше видение, наше мастерство" },
  bespokeDescription: {
    en: "Create a one-of-a-kind piece that tells your unique story. Our bespoke service transforms your dreams into eternal brilliance.",
    lv: "Izveidojiet unikālu darbu, kas stāsta jūsu īpašo stāstu. Mūsu individuālais serviss pārvērš jūsu sapņus mūžīgā spožumā.",
    ru: "Создайте уникальное украшение, которое расскажет вашу особенную историю. Наш индивидуальный сервис превратит ваши мечты в вечное сияние."
  },
  consultation: { en: "Consultation", lv: "Konsultācija", ru: "Консультация" },
  consultationDesc: { en: "Share your vision with our design team in a private session.", lv: "Dalieties ar savu vīziju ar mūsu dizaina komandu privātā sesijā.", ru: "Поделитесь своим видением с нашей командой дизайнеров на приватной встрече." },
  stoneSelection: { en: "Stone Selection", lv: "Akmeņu izvēle", ru: "Выбор камня" },
  stoneSelectionDesc: { en: "Choose from our curated selection of certified diamonds.", lv: "Izvēlieties no mūsu rūpīgi atlasītajiem sertificētajiem dimantiem.", ru: "Выберите из нашей курированной коллекции сертифицированных бриллиантов." },
  designCraft: { en: "Design & Craft", lv: "Dizains un izgatavošana", ru: "Дизайн и изготовление" },
  designCraftDesc: { en: "Our master artisans bring your vision to life with precision.", lv: "Mūsu meistari iedzīvina jūsu vīziju ar precizitāti.", ru: "Наши мастера воплотят ваше видение в жизнь с точностью." },
  reveal: { en: "Reveal", lv: "Atklāšana", ru: "Презентация" },
  revealDesc: { en: "Unveil your unique piece in an unforgettable presentation.", lv: "Atklājiet savu unikālo darbu neaizmirstamā prezentācijā.", ru: "Представьте ваше уникальное украшение на незабываемой презентации." },
  startBespokeJourney: { en: "Start Your Bespoke Journey", lv: "Sāciet savu individuālo ceļojumu", ru: "Начните ваш индивидуальный путь" },

  // Contact
  getInTouch: { en: "Get in Touch", lv: "Sazinies ar mums", ru: "Свяжитесь с нами" },
  beginYourJourney: { en: "Begin Your Journey", lv: "Sāciet savu ceļojumu", ru: "Начните ваш путь" },
  contactDescription: {
    en: "Whether you're seeking the perfect engagement ring or a bespoke piece, our diamond experts are here to guide you.",
    lv: "Neatkarīgi no tā, vai meklējat ideālu saderināšanās gredzenu vai individuālu rotaslietu, mūsu dimantu eksperti ir gatavi jūs vadīt.",
    ru: "Ищете ли вы идеальное обручальное кольцо или украшение на заказ, наши эксперты по бриллиантам готовы помочь вам."
  },
  firstName: { en: "First Name", lv: "Vārds", ru: "Имя" },
  lastName: { en: "Last Name", lv: "Uzvārds", ru: "Фамилия" },
  email: { en: "Email", lv: "E-pasts", ru: "Электронная почта" },
  interest: { en: "Interest", lv: "Interese", ru: "Интерес" },
  selectInterest: { en: "Select your interest", lv: "Izvēlieties savu interesi", ru: "Выберите ваш интерес" },
  engagementRings: { en: "Engagement Rings", lv: "Saderināšanās gredzeni", ru: "Обручальные кольца" },
  bespokeJewelry: { en: "Bespoke Jewelry", lv: "Individuālas rotaslietas", ru: "Украшения на заказ" },
  collectionPieces: { en: "Collection Pieces", lv: "Kolekcijas priekšmeti", ru: "Коллекционные изделия" },
  privateConsultation: { en: "Private Consultation", lv: "Privāta konsultācija", ru: "Приватная консультация" },
  message: { en: "Message", lv: "Ziņojums", ru: "Сообщение" },
  messagePlaceholder: { en: "Tell us about your vision...", lv: "Pastāstiet mums par savu vīziju...", ru: "Расскажите нам о вашем видении..." },
  sendInquiry: { en: "Send Inquiry", lv: "Nosūtīt pieprasījumu", ru: "Отправить запрос" },
  visitUs: { en: "Visit Us", lv: "Apmeklējiet mūs", ru: "Посетите нас" },
  callUs: { en: "Call Us", lv: "Zvaniet mums", ru: "Позвоните нам" },
  emailUs: { en: "Email Us", lv: "Rakstiet mums", ru: "Напишите нам" },
  openingHours: { en: "Opening Hours", lv: "Darba laiks", ru: "Часы работы" },
  artNouveauDistrict: { en: "Historic Art Nouveau District", lv: "Vēsturiskais jūgendstila rajons", ru: "Исторический район модерна" },
  responseTime: { en: "Response within 24 hours", lv: "Atbilde 24 stundu laikā", ru: "Ответ в течение 24 часов" },
  privateViewings: { en: "Private viewings by appointment", lv: "Privātas apskates pēc pieraksta", ru: "Приватные просмотры по записи" },
  followJourney: { en: "Follow Our Journey", lv: "Sekojiet mūsu ceļojumam", ru: "Следите за нами" },

  // Footer
  services: { en: "Services", lv: "Pakalpojumi", ru: "Услуги" },
  company: { en: "Company", lv: "Uzņēmums", ru: "Компания" },
  bespokeDesign: { en: "Bespoke Design", lv: "Individuālais dizains", ru: "Индивидуальный дизайн" },
  diamondEducation: { en: "Diamond Education", lv: "Dimantu izglītība", ru: "Обучение о бриллиантах" },
  ringSizing: { en: "Ring Sizing", lv: "Gredzenu izmēri", ru: "Размер кольца" },
  aftercare: { en: "Aftercare", lv: "Pēcapkope", ru: "Послепродажное обслуживание" },
  sustainability: { en: "Sustainability", lv: "Ilgtspējība", ru: "Устойчивость" },
  careers: { en: "Careers", lv: "Karjera", ru: "Карьера" },
  press: { en: "Press", lv: "Prese", ru: "Пресса" },
  footerDescription: {
    en: "Where Surat's legendary diamond heritage meets Baltic elegance. Crafting moments of eternal brilliance in the heart of Riga.",
    lv: "Kur Suratas leģendārais dimantu mantojums satiekas ar Baltijas eleganci. Veidojam mūžīga spožuma mirkļus Rīgas sirdī.",
    ru: "Где легендарное бриллиантовое наследие Сурата встречается с балтийской элегантностью. Создаем моменты вечного сияния в сердце Риги."
  },
  allRightsReserved: { en: "All rights reserved.", lv: "Visas tiesības aizsargātas.", ru: "Все права защищены." },
  privacyPolicy: { en: "Privacy Policy", lv: "Privātuma politika", ru: "Политика конфиденциальности" },
  termsOfService: { en: "Terms of Service", lv: "Pakalpojumu noteikumi", ru: "Условия обслуживания" },

  // Legal & Compliance
  companyName: { en: "Surat Diamond Latvia SIA", lv: "Surat Diamond Latvia SIA", ru: "Surat Diamond Latvia SIA" },
  regNo: { en: "Reg. No. 40003000000", lv: "Reģ. Nr. 40003000000", ru: "Рег. № 40003000000" },
  legalAddress: { en: "Legal Address: Elizabetes iela 22, Riga LV-1050", lv: "Juridiskā adrese: Elizabetes iela 22, Rīga LV-1050", ru: "Юридический адрес: Элизабетес 22, Рига LV-1050" },
  assayOffice: {
    en: "All precious metals and gemstones are certified by the Assay Office of Latvia (Latvijas Proves Birojs).",
    lv: "Visi dārgmetāli un dārgakmeņi ir sertificēti Latvijas Proves birojā.",
    ru: "Все драгоценные металлы и камни сертифицированы Пробирным бюро Латвии (Latvijas Proves Birojs)."
  },
  cookieConsentText: {
    en: "We use cookies to improve your experience. By continuing to visit this site you agree to our use of cookies.",
    lv: "Mēs izmantojam sīkdatnes, lai uzlabotu jūsu pieredzi. Turpinot apmeklēt šo vietni, jūs piekrītat mūsu sīkdatņu izmantošanai.",
    ru: "Мы используем файлы cookie для улучшения вашего опыта. Продолжая посещать этот сайт, вы соглашаетесь с использованием нами файлов cookie."
  },
  accept: { en: "Accept", lv: "Pieņemt", ru: "Принять" },
  decline: { en: "Decline", lv: "Noraidīt", ru: "Отклонить" },

  // Shop
  all: { en: "All", lv: "Visi", ru: "Все" },
  shop: { en: "Shop", lv: "Veikals", ru: "Магазин" },
  addToCart: { en: "Add to Cart", lv: "Pievienot grozam", ru: "В корзину" },
  addedToCart: { en: "Added to cart!", lv: "Pievienots grozam!", ru: "Добавлено в корзину!" },
  viewDetails: { en: "View Details", lv: "Skatīt detaļas", ru: "Подробнее" },
  noProductsFound: { en: "No products found in this category.", lv: "Šajā kategorijā nav atrasti produkti.", ru: "В этой категории товары не найдены." },
  viewAllProducts: { en: "View All Products", lv: "Skatīt visus produktus", ru: "Смотреть все товары" },

  // Checkout
  shoppingCart: { en: "Shopping Cart", lv: "Iepirkumu grozs", ru: "Корзина" },
  yourCartIsEmpty: { en: "Your Cart is Empty", lv: "Jūsu grozs ir tukšs", ru: "Ваша корзина пуста" },
  discoverCollection: { en: "Discover our exquisite collection of diamond jewelry", lv: "Atklājiet mūsu izsmalcināto dimantu rotaslietu kolekciju", ru: "Откройте нашу изысканную коллекцию бриллиантовых украшений" },
  exploreCollection: { en: "Explore Collection", lv: "Apskatīt kolekciju", ru: "Смотреть коллекцию" },
  orderSummary: { en: "Order Summary", lv: "Pasūtījuma kopsavilkums", ru: "Сводка заказа" },
  subtotal: { en: "Subtotal", lv: "Starpsumma", ru: "Промежуточный итог" },
  shipping: { en: "Shipping", lv: "Piegāde", ru: "Доставка" },
  free: { en: "Free", lv: "Bezmaksas", ru: "Бесплатно" },
  total: { en: "Total", lv: "Kopā", ru: "Итого" },
  proceedToCheckout: { en: "Proceed to Secure Checkout", lv: "Turpināt uz drošu apmaksu", ru: "Перейти к безопасной оплате" },
  securePayment: { en: "Secure Payment via Stripe", lv: "Droša maksājuma caur Stripe", ru: "Безопасная оплата через Stripe" },
  processing: { en: "Processing...", lv: "Apstrādā...", ru: "Обработка..." },

  // WhatsApp Checkout
  orderViaWhatsApp: { en: "Order via WhatsApp", lv: "Pasūtīt caur WhatsApp", ru: "Заказать через WhatsApp" },
  whatsappSecureOrder: { en: "Order via WhatsApp Chat", lv: "Pasūtīt caur WhatsApp čatu", ru: "Заказать через чат WhatsApp" },
  whatsappOpened: { en: "WhatsApp opened! Complete your order there.", lv: "WhatsApp atvērts! Pabeidziet pasūtījumu tur.", ru: "WhatsApp открыт! Завершите заказ там." },
  paymentSuccess: { en: "Payment Successful!", lv: "Maksājums veiksmīgs!", ru: "Оплата успешна!" },
  thankYouOrder: { en: "Thank you for your order!", lv: "Paldies par jūsu pasūtījumu!", ru: "Спасибо за ваш заказ!" },
  orderConfirmation: { en: "Your order has been placed successfully. We'll send you a confirmation email shortly.", lv: "Jūsu pasūtījums ir veiksmīgi noformēts. Mēs drīzumā nosūtīsim jums apstiprinājuma e-pastu.", ru: "Ваш заказ успешно оформлен. Мы скоро отправим вам письмо с подтверждением." },
  continueShopping: { en: "Continue Shopping", lv: "Turpināt iepirkties", ru: "Продолжить покупки" },
  returnHome: { en: "Return Home", lv: "Atgriezties mājās", ru: "На главную" },
  paymentCanceled: { en: "Payment Canceled", lv: "Maksājums atcelts", ru: "Оплата отменена" },
  paymentCanceledDesc: { en: "Your payment was canceled. Your cart items are still saved.", lv: "Jūsu maksājums tika atcelts. Jūsu groza preces joprojām ir saglabātas.", ru: "Ваш платеж был отменен. Товары в корзине сохранены." },
  tryAgain: { en: "Try Again", lv: "Mēģināt vēlreiz", ru: "Попробовать снова" },
  checkoutError: { en: "Checkout Error", lv: "Apmaksas kļūda", ru: "Ошибка оплаты" },

  // Auth
  welcomeBack: { en: "Welcome Back", lv: "Laipni lūdzam atpakaļ", ru: "С возвращением" },
  createAccount: { en: "Create Account", lv: "Izveidot kontu", ru: "Создать аккаунт" },
  signInToContinue: { en: "Sign in to continue shopping", lv: "Piesakieties, lai turpinātu iepirkties", ru: "Войдите, чтобы продолжить покупки" },
  joinToShop: { en: "Join us to start shopping", lv: "Pievienojieties mums, lai sāktu iepirkties", ru: "Присоединяйтесь, чтобы начать покупки" },
  enterEmail: { en: "Enter your email", lv: "Ievadiet savu e-pastu", ru: "Введите ваш email" },
  password: { en: "Password", lv: "Parole", ru: "Пароль" },
  enterPassword: { en: "Enter your password", lv: "Ievadiet savu paroli", ru: "Введите ваш пароль" },
  confirmPassword: { en: "Confirm Password", lv: "Apstipriniet paroli", ru: "Подтвердите пароль" },
  confirmYourPassword: { en: "Confirm your password", lv: "Apstipriniet savu paroli", ru: "Подтвердите ваш пароль" },
  signIn: { en: "Sign In", lv: "Pieteikties", ru: "Войти" },
  signUp: { en: "Sign Up", lv: "Reģistrēties", ru: "Зарегистрироваться" },
  signOut: { en: "Sign Out", lv: "Izrakstīties", ru: "Выйти" },
  dontHaveAccount: { en: "Don't have an account?", lv: "Nav konta?", ru: "Нет аккаунта?" },
  alreadyHaveAccount: { en: "Already have an account?", lv: "Jau ir konts?", ru: "Уже есть аккаунт?" },
  continueBrowsing: { en: "Continue browsing", lv: "Turpināt pārlūkošanu", ru: "Продолжить просмотр" },
  loginSuccess: { en: "Login successful!", lv: "Veiksmīga pieteikšanās!", ru: "Успешный вход!" },
  accountCreated: { en: "Account created successfully!", lv: "Konts veiksmīgi izveidots!", ru: "Аккаунт успешно создан!" },
  passwordsDoNotMatch: { en: "Passwords do not match", lv: "Paroles nesakrīt", ru: "Пароли не совпадают" },
  passwordTooShort: { en: "Password must be at least 6 characters", lv: "Parolei jābūt vismaz 6 rakstzīmēm", ru: "Пароль должен быть не менее 6 символов" },
  authError: { en: "Authentication error. Please try again.", lv: "Autentifikācijas kļūda. Lūdzu, mēģiniet vēlreiz.", ru: "Ошибка аутентификации. Попробуйте снова." },
  loginToCheckout: { en: "Please sign in to checkout", lv: "Lūdzu, piesakieties, lai apmaksātu", ru: "Пожалуйста, войдите для оформления заказа" },
  account: { en: "Account", lv: "Konts", ru: "Аккаунт" },
  forgotPassword: { en: "Forgot password?", lv: "Aizmirsi paroli?", ru: "Забыли пароль?" },
  resetPassword: { en: "Reset Password", lv: "Atjaunot paroli", ru: "Сбросить пароль" },
  sendResetLink: { en: "Send Reset Link", lv: "Nosūtīt atjaunošanas saiti", ru: "Отправить ссылку для сброса" },
  resetLinkSent: { en: "Password reset link sent! Check your email.", lv: "Paroles atjaunošanas saite nosūtīta! Pārbaudiet savu e-pastu.", ru: "Ссылка для сброса пароля отправлена! Проверьте почту." },
  backToLogin: { en: "Back to login", lv: "Atpakaļ uz pieteikšanos", ru: "Вернуться к входу" },
  newPassword: { en: "New Password", lv: "Jauna parole", ru: "Новый пароль" },
  confirmNewPassword: { en: "Confirm New Password", lv: "Apstipriniet jauno paroli", ru: "Подтвердите новый пароль" },
  updatePassword: { en: "Update Password", lv: "Atjaunināt paroli", ru: "Обновить пароль" },
  passwordUpdated: { en: "Password updated successfully!", lv: "Parole veiksmīgi atjaunināta!", ru: "Пароль успешно обновлен!" },
  enterEmailForReset: { en: "Enter your email to receive a reset link", lv: "Ievadiet savu e-pastu, lai saņemtu atjaunošanas saiti", ru: "Введите email для получения ссылки сброса" },
  setNewPassword: { en: "Set your new password", lv: "Iestatiet jauno paroli", ru: "Установите новый пароль" },

  // Profile
  profile: { en: "Profile", lv: "Profils", ru: "Профиль" },
  orders: { en: "Orders", lv: "Pasūtījumi", ru: "Заказы" },
  wishlist: { en: "Wishlist", lv: "Vēlmju saraksts", ru: "Список желаний" },
  personalInfo: { en: "Personal Information", lv: "Personīgā informācija", ru: "Личная информация" },
  phone: { en: "Phone", lv: "Telefons", ru: "Телефон" },
  shippingAddress: { en: "Shipping Address", lv: "Piegādes adrese", ru: "Адрес доставки" },
  address: { en: "Address", lv: "Adrese", ru: "Адрес" },
  city: { en: "City", lv: "Pilsēta", ru: "Город" },
  postalCode: { en: "Postal Code", lv: "Pasta indekss", ru: "Почтовый индекс" },
  country: { en: "Country", lv: "Valsts", ru: "Страна" },
  saveChanges: { en: "Save Changes", lv: "Saglabāt izmaiņas", ru: "Сохранить изменения" },
  orderHistory: { en: "Order History", lv: "Pasūtījumu vēsture", ru: "История заказов" },
  noOrdersYet: { en: "You haven't placed any orders yet.", lv: "Jūs vēl neesat veicis nevienu pasūtījumu.", ru: "Вы еще не сделали ни одного заказа." },
  startShopping: { en: "Start Shopping", lv: "Sākt iepirkties", ru: "Начать покупки" },
  order: { en: "Order", lv: "Pasūtījums", ru: "Заказ" },
  myWishlist: { en: "My Wishlist", lv: "Mans vēlmju saraksts", ru: "Мой список желаний" },
  wishlistEmpty: { en: "Your wishlist is empty.", lv: "Jūsu vēlmju saraksts ir tukšs.", ru: "Ваш список желаний пуст." },
  itemsInWishlist: { en: "items in wishlist", lv: "preces vēlmju sarakstā", ru: "товаров в списке желаний" },
  viewProducts: { en: "View Products", lv: "Skatīt produktus", ru: "Смотреть товары" },
  addToWishlist: { en: "Add to Wishlist", lv: "Pievienot vēlmju sarakstam", ru: "В список желаний" },
  removeFromWishlist: { en: "Remove from Wishlist", lv: "Noņemt no vēlmju saraksta", ru: "Удалить из списка желаний" },

  // Legal Pages
  lastUpdated: { en: "Last Updated", lv: "Pēdējoreiz atjaunināts", ru: "Последнее обновление" },

  // Privacy Policy
  privacyIntroTitle: { en: "Introduction", lv: "Ievads", ru: "Введение" },
  privacyIntroText: {
    en: "At Surat Diamond Latvia, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.",
    lv: "Surat Diamond Latvia mēs esam apņēmušies aizsargāt jūsu privātumu un nodrošināt jūsu personiskās informācijas drošību. Šī privātuma politika izskaidro, kā mēs apkopojam, izmantojam un aizsargājam jūsu datus, kad apmeklējat mūsu vietni vai veicat pirkumu.",
    ru: "В Surat Diamond Latvia мы стремимся защитить вашу конфиденциальность и обеспечить безопасность вашей личной информации. Эта политика конфиденциальности объясняет, как мы собираем, используем и защищаем ваши данные при посещении нашего сайта или совершении покупки."
  },
  infoCollectTitle: { en: "Information We Collect", lv: "Informācija, ko mēs apkopojam", ru: "Информация, которую мы собираем" },
  infoCollectText: {
    en: "We collect information that you provide directly to us, including:",
    lv: "Mēs apkopojam informāciju, ko jūs mums tieši sniedzat, tostarp:",
    ru: "Мы собираем информацию, которую вы предоставляете нам напрямую, включая:"
  },
  infoCollectItem1: { en: "Name, email address, and contact information", lv: "Vārds, e-pasta adrese un kontaktinformācija", ru: "Имя, адрес электронной почты и контактную информацию" },
  infoCollectItem2: { en: "Shipping and billing addresses", lv: "Piegādes un norēķinu adreses", ru: "Адреса доставки и выставления счетов" },
  infoCollectItem3: { en: "Payment information (processed securely by Stripe)", lv: "Maksājumu informācija (droši apstrādā Stripe)", ru: "Платежная информация (безопасно обрабатывается Stripe)" },
  infoCollectItem4: { en: "Order history and preferences", lv: "Pasūtījumu vēsture un preferences", ru: "История заказов и предпочтения" },
  infoUseTitle: { en: "How We Use Your Information", lv: "Kā mēs izmantojam jūsu informāciju", ru: "Как мы используем вашу информацию" },
  infoUseText: {
    en: "We use the information we collect to:",
    lv: "Mēs izmantojam savākto informāciju, lai:",
    ru: "Мы используем собранную информацию для:"
  },
  infoUseItem1: { en: "Process and fulfill your orders", lv: "Apstrādātu un izpildītu jūsu pasūtījumus", ru: "Обработки и выполнения ваших заказов" },
  infoUseItem2: { en: "Communicate with you about your purchases", lv: "Sazinātos ar jums par jūsu pirkumiem", ru: "Связи с вами по поводу ваших покупок" },
  infoUseItem3: { en: "Send promotional emails (with your consent)", lv: "Nosūtītu reklāmas e-pastus (ar jūsu piekrišanu)", ru: "Отправки рекламных писем (с вашего согласия)" },
  infoUseItem4: { en: "Improve our website and services", lv: "Uzlabotu mūsu vietni un pakalpojumus", ru: "Улучшения нашего сайта и услуг" },
  dataSharingTitle: { en: "Data Sharing", lv: "Datu kopīgošana", ru: "Передача данных" },
  dataSharingText: {
    en: "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, processing payments, and delivering orders. These partners are bound by confidentiality agreements.",
    lv: "Mēs nepārdodam, nemainām un neiznomājam jūsu personisko informāciju trešajām pusēm. Mēs varam dalīties ar jūsu informāciju ar uzticamiem pakalpojumu sniedzējiem, kas palīdz mums darbināt mūsu vietni, apstrādāt maksājumus un piegādāt pasūtījumus. Šie partneri ir saistīti ar konfidencialitātes līgumiem.",
    ru: "Мы не продаем, не обмениваем и не сдаем в аренду вашу личную информацию третьим лицам. Мы можем делиться вашей информацией с надежными поставщиками услуг, которые помогают нам в работе сайта, обработке платежей и доставке заказов. Эти партнеры связаны соглашениями о конфиденциальности."
  },
  dataSecurityTitle: { en: "Data Security", lv: "Datu drošība", ru: "Безопасность данных" },
  dataSecurityText: {
    en: "We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology and processed through Stripe's secure payment infrastructure.",
    lv: "Mēs ieviešam nozares standarta drošības pasākumus, lai aizsargātu jūsu personisko informāciju. Visi maksājumu darījumi ir šifrēti, izmantojot SSL tehnoloģiju, un tiek apstrādāti caur Stripe drošo maksājumu infrastruktūru.",
    ru: "Мы применяем стандартные отраслевые меры безопасности для защиты вашей личной информации. Все платежные транзакции шифруются с использованием технологии SSL и обрабатываются через защищенную платежную инфраструктуру Stripe."
  },
  cookiesTitle: { en: "Cookies", lv: "Sīkdatnes", ru: "Файлы cookie" },
  cookiesText: {
    en: "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings.",
    lv: "Mēs izmantojam sīkdatnes, lai uzlabotu jūsu pārlūkošanas pieredzi, analizētu vietnes apmeklējumu un personalizētu saturu. Jūs varat pārvaldīt sīkdatņu preferences caur pārlūkprogrammas iestatījumiem.",
    ru: "Мы используем файлы cookie для улучшения вашего опыта просмотра, анализа трафика сайта и персонализации контента. Вы можете управлять настройками cookie через настройки браузера."
  },
  yourRightsTitle: { en: "Your Rights", lv: "Jūsu tiesības", ru: "Ваши права" },
  yourRightsText: {
    en: "Under GDPR and applicable data protection laws, you have the following rights:",
    lv: "Saskaņā ar GDPR un piemērojamiem datu aizsardzības likumiem jums ir šādas tiesības:",
    ru: "В соответствии с GDPR и применимым законодательством о защите данных у вас есть следующие права:"
  },
  yourRightsItem1: { en: "Right to access your personal data", lv: "Tiesības piekļūt saviem personiskajiem datiem", ru: "Право на доступ к вашим персональным данным" },
  yourRightsItem2: { en: "Right to rectification of inaccurate data", lv: "Tiesības labot neprecīzus datus", ru: "Право на исправление неточных данных" },
  yourRightsItem3: { en: "Right to erasure ('right to be forgotten')", lv: "Tiesības uz dzēšanu ('tiesības būt aizmirstam')", ru: "Право на удаление ('право быть забытым')" },
  yourRightsItem4: { en: "Right to data portability", lv: "Tiesības uz datu pārnesamību", ru: "Право на переносимость данных" },
  contactUsTitle: { en: "Contact Us", lv: "Sazinieties ar mums", ru: "Свяжитесь с нами" },
  contactUsText: {
    en: "If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:",
    lv: "Ja jums ir jautājumi par šo privātuma politiku vai vēlaties izmantot savas tiesības, lūdzu, sazinieties ar mums:",
    ru: "Если у вас есть вопросы о данной политике конфиденциальности или вы хотите воспользоваться своими правами, пожалуйста, свяжитесь с нами:"
  },

  // Cookie Constants
  cookieBannerTitle: { en: "Cookie Consent", lv: "Sīkdatņu piekrišana", ru: "Согласие на использование cookie" },

  // Terms of Service
  termsIntroTitle: { en: "Agreement to Terms", lv: "Piekrišana noteikumiem", ru: "Согласие с условиями" },
  termsIntroText: {
    en: "By accessing or using the Surat Diamond Latvia website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
    lv: "Piekļūstot vai izmantojot Surat Diamond Latvia vietni un pakalpojumus, jūs piekrītat šiem pakalpojumu noteikumiem. Ja jūs nepiekrītat šiem noteikumiem, lūdzu, neizmantojiet mūsu pakalpojumus.",
    ru: "Получая доступ к веб-сайту и услугам Surat Diamond Latvia или используя их, вы соглашаетесь соблюдать настоящие Условия обслуживания. Если вы не согласны с этими условиями, пожалуйста, не используйте наши услуги."
  },
  productsServicesTitle: { en: "Products and Services", lv: "Produkti un pakalpojumi", ru: "Продукты и услуги" },
  productsServicesText: {
    en: "All products displayed on our website are subject to availability. We reserve the right to limit quantities and discontinue products at any time. Product images are for illustration purposes; actual items may vary slightly due to the unique nature of diamonds and precious stones.",
    lv: "Visi produkti, kas tiek parādīti mūsu vietnē, ir atkarīgi no pieejamības. Mēs paturam tiesības ierobežot daudzumus un pārtraukt produktu piedāvājumu jebkurā laikā. Produktu attēli ir ilustratīvi; faktiskie priekšmeti var nedaudz atšķirties dimantu un dārgakmeņu unikālās dabas dēļ.",
    ru: "Все товары, представленные на нашем сайте, зависят от наличия. Мы оставляем за собой право ограничивать количество и прекращать продажу товаров в любое время. Изображения товаров носят иллюстративный характер; фактические изделия могут немного отличаться из-за уникальной природы бриллиантов и драгоценных камней."
  },
  pricingPaymentTitle: { en: "Pricing and Payment", lv: "Cenas un maksājumi", ru: "Цены и оплата" },
  pricingPaymentText: {
    en: "All prices are displayed in Euros (€) and include applicable VAT. Payment terms:",
    lv: "Visas cenas ir norādītas eiro (€) un ietver piemērojamo PVN. Maksājumu noteikumi:",
    ru: "Все цены указаны в евро (€) и включают применимый НДС. Условия оплаты:"
  },
  pricingPaymentItem1: { en: "Full payment is required at the time of purchase", lv: "Pilna samaksa ir nepieciešama pirkuma brīdī", ru: "Полная оплата требуется в момент покупки" },
  pricingPaymentItem2: { en: "We accept major credit cards through Stripe", lv: "Mēs pieņemam galvenās kredītkartes caur Stripe", ru: "Мы принимаем основные кредитные карты через Stripe" },
  pricingPaymentItem3: { en: "Prices are subject to change without notice", lv: "Cenas var mainīties bez iepriekšēja brīdinājuma", ru: "Цены могут быть изменены без предварительного уведомления" },
  shippingDeliveryTitle: { en: "Shipping and Delivery", lv: "Piegāde", ru: "Доставка" },
  shippingDeliveryText: {
    en: "We offer insured shipping within the European Union. Delivery times typically range from 5-10 business days. All shipments are fully insured and require signature upon delivery. International shipping may be subject to customs duties and taxes.",
    lv: "Mēs piedāvājam apdrošinātu piegādi Eiropas Savienībā. Piegādes laiks parasti ir 5-10 darba dienas. Visi sūtījumi ir pilnībā apdrošināti un prasa parakstu pēc piegādes. Starptautiskajai piegādei var tikt piemēroti muitas nodokļi un nodevas.",
    ru: "Мы предлагаем застрахованную доставку в пределах Европейского Союза. Сроки доставки обычно составляют 5-10 рабочих дней. Все отправления полностью застрахованы и требуют подписи при получении. Международная доставка может облагаться таможенными пошлинами и налогами."
  },
  returnsRefundsTitle: { en: "Returns and Refunds", lv: "Atgriešana un atmaksa", ru: "Возврат и возмещение" },
  returnsRefundsText: {
    en: "We want you to be completely satisfied with your purchase. Our return policy:",
    lv: "Mēs vēlamies, lai jūs būtu pilnībā apmierināti ar savu pirkumu. Mūsu atgriešanas politika:",
    ru: "Мы хотим, чтобы вы были полностью удовлетворены своей покупкой. Наша политика возврата:"
  },
  returnsRefundsItem1: { en: "14-day return period from delivery date", lv: "14 dienu atgriešanas periods no piegādes datuma", ru: "14-дневный период возврата с даты доставки" },
  returnsRefundsItem2: { en: "Items must be unused and in original packaging", lv: "Priekšmetiem jābūt nelietotiem un oriģinālajā iepakojumā", ru: "Товары должны быть неиспользованными и в оригинальной упаковке" },
  returnsRefundsItem3: { en: "Bespoke/custom items are non-refundable", lv: "Individuāli izgatavotiem priekšmetiem atmaksa netiek veikta", ru: "Изделия на заказ не подлежат возврату" },
  warrantyTitle: { en: "Warranty", lv: "Garantija", ru: "Гарантия" },
  warrantyText: {
    en: "All our jewelry comes with a 2-year warranty covering manufacturing defects. This warranty does not cover damage from normal wear, accidents, or improper care. Diamond certifications are provided by internationally recognized gemological laboratories.",
    lv: "Visām mūsu rotaslietām ir 2 gadu garantija, kas sedz ražošanas defektus. Šī garantija neattiecas uz bojājumiem no parastās nolietošanās, nelaimes gadījumiem vai nepareizas kopšanas. Dimantu sertifikātus izsniedz starptautiski atzītas gemoloģiskās laboratorijas.",
    ru: "На все наши украшения предоставляется 2-летняя гарантия, покрывающая производственные дефекты. Эта гарантия не распространяется на повреждения от нормального износа, несчастных случаев или неправильного ухода. Сертификаты на бриллианты выдаются международно признанными геммологическими лабораториями."
  },
  intellectualPropertyTitle: { en: "Intellectual Property", lv: "Intelektuālais īpašums", ru: "Интеллектуальная собственность" },
  intellectualPropertyText: {
    en: "All content on this website, including text, images, logos, and designs, is the property of Surat Diamond Latvia and is protected by copyright and trademark laws. Unauthorized use, reproduction, or distribution is prohibited.",
    lv: "Viss saturs šajā vietnē, ieskaitot tekstu, attēlus, logotipus un dizainus, ir Surat Diamond Latvia īpašums un ir aizsargāts ar autortiesību un preču zīmju likumiem. Neatļauta izmantošana, reproducēšana vai izplatīšana ir aizliegta.",
    ru: "Весь контент на этом сайте, включая тексты, изображения, логотипы и дизайны, является собственностью Surat Diamond Latvia и защищен законами об авторском праве и товарных знаках. Несанкционированное использование, воспроизведение или распространение запрещено."
  },
  limitationLiabilityTitle: { en: "Limitation of Liability", lv: "Atbildības ierobežojums", ru: "Ограничение ответственности" },
  limitationLiabilityText: {
    en: "Surat Diamond Latvia shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our liability is limited to the purchase price of the product in question.",
    lv: "Surat Diamond Latvia nav atbildīgs par netiešiem, nejaušiem vai izrietošiem zaudējumiem, kas rodas no mūsu vietnes vai produktu izmantošanas. Mūsu atbildība ir ierobežota līdz attiecīgā produkta pirkuma cenai.",
    ru: "Surat Diamond Latvia не несет ответственности за любые косвенные, случайные или последующие убытки, возникающие в результате использования нашего веб-сайта или продуктов. Наша ответственность ограничивается покупной ценой соответствующего товара."
  },
  governingLawTitle: { en: "Governing Law", lv: "Piemērojamie likumi", ru: "Применимое право" },
  governingLawText: {
    en: "These Terms of Service are governed by the laws of the Republic of Latvia. Any disputes shall be resolved in the courts of Riga, Latvia.",
    lv: "Šie pakalpojumu noteikumi ir pakļauti Latvijas Republikas likumiem. Jebkuri strīdi tiks risināti Rīgas, Latvijas tiesās.",
    ru: "Настоящие Условия обслуживания регулируются законодательством Латвийской Республики. Любые споры подлежат разрешению в судах Риги, Латвия."
  },
  termsContactText: {
    en: "For questions about these Terms of Service, please contact us at:",
    lv: "Ja jums ir jautājumi par šiem pakalpojumu noteikumiem, lūdzu, sazinieties ar mums:",
    ru: "По вопросам, касающимся настоящих Условий обслуживания, пожалуйста, свяжитесь с нами:"
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
