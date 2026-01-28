document.addEventListener('DOMContentLoaded', () => {

    // 1. STICKY HEADER TRANSITION
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    const floatingMenu = document.getElementById('floating-menu');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        // Header Background
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Floating Menu Visibility (Show after Hero)
        if (scrollY > heroHeight - 200) {
            floatingMenu.classList.remove('hidden');
        } else {
            floatingMenu.classList.add('hidden');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // 2. SCROLL REVEAL ANIMATIONS WITH STAGGER
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class with delay for stagger effect
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach((el, index) => {
        // Add stagger delay to elements in the same section
        if (el.classList.contains('stagger-2')) {
            el.dataset.delay = 200;
        } else if (el.classList.contains('stagger-3')) {
            el.dataset.delay = 400;
        }
        observer.observe(el);
    });

    // 2.5 PARALLAX EFFECT FOR IMAGES
    const parallaxImages = document.querySelectorAll('.feature-img, .category-main-img');
    window.addEventListener('scroll', () => {
        parallaxImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                img.style.transform = `translateY(${rate * 0.1}px)`;
            }
        });
    });

    // 3. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. HIGHLIGHT ACTIVE LINK IN PILL MENU
    const pillLinks = document.querySelectorAll('.pill-link');
    const sections = Array.from(pillLinks).map(link => {
        const id = link.getAttribute('href').substring(1);
        return document.getElementById(id);
    }).filter(s => s !== null);

    const updateActivePill = () => {
        let currentSection = null;
        const scrollY = window.scrollY + 200; // Offset

        sections.forEach(section => {
            if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                currentSection = section;
            }
        });

        pillLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href') === '#' + currentSection.id) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActivePill);

    // 5. MODAL FUNCTIONALITY
    const modal = document.getElementById('pricingModal');
    const openBtn = document.getElementById('openPricingModal');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    if (modal && openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        const closeModal = () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);

        // Close on outside click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    console.log("Digismart Script Loaded (v2)");
    // --- CATEGORY SECTION LOGIC (ACCORDION) ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    const categoryImage = document.getElementById('category-dynamic-image');

    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all
                accordionItems.forEach(i => i.classList.remove('active'));

                // Add active class to clicked
                item.classList.add('active');

                // Update Image
                const newImage = item.getAttribute('data-image');
                if (newImage && categoryImage) {
                    categoryImage.style.backgroundImage = `url('${newImage}')`;
                }
            });
        });
    }

    console.log("Digismart Script with Accordion Logic Loaded (v4)");

    // 6. HERO ANIMATION CONTROLLER
    const heroSectionBtn = document.querySelector('.hero');
    const heroPauseBtn = document.getElementById('heroPauseBtn');
    let heroInterval;
    let isPaused = false;

    if (heroSectionBtn && heroPauseBtn) {
        const startHeroLoop = () => {
            clearInterval(heroInterval);
            heroInterval = setInterval(() => {
                heroSectionBtn.classList.toggle('text-mode');
            }, 3000); // 3 seconds
        };

        const togglePause = () => {
            isPaused = !isPaused;

            // Icon Toggling
            const pauseIcon = heroPauseBtn.querySelector('.pause-icon');
            const playIcon = heroPauseBtn.querySelector('.play-icon');

            if (isPaused) {
                clearInterval(heroInterval);
                pauseIcon.classList.add('hidden');
                playIcon.classList.remove('hidden');
            } else {
                startHeroLoop();
                pauseIcon.classList.remove('hidden');
                playIcon.classList.add('hidden');
            }
        };

        heroPauseBtn.addEventListener('click', togglePause);

        // Start initial loop
        startHeroLoop();
    }
});

// ==========================================
// INTERNATIONALIZATION (i18n)
// ==========================================

