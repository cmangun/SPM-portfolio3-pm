// Define menu data
interface MenuItem {
    title: string;
    href: string;
    subItems?: MenuItem[];
    static?: boolean;
};

const menuItemsTwo: MenuItem[] = [
    {
        title: "Home",
        href: "/",
        static: false,
    },
    {
        title: "Services",
        href: "/services",
        static: false,
    },
    {
        title: "Advisory",
        href: "/advisory",
        static: false,
    },
    {
        title: "Industries",
        href: "/industries",
        static: false,
    },
    {
        title: "Case Studies",
        href: "/case-studies",
        static: false,
        subItems: [
            { title: "Pfizer CoCo AI", href: "/fde-case-study-01" },
            { title: "Enterprise AI Playbook", href: "/fde-case-study-02" },
            { title: "Abbott Alinity", href: "/fde-case-study-03" },
            { title: "Pfizer Content Automation", href: "/fde-case-study-04" },
            { title: "Abbott Libre CGM", href: "/fde-case-study-05" },
            { title: "Medtronic GI Genius", href: "/fde-case-study-06" },
        ]
    },
    {
        title: "AI/ML Playbook",
        href: "/ai-ml-playbook",
        static: false,
    },
    {
        title: "Certifications",
        href: "/certifications",
        static: false,
    },
    {
        title: "About",
        href: "/about",
        static: false,
    },
    {
        title: "Contact",
        href: "/contact",
        static: false,
    },
];

export default menuItemsTwo;
