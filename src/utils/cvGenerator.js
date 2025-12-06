import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import i18n from "../i18n";

import { expCards, educationCards, certifications, projects, skillsProgress } from "../constants";

pdfMake.vfs = pdfFonts.vfs;

const CONTACT_INFO = {
    name: "Francesco Saverio Conforti",
    email: "fsaverio9050@gmail.com",
    phone: "+39 3667485007",
    location: "VIA MAGLIANO 65, 00060 FORMELLO ROMA",
    dateOfBirth: "16/12/2000",
    linkedin: "linkedin.com/in/francesco-conforti",
    github: "github.com/francesco-conforti",
};

export const generateCV = async () => {
    const t = i18n.t;
    const translate = (key) => {
        try {
            const v = t(key, { returnObjects: true });
            return v !== key ? v : key;
        } catch {
            return key;
        }
    };

    // ============================
    // EUROPASS CONSTANTS
    // ============================
    const PAGE_MARGINS = [60, 70, 56, 56];
    const LABEL_WIDTH = 185; // Increased to accommodate Spanish labels
    const VALUE_WIDTH = "*";
    const TITLE_FONT = 14;
    const BODY_FONT = 10;
    const SECTION_FONT = 11;
    const EU_BLUE = "#003399";
    const GOLD = "#FFCC00";
    const VERTICAL_LINE_X = 250; // Shifted right (was 220)
    const VALUE_MARGIN_LEFT = 10;

    // ============================
    // EU FLAG con SVG
    // ============================
    const createEUFlag = () => {
        const stars = [];
        const centerX = 30;
        const centerY = 20;
        const radius = 11;

        for (let i = 0; i < 12; i++) {
            const angle = (i * 30 - 90) * Math.PI / 180;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            const points = [];
            for (let j = 0; j < 10; j++) {
                const r = j % 2 === 0 ? 2.5 : 1;
                const a = (j * 36 - 90) * Math.PI / 180;
                points.push({ x: x + r * Math.cos(a), y: y + r * Math.sin(a) });
            }

            stars.push({
                type: 'polyline',
                lineWidth: 0,
                closePath: true,
                points: points,
                color: GOLD
            });
        }

        return {
            canvas: [
                {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 60,
                    h: 40,
                    color: EU_BLUE
                },
                ...stars
            ],
            width: 60,
            margin: [0, 0, 0, 0]
        };
    };

    // ============================
    // FOOTER con info e pagina
    // ============================
    const footer = (currentPage, pageCount) => {
        return {
            margin: [60, 0, 56, 30],
            stack: [
                {
                    text: `${translate("cv.page")} ${currentPage} - ${translate("cv.cv_of")}`,
                    fontSize: 9,
                    margin: [0, 0, 0, 1]
                },
                {
                    text: `[ Conforti, Francesco Saverio ]`,
                    fontSize: 9
                }
            ]
        };
    };

    // ============================
    // TITLE BLOCK - A SINISTRA DELLA LINEA
    // ============================
    const titleLines = translate("cv.title").split("\n");
    const titleBlock = {
        margin: [0, 0, 0, 30],
        columns: [
            {
                width: LABEL_WIDTH - 5,
                stack: [
                    ...titleLines.map((line, index) => ({
                        text: line,
                        fontSize: TITLE_FONT,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 0, 0, 0]
                    })),
                    {
                        alignment: 'right',
                        margin: [0, 20, 0, 0],
                        ...createEUFlag()
                    }
                ]
            },
            {
                width: '*',
                text: ''
            }
        ]
    };

    // ============================
    // VERTICAL LINE (background per tutte le pagine)
    // ============================
    const background = (currentPage, pageSize) => {
        const startY = 70;
        return {
            canvas: [{
                type: 'line',
                x1: VERTICAL_LINE_X,
                y1: startY,
                x2: VERTICAL_LINE_X,
                y2: pageSize.height - 56,
                lineWidth: 0.5,
                lineColor: '#000000'
            }]
        };
    };

    // ============================
    // TABLE ROW BUILDER
    // ============================
    const row = (label, value, labelBold = false) => {
        const isBullet = label.startsWith('•');
        return {
            columns: [
                {
                    width: LABEL_WIDTH,
                    text: label,
                    fontSize: BODY_FONT,
                    bold: labelBold || (isBullet && !label.includes('\n')),
                    margin: [0, 0, 5, 0],
                    alignment: 'left'
                },
                {
                    width: '*',
                    text: value || '',
                    fontSize: BODY_FONT,
                    alignment: 'left',
                    margin: [VALUE_MARGIN_LEFT, 0, 0, 0]
                }
            ],
            margin: [0, 1.5, 0, 1.5]
        };
    };

    // ============================
    // SECTION HEADER
    // ============================
    const sectionHeader = (title) => {
        return [
            {
                text: title,
                fontSize: SECTION_FONT,
                bold: true,
                margin: [0, 12, 0, 8]
            }
        ];
    };

    // ============================
    // PERSONAL INFO SECTION
    // ============================
    const personalInfo = [
        ...sectionHeader(translate("cv.sections.personal_info")),
        row(translate("cv.labels.name"), CONTACT_INFO.name),
        row(translate("cv.labels.address"), CONTACT_INFO.location),
        row(translate("cv.labels.phone"), CONTACT_INFO.phone),
        row(translate("cv.labels.email"), CONTACT_INFO.email),
        row(translate("cv.labels.nationality"), translate("cv.values.nationality")),
        row(translate("cv.labels.gender"), translate("cv.values.gender")),
        row(translate("cv.labels.date_of_birth"), CONTACT_INFO.dateOfBirth)
    ];

    // ============================
    // EXPERIENCE SECTION
    // ============================
    const experience = [
        ...sectionHeader(translate("cv.sections.experience")),
        ...expCards.map(exp => ({
            stack: [
                row(translate("cv.labels.date_from_to"), translate(exp.date)),
                row(translate("cv.labels.employer_name"), exp.company),
                row(translate("cv.labels.company_sector"), translate(exp.company_sector) || ""),
                row(translate("cv.labels.job_type"), translate(exp.title)),
                row(
                    translate("cv.labels.main_duties"),
                    (Array.isArray(translate(exp.responsibilities)) ?
                        translate(exp.responsibilities) : [])
                        .map(r => r)
                        .join("\n")
                ),
                { text: "", margin: [0, 5, 0, 0] }
            ],
            unbreakable: true
        }))
    ];

    // ============================
    // EDUCATION SECTION
    // ============================
    const education = [
        ...sectionHeader(translate("cv.sections.education")),
        ...educationCards.map(edu => ({
            stack: [
                row(translate("cv.labels.education_dates"), translate(edu.date)),
                row(translate("cv.labels.institution_name"), translate(edu.university)),
                row(
                    translate("cv.labels.key_subjects"),
                    (Array.isArray(translate(edu.keyAreas)) ?
                        translate(edu.keyAreas) : [])
                        .map(r => r)
                        .join("\n")
                ),
                row(translate("cv.labels.qualification"), translate(edu.degree)),
                row(translate("cv.labels.national_level"), ""),
                { text: "", margin: [0, 5, 0, 0] }
            ],
            unbreakable: true
        }))
    ];

    // ============================
    // PERSONAL SKILLS
    // ============================
    const personalSkills = [
        ...sectionHeader(translate("cv.sections.personal_skills")),
        row(translate("cv.labels.mother_tongue"), translate("cv.values.italian"), true),
        { text: "", margin: [0, 4, 0, 0] },
        row(translate("cv.labels.other_languages"), "", true),
        { text: "", margin: [0, 2, 0, 0] },
        row(translate("cv.values.english"), ""),
        row(translate("cv.labels.reading_skills"), translate("cv.values.skill_level_good")),
        row(translate("cv.labels.writing_skills"), translate("cv.values.skill_level_good")),
        row(translate("cv.labels.speaking_skills"), translate("cv.values.skill_level_good")),
        { text: "", margin: [0, 4, 0, 0] },
        row(translate("cv.values.spanish"), ""),
        row(translate("cv.labels.reading_skills"), translate("cv.values.skill_level_good")),
        row(translate("cv.labels.writing_skills"), translate("cv.values.skill_level_good")),
        row(translate("cv.labels.speaking_skills"), translate("cv.values.skill_level_good"))
    ];

    // ============================
    // TECHNICAL SKILLS
    // ============================
    const technicalSkills = [
        ...sectionHeader(translate("cv.sections.technical_skills")),
        {
            ...row("", [
                "Python, C, C++, Java, JavaScript",
                "PyTorch, TensorFlow, Scikit-learn, OpenCV",
                "ROS/ROS2, Gazebo",
                "PLC Siemens & Beckhoff",
                "Modbus, OPC UA, MQTT, KNX, BACnet"
            ].join("\n")),
            margin: [0, -37, 0, 1.5]
        }
    ];

    // ============================
    // CERTIFICATIONS
    // ============================
    const certSection = [
        ...sectionHeader(translate("cv.sections.certifications")),
        {
            ...row("", certifications.map(cert => `${cert.name} – ${cert.issuer}`).join("\n")),
            margin: [0, -22, 0, 1.5]
        }
    ];

    // ============================
    // ADDITIONAL SECTIONS
    // ============================
    const additionalSections = [
        ...sectionHeader(translate("cv.sections.driving_license")),
        {
            ...row("", translate("cv.values.driving_license_b")),
            margin: [0, -22, 0, 1.5]
        },
        /*    { text: "", margin: [0, 4, 0, 0] },
            ...sectionHeader(translate("cv.sections.additional_info")),
            {
                ...row("", translate("cv.values.additional_info_placeholder")),
                margin: [0, -6, 0, 1.5]
            },
            { text: "", margin: [0, 4, 0, 0] },
            ...sectionHeader(translate("cv.sections.attachments")),
            {
                ...row("", translate("cv.values.attachments_placeholder")),
                margin: [0, -6, 0, 1.5]
            }*/
    ];

    // ============================
    // FINAL DOCUMENT
    // ============================
    const docDefinition = {
        pageSize: "A4",
        pageMargins: PAGE_MARGINS,
        footer,
        background,

        content: [
            titleBlock,
            ...personalInfo,
            ...experience,
            ...education,
            ...personalSkills,
            ...technicalSkills,
            ...certSection,
            ...additionalSections
        ],

        defaultStyle: {
            font: 'Roboto',
            fontSize: BODY_FONT,
            lineHeight: 1.15
        }
    };

    pdfMake.createPdf(docDefinition).download("CV_Francesco_Conforti.pdf");
};
export const generateSkillsCard = async () => {
    const t = i18n.t;
    const translate = (key) => {
        try {
            const v = t(key, { returnObjects: true });
            return v !== key ? v : key;
        } catch {
            return key;
        }
    };

    // ============================
    // REFINED COLOR PALETTE
    // ============================
    const COLORS = {
        primary: '#1a2332',      // Deep navy
        secondary: '#2563eb',    // Vibrant blue
        accent: '#ef4444',       // Clean red
        lightBg: '#f8fafc',      // Very light gray
        cardBg: '#ffffff',       // Pure white
        border: '#e2e8f0',       // Soft border
        textPrimary: '#1e293b',  // Dark slate
        textSecondary: '#64748b', // Muted slate
        highlight: '#dbeafe'     // Light blue highlight
    };

    const PAGE_MARGINS = [40, 55, 40, 55];

    // ============================
    // HELPER FUNCTIONS
    // ============================
    const formatProjectDesc = (proj) => {
        // Try to get dossier description first
        const dossierKey = proj.dossier_desc;
        const dossierText = dossierKey ? translate(dossierKey) : null;

        // If dossier text exists and is translated (not returning key), use it
        if (dossierText && dossierText !== dossierKey) {
            return { desc: dossierText, tech: (proj.tech || []).join(", ") };
        }

        // Fallback to existing result (bullet points)
        const results = translate(proj.result);
        let desc = "";
        if (Array.isArray(results)) {
            desc = results.join(". ") + ".";
        } else {
            desc = results;
        }
        const tech = (proj.tech || []).join(", ");
        return { desc, tech };
    };

    // ============================
    // ENHANCED HEADER WITH SUBTITLE
    // ============================
    const header = {
        stack: [
            {
                columns: [
                    {
                        stack: [
                            {
                                text: translate('hero.cta_skills_dossier'),
                                fontSize: 32,
                                bold: true,
                                color: COLORS.primary,
                                margin: [0, 0, 0, 3],
                                characterSpacing: -0.5
                            },
                            {
                                text: 'Francesco Saverio Conforti',
                                fontSize: 18,
                                color: COLORS.secondary,
                                margin: [0, 0, 0, 4]
                            },
                            {
                                text: translate('hero.portfolio_subtitle'),
                                fontSize: 9,
                                color: COLORS.textSecondary,
                                margin: [0, 0, 0, 0]
                            }
                        ],
                        width: '*'
                    },
                    {
                        image: 'logo',
                        width: 75,
                        alignment: 'right',
                        margin: [0, 0, 0, 0]
                    }
                ],
                margin: [0, 0, 0, 18]
            },
            {
                canvas: [{
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 515,
                    h: 3,
                    r: 1.5,
                    color: COLORS.secondary
                }]
            }
        ],
        margin: [0, 0, 0, 35]
    };

    // ============================
    // DYNAMIC SKILLS SECTION (3 columns per row)
    // ============================
    const skillCategoriesMap = [
        { key: 'programming', title: 'skills.categories.programming' },
        { key: 'it', title: 'skills.categories.it' },
        { key: 'data', title: 'skills.categories.data' },
        { key: 'soft', title: 'skills.categories.soft' },
        { key: 'languages', title: 'skills.categories.languages' }
    ];

    const COLUMNS_PER_ROW = 3;

    // Helper map to translate skill names to keys
    const skillNameMap = {
        "C": "skills.categories.names.c",
        "C#": "skills.categories.names.c_sharp",
        "C++": "skills.categories.names.cpp",
        "Python": "skills.categories.names.python",
        "Java": "skills.categories.names.java",
        "Javascript": "skills.categories.names.javascript",
        "AI & Machine Learning": "skills.categories.names.ai_ml",
        "Wireless & IoT": "skills.categories.names.wireless_iot",
        "Software Development": "skills.categories.names.software_dev",
        "HTML & CSS": "skills.categories.names.html_css",
        "Documentation": "skills.categories.names.documentation",
        "Mathematics": "skills.categories.names.mathematics",
        "Statistics": "skills.categories.names.statistics",
        "Benchmarking": "skills.categories.names.benchmarking",
        "Teamwork": "skills.categories.names.teamwork",
        "Problem Solving": "skills.categories.names.problem_solving",
        "Planning": "skills.categories.names.planning",
        "Reporting": "skills.categories.names.reporting",
        "Italiano": "skills.categories.names.italian",
        "Spagnolo": "skills.categories.names.spanish",
        "Inglese": "skills.categories.names.english"
    };

    const createSkillCell = (cat) => ({
        stack: [
            {
                text: translate(cat.title),
                bold: true,
                fontSize: 11,
                color: COLORS.primary,
                margin: [0, 0, 0, 8]
            },
            {
                canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 0,
                    x2: 60,
                    y2: 0,
                    lineWidth: 3,
                    lineColor: COLORS.secondary
                }]
            },
            {
                text: (skillsProgress[cat.key] || [])
                    .map(s => {
                        const trKey = skillNameMap[s.name];
                        const translatedName = trKey ? translate(trKey) : s.name;
                        return `• ${translatedName}`;
                    })
                    .join('\n'),
                fontSize: 9.5,
                margin: [0, 12, 0, 0],
                lineHeight: 1.5,
                color: COLORS.textSecondary
            }
        ],
        border: [true, true, true, true],
        borderColor: [COLORS.border, COLORS.border, COLORS.border, COLORS.border],
        fillColor: COLORS.lightBg,
        margin: [6, 8, 6, 8]
    });

    // Split categories into rows of 3
    const skillRows = [];
    for (let i = 0; i < skillCategoriesMap.length; i += COLUMNS_PER_ROW) {
        skillRows.push(skillCategoriesMap.slice(i, i + COLUMNS_PER_ROW));
    }

    // Create tables for each row
    const skillTables = skillRows.map(row => ({
        table: {
            widths: Array(row.length).fill('*'),
            body: [row.map(cat => createSkillCell(cat))]
        },
        layout: {
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            hLineColor: () => COLORS.border,
            vLineColor: () => COLORS.border,
            paddingLeft: () => 12,
            paddingRight: () => 12,
            paddingTop: () => 12,
            paddingBottom: () => 12
        },
        margin: [0, 0, 0, 0]
    }));

    const skillsSection = {
        stack: [
            {
                text: translate('skills.title') || 'Competenze',
                fontSize: 20,
                bold: true,
                color: COLORS.primary,
                margin: [0, 0, 0, 20]
            },
            ...skillTables
        ],
        margin: [0, 0, 0, 40]
    };

    // ============================
    // ENHANCED PROJECT CARDS
    // ============================
    const projectSection = [
        {
            stack: [
                {
                    text: translate("nav.work") || "Progetti",
                    fontSize: 20,
                    bold: true,
                    color: COLORS.primary,
                    margin: [0, 0, 0, 8]
                },
                {
                    canvas: [{
                        type: 'line',
                        x1: 0,
                        y1: 0,
                        x2: 100,
                        y2: 0,
                        lineWidth: 3,
                        lineColor: COLORS.accent
                    }]
                }
            ],
            margin: [0, 0, 0, 25]
        },
        ...projects.map((proj, idx) => {
            const { desc, tech } = formatProjectDesc(proj);
            return {
                table: {
                    widths: [8, '*'],
                    body: [
                        [
                            {
                                canvas: [{
                                    type: 'rect',
                                    x: 0,
                                    y: 0,
                                    w: 5,
                                    h: 100,
                                    r: 2.5,
                                    color: idx % 2 === 0 ? COLORS.secondary : COLORS.accent
                                }],
                                border: [false, false, false, false],
                                fillColor: COLORS.cardBg,
                                margin: [0, 0, 0, 0]
                            },
                            {
                                stack: [
                                    {
                                        text: translate(proj.title),
                                        bold: true,
                                        fontSize: 12,
                                        color: COLORS.primary,
                                        margin: [0, 0, 0, 8],
                                        lineHeight: 1.3
                                    },
                                    {
                                        text: desc,
                                        fontSize: 10,
                                        alignment: 'justify',
                                        lineHeight: 1.5,
                                        color: COLORS.textSecondary,
                                        margin: [0, 0, 0, 10]
                                    },
                                    {
                                        columns: [
                                            {
                                                width: 'auto',
                                                text: translate('cv.labels.technologies') || 'Technologies',
                                                bold: true,
                                                fontSize: 9,
                                                color: COLORS.secondary,
                                                margin: [0, 0, 8, 0]
                                            },
                                            {
                                                width: '*',
                                                text: tech,
                                                fontSize: 9,
                                                color: COLORS.textSecondary,
                                                italics: true
                                            }
                                        ]
                                    }
                                ],
                                border: [false, false, false, false],
                                fillColor: COLORS.cardBg,
                                margin: [8, 0, 0, 0]
                            }
                        ]
                    ]
                },
                layout: {
                    hLineWidth: () => 1,
                    vLineWidth: () => 1,
                    hLineColor: () => COLORS.border,
                    vLineColor: () => COLORS.border,
                    paddingLeft: () => 12,
                    paddingRight: () => 12,
                    paddingTop: () => 12,
                    paddingBottom: () => 12
                },
                margin: [0, 0, 0, 16],
                unbreakable: true
            };
        })
    ];

    // ============================
    // LOGO LOADING
    // ============================
    const getBase64ImageFromURL = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.setAttribute("crossOrigin", "anonymous");
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL("image/png");
                resolve(dataURL);
            };
            img.onerror = error => reject(error);
            img.src = url;
        });
    };

    let logoData = null;
    try {
        logoData = await getBase64ImageFromURL("/images/logos/personal-logo.png");
    } catch (e) {
        console.error("Failed to load logo", e);
    }

    // ============================
    // DOCUMENT DEFINITION
    // ============================
    const docDefinition = {
        pageSize: "A4",
        pageMargins: PAGE_MARGINS,
        content: [
            header,
            skillsSection,
            ...projectSection
        ],
        images: {
            logo: logoData || ""
        },
        defaultStyle: {
            font: 'Roboto',
            fontSize: 10,
            color: COLORS.textPrimary
        },
        background: function (currentPage, pageSize) {
            return [
                // Subtle page shadow
                {
                    canvas: [{
                        type: 'rect',
                        x: 18,
                        y: 18,
                        w: pageSize.width - 36,
                        h: pageSize.height - 36,
                        r: 0,
                        color: '#e2e8f0'
                    }]
                },
                // Main page border
                {
                    canvas: [{
                        type: 'rect',
                        x: 15,
                        y: 15,
                        w: pageSize.width - 30,
                        h: pageSize.height - 30,
                        r: 0,
                        lineWidth: 1.5,
                        lineColor: COLORS.border,
                        color: COLORS.cardBg
                    }]
                },
                // Top accent strip
                {
                    canvas: [{
                        type: 'rect',
                        x: 15,
                        y: 15,
                        w: pageSize.width - 30,
                        h: 8,
                        r: 0,
                        color: COLORS.secondary
                    }]
                }
            ];
        },
        footer: function (currentPage, pageCount) {
            return {
                columns: [
                    {
                        text: 'Francesco Saverio Conforti',
                        fontSize: 8,
                        color: COLORS.textSecondary,
                        alignment: 'left',
                        margin: [40, 0, 0, 0]
                    },
                    {
                        text: `${translate('pdf.page')} ${currentPage} ${translate('pdf.of')} ${pageCount}`,
                        alignment: 'right',
                        fontSize: 8,
                        color: COLORS.textSecondary,
                        margin: [0, 0, 40, 0]
                    }
                ],
                margin: [0, 0, 0, 25]
            };
        }
    };

    pdfMake.createPdf(docDefinition).download("Skills_Dossier_Francesco_Conforti.pdf");
};