const translations = {
    pt: {
        nav: {
            home: 'Início',
            solutions: 'Soluções',
            contacts: 'Contactos'
        },
        hero: {
            title: 'Soluções digitais para transformar a sua vida profissional',
            desc: 'Na Digismart.ai, transformamos os seus desafios diários em oportunidades através de soluções adaptadas e inovadoras. Desde a gestão de redes sociais ao desenvolvimento de aplicações personalizadas, cada ferramenta é desenhada para resolver os seus problemas específicos e impulsionar a sua produtividade.',
            cta: 'Saber Mais'
        },
        offerings: {
            intro_title: 'As nossas soluções são...',
            custom_apps_title: 'Aplicações Personalizadas',
            custom_apps_desc: 'Simplifique os seus processos, reduza o desperdício de tempo e aumente as suas vendas com aplicações personalizadas. Modelo sem risco: paga apenas com base nos resultados alcançados.',
            social_title: 'Gestão de Redes Sociais',
            social_desc: 'Atraia e envolva os seus clientes com conteúdo criativo e estratégico. Tratamos de tudo, desde a criação à publicação, para maximizar o seu impacto online.'
        },
        category: {
            title: 'Soluções inovadoras para cada necessidade',
            subtitle: 'Descubra como as nossas soluções personalizadas podem responder aos seus desafios de negócio específicos'
        },
        accordion: {
            time_title: 'Poupança de tempo',
            time_desc: 'Num mundo onde a rapidez e a eficiência são essenciais, as nossas soluções ajudam a otimizar cada minuto do seu dia.',
            sales_title: 'Simplificação de vendas',
            sales_desc: 'Aumente as suas receitas com uma experiência de cliente fluida e sem esforço.',
            custom_title: 'Personalização completa',
            custom_desc: 'Soluções feitas à medida para refletir os valores da sua empresa.',
            content_title: 'Criação de conteúdo digital',
            content_desc: 'Mostre o seu negócio com uma presença online profissional e envolvente.'
        },
        why: {
            title: 'Porquê escolher a Digismart.ai?',
            subtitle: 'Expertise única para o seu sucesso',
            card1_title: 'Dupla Expertise',
            card1_desc: 'Uma combinação vencedora de aplicação inteligente e estratégia de redes sociais otimizada',
            card2_title: 'Financeiramente acessível a todos',
            card2_desc: 'Sem investimento inicial necessário. O seu sucesso é a nossa prioridade',
            card3_title: 'Suporte Personalizado',
            card3_desc: 'Agendamento de reuniões para garantir a perfeita compreensão das necessidades. Acompanhamento dedicado.'
        },
        features: {
            click_title: 'AppClickandCollect  A solução universal de encomendas',
            click_lead: 'Simplifique as suas encomendas, aumente as suas vendas e ofereça uma experiência perfeita aos seus clientes.',
            click_desc: 'AppClickandCollect é uma aplicação simples e poderosa, desenhada para todos os tipos de negócios: restaurantes, padarias, pizzarias, floristas, e muito mais. Uma solução única para gerir encomendas, clientes e vendas numa interface intuitiva.',
            click_cta: 'Ver Preços e Detalhes',
            res_title: 'Reservas de mesa online',
            res_lead: 'Simplifique as suas reservas com a nossa solução inteligente online.',
            res_desc: 'Os seus clientes reservam 24/7 em poucos cliques enquanto gere facilmente as suas mesas, disponibilidade e fechos a partir da sua interface de administração intuitiva. Aumente a sua receita otimizando cada serviço.'
        },
        future: {
            title: 'Os nossos desenvolvimentos futuros',
            lead: 'Inovando para o seu sucesso.',
            pay_title: 'Pagamento integrado',
            pay_desc: 'Solução de pagamento segura diretamente na aplicação',
            ai_title: 'Encomendas telefónicas via IA',
            ai_desc: 'Inteligência artificial para gerir as suas encomendas telefónicas',
            track_title: 'Rastreamento de entregas em tempo real',
            track_desc: 'Siga as suas entregas ao vivo com localização GPS em tempo real',
            kiosk_title: 'Quiosque de pedidos para restaurante',
            kiosk_desc: 'Solução de pedidos self-service para otimizar o serviço interno'
        },
        clients: {
            title: 'Eles confiam em nós',
            lead: 'Descubra como as nossas soluções ajudaram os nossos clientes a transformar as suas operações diárias.',
            pizzaria_title: 'Restaurante Pizzaria',
            chal_title: 'O Desafio:',
            chal_desc: 'Gestão de encomendas ineficiente e presença online limitada',
            sol_title: 'A Nossa Solução:',
            sol_desc: 'Aplicação de encomendas online e gestão de redes sociais',
            res_title: 'Resultados:',
            ct_title: 'Pronto para se juntar a eles?',
            ct_btn: 'Contacte-nos'
        },
        contact: {
            title: 'Contactos',
            email: 'Email',
            phone: 'Telefone',
            address: 'Morada',
            follow: 'Siga-nos'
        },
        footer: {
            desc: 'Soluções digitais inovadoras para transformar o seu dia a dia profissional.',
            quick_links: 'Links Rápidos',
            legal: ' 2026 Digismart. Todos os direitos reservados.'
        },
        common: {
            contact_us: 'Contacte-nos'
        }
    },
    en: {
        nav: {
            home: 'Home',
            solutions: 'Solutions',
            contacts: 'Contacts'
        },
        hero: {
            title: 'Digital solutions to transform your professional life',
            desc: 'At Digismart.ai, we transform your daily challenges into opportunities through adapted and innovative solutions. From social media management to custom application development, each tool is designed to solve your specific problems and boost your productivity.',
            cta: 'Discover More'
        },
        offerings: {
            intro_title: 'Our solutions are...',
            custom_apps_title: 'Custom Applications',
            custom_apps_desc: 'Simplify your processes, reduce time waste and increase your sales with customized applications. Risk-free model: you only pay based on results achieved.',
            social_title: 'Social Media Management',
            social_desc: 'Attract and engage your customers with creative and strategic content. We handle everything from creation to publication to maximize your online impact.'
        },
        category: {
            title: 'Innovative solutions for every need',
            subtitle: 'Discover how our customized solutions can address your specific business challenges'
        },
        accordion: {
            time_title: 'Time-saving',
            time_desc: 'In a world where speed and efficiency are essential, our solutions help you optimize every minute of your day.',
            sales_title: 'Sales simplification',
            sales_desc: 'Boost your revenue with a smooth and effortless customer experience.',
            custom_title: 'Complete customization',
            custom_desc: 'Tailor-made solutions to reflect your company\'s values.',
            content_title: 'Digital content creation',
            content_desc: 'Showcase your business with a professional and engaging online presence.'
        },
        why: {
            title: 'Why choose Digismart.ai?',
            subtitle: 'Unique expertise for your success',
            card1_title: 'Dual Expertise',
            card1_desc: 'A winning combination of intelligent application and optimized social media strategy',
            card2_title: 'Financially accessible to all',
            card2_desc: 'No initial investment required. Your success is our priority',
            card3_title: 'Personalized Support',
            card3_desc: 'Appointment scheduling to ensure perfect understanding of needs, after email and phone exchange. Dedicated follow-up.'
        },
        features: {
            click_title: 'AppClickandCollect — The universal ordering solution',
            click_lead: 'Simplify your orders, boost your sales, and offer a seamless experience to your customers.',
            click_desc: 'AppClickandCollect is a simple and powerful application, designed for all types of businesses: restaurants, bakeries, pizzerias, florists, and much more. A single solution to manage your orders, customers and sales from one intuitive interface.',
            click_cta: 'View Pricing & Details',
            res_title: 'Online table reservations',
            res_lead: 'Simplify your reservations with our intelligent online solution.',
            res_desc: 'Your customers book 24/7 in just a few clicks while you easily manage your tables, availability and closures from your intuitive admin interface. Increase your revenue by optimizing every service.'
        },
        future: {
            title: 'Our future developments',
            lead: 'Innovating for your success.',
            pay_title: 'Integrated payment',
            pay_desc: 'Secure payment solution directly in the application',
            ai_title: 'Phone orders via AI',
            ai_desc: 'Artificial intelligence to handle your phone orders',
            track_title: 'Real-time delivery tracking',
            track_desc: 'Track your deliveries live with real-time GPS location',
            kiosk_title: 'Restaurant ordering kiosk',
            kiosk_desc: 'Self-service ordering solution to optimize in-house service'
        },
        clients: {
            title: 'They trust us',
            lead: 'Discover how our solutions have helped our clients transform their daily operations.',
            pizzaria_title: 'Pizzeria Restaurant',
            chal_title: 'The Challenge:',
            chal_desc: 'Inefficient order management and limited online presence',
            sol_title: 'Our Solution:',
            sol_desc: 'Online ordering application and social media management',
            res_title: 'Results:',
            ct_title: 'Ready to join them?',
            ct_btn: 'Contact Us'
        },
        contact: {
            title: 'Contact',
            email: 'Email',
            phone: 'Phone',
            address: 'Address',
            follow: 'Follow us'
        },
        footer: {
            desc: 'Innovative digital solutions to transform your professional daily life.',
            quick_links: 'Quick Links',
            legal: '© 2026 Digismart. All rights reserved.'
        },
        common: {
            contact_us: 'Contact us'
        }
    },
    fr: {
        nav: {
            home: 'Accueil',
            solutions: 'Solutions',
            contacts: 'Contacts'
        },
        hero: {
            title: 'Des solutions numériques pour transformer votre vie professionnelle',
            desc: 'Chez Digismart.ai, nous transformons vos défis quotidiens en opportunités grâce à des solutions adaptées et innovantes. De la gestion des réseaux sociaux au développement d\'applications sur mesure, chaque outil est conçu pour résoudre vos problèmes spécifiques et booster votre productivité.',
            cta: 'En savoir plus'
        },
        offerings: {
            intro_title: 'Nos solutions sont...',
            custom_apps_title: 'Applications sur mesure',
            custom_apps_desc: 'Simplifiez vos processus, réduisez les pertes de temps et augmentez vos ventes avec des applications personnalisées. Modèle sans risque : vous ne payez qu\'en fonction des résultats obtenus.',
            social_title: 'Gestion des réseaux sociaux',
            social_desc: 'Attirez et engagez vos clients avec un contenu créatif et stratégique. Nous gérons tout, de la création à la publication, pour maximiser votre impact en ligne.'
        },
        category: {
            title: 'Des solutions innovantes pour chaque besoin',
            subtitle: 'Découvrez comment nos solutions personnalisées peuvent répondre à vos défis commerciaux spécifiques'
        },
        accordion: {
            time_title: 'Gain de temps',
            time_desc: 'Dans un monde où la rapidité et l\'efficacité sont essentielles, nos solutions vous aident à optimiser chaque minute de votre journée.',
            sales_title: 'Simplification des ventes',
            sales_desc: 'Augmentez vos revenus avec une expérience client fluide et sans effort.',
            custom_title: 'Personnalisation complète',
            custom_desc: 'Des solutions sur mesure pour refléter les valeurs de votre entreprise.',
            content_title: 'Création de contenu digital',
            content_desc: 'Mettez en valeur votre entreprise avec une présence en ligne professionnelle et engageante.'
        },
        why: {
            title: 'Pourquoi choisir Digismart.ai ?',
            subtitle: 'Une expertise unique pour votre succès',
            card1_title: 'Double expertise',
            card1_desc: 'Une combinaison gagnante d\'application intelligente et de stratégie de réseaux sociaux optimisée',
            card2_title: 'Financièrement accessible à tous',
            card2_desc: 'Aucun investissement initial requis. Votre succès est notre priorité',
            card3_title: 'Accompagnement personnalisé',
            card3_desc: 'Prise de rendez-vous pour assurer une parfaite compréhension des besoins. Suivi dédié.'
        },
        features: {
            click_title: 'AppClickandCollect  La solution de commande universelle',
            click_lead: 'Simplifiez vos commandes, boostez vos ventes et offrez une expérience fluide à vos clients.',
            click_desc: 'AppClickandCollect est une application simple et puissante, conçue pour tous types de commerces : restaurants, boulangeries, pizzerias, fleuristes, et bien plus. Une solution unique pour gérer vos commandes, clients et ventes depuis une interface intuitive.',
            click_cta: 'Voir Prix et Détails',
            res_title: 'Réservation de table en ligne',
            res_lead: 'Simplifiez vos réservations avec notre solution intelligente en ligne.',
            res_desc: 'Vos clients réservent 24/7 en quelques clics pendant que vous gérez facilement vos tables, disponibilités et fermetures depuis votre interface d\'administration intuitive. Augmentez votre chiffre d\'affaires en optimisant chaque service.'
        },
        future: {
            title: 'Nos futurs développements',
            lead: 'Innover pour votre succès.',
            pay_title: 'Paiement intégré',
            pay_desc: 'Solution de paiement sécurisée directement dans l\'application',
            ai_title: 'Commandes téléphoniques via IA',
            ai_desc: 'Intelligence artificielle pour gérer vos commandes téléphoniques',
            track_title: 'Suivi de livraison en temps réel',
            track_desc: 'Suivez vos livraisons en direct avec localisation GPS en temps réel',
            kiosk_title: 'Borne de commande restaurant',
            kiosk_desc: 'Solution de commande en libre-service pour optimiser le service en salle'
        },
        clients: {
            title: 'Ils nous font confiance',
            lead: 'Découvrez comment nos solutions ont aidé nos clients à transformer leurs opérations quotidiennes.',
            pizzaria_title: 'Restaurant Pizzeria',
            chal_title: 'Le Défi :',
            chal_desc: 'Gestion des commandes inefficace et présence en ligne limitée',
            sol_title: 'Notre Solution :',
            sol_desc: 'Application de commande en ligne et gestion des réseaux sociaux',
            res_title: 'Résultats :',
            ct_title: 'Prêt à les rejoindre ?',
            ct_btn: 'Contactez-nous'
        },
        contact: {
            title: 'Contacts',
            email: 'Email',
            phone: 'Téléphone',
            address: 'Adresse',
            follow: 'Suivez-nous'
        },
        footer: {
            desc: 'Des solutions numériques innovantes pour transformer votre quotidien professionnel.',
            quick_links: 'Liens Rapides',
            legal: '© 2026 Digismart. Tous droits réservés.'
        },
        common: {
            contact_us: 'Contactez-nous'
        }
    }
};

/* EXTENDED TRANSLATIONS FOR LISTS */
translations.pt.accordion.list_time = [
    "Automatização de encomendas e pagamentos",
    "Rastreamento em tempo real",
    "Planeamento simplificado",
    "Eliminação de erros humanos",
    "Gestão de operações simplificada"
];
translations.fr.accordion.list_time = [
    "Automatisation des commandes et des paiements",
    "Suivi en temps réel",
    "Planification simplifiée",
    "Élimination des erreurs humaines",
    "Gestion simplifiée des opérations"
];

translations.pt.accordion.list_sales = [
    "Sistema de encomendas online acessível",
    "Comunicação automatizada com o cliente",
    "Melhoria da experiência do utilizador",
    "Poupança de tempo do staff para outras tarefas"
];
translations.fr.accordion.list_sales = [
    "Système de commande en ligne accessible",
    "Communication client automatisée",
    "Amélioration de l'expérience utilisateur",
    "Gain de temps du personnel pour d'autres tâches"
];

translations.pt.accordion.list_custom = [
    "Interface personalizada",
    "Funcionalidades modulares",
    "Escalabilidade garantida",
    "Identidade visual personalizada",
    "Adaptabilidade aos processos internos",
    "Personalização de níveis de acesso"
];
translations.fr.accordion.list_custom = [
    "Interface personnalisée",
    "Fonctionnalités modulaires",
    "Évolutivité garantie",
    "Identité visuelle personnalisée",
    "Adaptabilité aux processus internes",
    "Personnalisation des niveaux d'accès"
];

translations.pt.accordion.list_content = [
    "Publicações impactantes nas redes sociais",
    "Estratégia de conteúdos adaptada",
    "Ferramentas de análise",
    "Conteúdo otimizado para SEO",
    "Formatos variados e inovadores",
    "Personalização do público-alvo",
    "Calendário editorial personalizado"
];
translations.fr.accordion.list_content = [
    "Publications impactantes sur les réseaux sociaux",
    "Stratégie de contenu adaptée",
    "Outils d'analyse",
    "Contenu optimisé pour le SEO",
    "Formats variés et innovants",
    "Personnalisation pour le public cible",
    "Calendrier éditorial personnalisé"
];

translations.pt.clients.result_list = [
    "Aumento de pedidos",
    "Presença social otimizada",
    "Poupança de tempo significativa"
];
translations.fr.clients.result_list = [
    "Augmentation des commandes",
    "Présence sociale optimisée",
    "Gain de temps significatif"
];

translations.en.accordion.list_time = [
    "Order and payment automation",
    "Real-time tracking",
    "Simplified planning",
    "Human error elimination",
    "Simplified operations management"
];
translations.en.accordion.list_sales = [
    "Accessible online ordering system",
    "Automated customer communication",
    "Improved user experience",
    "Staff time savings for other tasks"
];
translations.en.accordion.list_custom = [
    "Customized interface",
    "Modular features",
    "Guaranteed scalability",
    "Custom visual identity",
    "Adaptability to internal processes",
    "Access level customization"
];
translations.en.accordion.list_content = [
    "Impactful social media posts",
    "Adapted content strategy",
    "Analytics tools",
    "SEO-optimized content",
    "Various and innovative formats",
    "Target audience customization",
    "Custom editorial calendar"
];
translations.en.clients.result_list = [
    "Increased orders",
    "Optimized social presence",
    "Significant time savings"
];

/* PRICING MODAL TRANSLATIONS */
translations.pt.pricing = {
    title: 'Preços AppClickandCollect',
    commission: 'comissão por venda',
    features: {
        access: '<strong>Acesso Total:</strong> 1 mês grátis',
        products: '<strong>Produtos:</strong> Ilimitados',
        setup: '<strong>Configuração:</strong> Personalização completa pela Digismart.ai'
    },
    services_title: 'Serviços Adicionais',
    service1_title: 'Criação de menu inicial',
    service1_desc: 'Criação completa do menu com até 20 produtos',
    service2_title: 'Modificação pontual de produtos',
    service2_desc: 'Adicionar ou modificar um produto (mínimo 10 ações)',
    service3_title: 'Opção de entrega',
    service3_desc: 'Para gerir entregas'
};

translations.fr.pricing = {
    title: 'Tarifs AppClickandCollect',
    commission: 'commission par vente',
    features: {
        access: '<strong>Accès complet :</strong> 1 mois gratuit',
        products: '<strong>Produits :</strong> Illimités',
        setup: '<strong>Configuration :</strong> Personnalisation complète par Digismart.ai'
    },
    services_title: 'Services Supplémentaires',
    service1_title: 'Création de menu initial',
    service1_desc: 'Création complète du menu avec jusqu\'à 20 produits',
    service2_title: 'Modification ponctuelle de produits',
    service2_desc: 'Ajouter ou modifier un produit (minimum 10 actions)',
    service3_title: 'Option de livraison',
    service3_desc: 'Pour gérer les livraisons'
};

translations.en.pricing = {
    title: 'AppClickandCollect Pricing',
    commission: 'commission per sale',
    features: {
        access: '<strong>Full Access:</strong> 1 full free month',
        products: '<strong>Products:</strong> Unlimited products',
        setup: '<strong>Setup:</strong> Complete customization by Digismart.ai'
    },
    services_title: 'Additional Services',
    service1_title: 'Initial menu creation',
    service1_desc: 'Complete menu creation with up to 20 products',
    service2_title: 'One-time product modification',
    service2_desc: 'Add or modify a product (minimum 10 actions)',
    service3_title: 'Delivery option',
    service3_desc: 'To manage deliveries'
};

// Language State
let currentLanguage = localStorage.getItem('digismart_lang') || 'pt';

// Init Function
function initLanguage() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangDisplay = document.getElementById('currentLang');

    // Toggle Dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
        langBtn.classList.toggle('active');
    });

    // Close Dropdown on Click Outside
    document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
        langBtn.classList.remove('active');
    });

    // Option Click
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Initial Set
    setLanguage(currentLanguage);
}

// Set Language Function
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('digismart_lang', lang);

    // Update UI Content
    updateContent();

    // Update Selector UI
    document.getElementById('currentLang').textContent = lang.toUpperCase();

    // Update Active Option
    document.querySelectorAll('.lang-option').forEach(opt => {
        if (opt.getAttribute('data-lang') === lang) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });

    // Force HTML Lang Attribute
    document.documentElement.lang = lang;
}

// Update Content Function
function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');

        let value = translations[currentLanguage];
        keys.forEach(k => {
            if (value) value = value[k];
        });

        if (value) {
            // Check if it's an array for lists
            if (Array.isArray(value)) {
                element.innerHTML = value.map(item => `<li>${item}</li>`).join('');
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.innerHTML = value; // Use innerHTML to allow tags if needed
            }
        }
    });
}

// Call Init
initLanguage();

