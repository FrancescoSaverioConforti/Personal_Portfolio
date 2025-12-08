const base = import.meta.env.BASE_URL;
const navLinks = [
  {
    name: "nav.about",
    link: "#about",
  },
  {
    name: "nav.skills",
    link: "#skills",
  },
  {
    name: "nav.tech_stack",
    link: "#tech-stack",
  },
  {
    name: "nav.work",
    link: "#work",
  },
  {
    name: "nav.caseStudies",
    link: "#case-studies",
  },
  {
    name: "nav.experience",
    link: "#experience",
  },
  {
    name: "nav.education",
    link: "#education",
  },
];

const words = [
  { text: "words.ai_models", imgPath: `${base}images/ai.svg` },
  { text: "words.autonomous_robots", imgPath: `${base}images/robot.svg` },
  { text: "words.smart_automation", imgPath: `${base}images/automation.svg` },
  { text: "words.iot_systems", imgPath: `${base}images/iot.svg` },
  { text: "words.machine_learning", imgPath: `${base}images/ml.svg` },
  { text: "words.neural_networks", imgPath: `${base}images/neural.svg` },
  { text: "words.control_systems", imgPath: `${base}images/control.svg` },
  { text: "words.robotic_vision", imgPath: `${base}images/vision.svg` },
];



const logoIconsList = [
  {
    imgPath: `${base}images/logos/siemens.png`,
  },
  {
    imgPath: `${base}images/logos/beckoff.png`,
  },
  {
    imgPath: `${base}images/logos/loytec.png`,
  },
  {
    imgPath: `${base}images/logos/bacnet.png`,
  },
  {
    imgPath: `${base}images/logos/dali.png`,
  },
  {
    imgPath: `${base}images/logos/knx.png`,
  },
  {
    imgPath: `${base}images/logos/lora.png`,
  },
  {
    imgPath: `${base}images/logos/modbus.png`,
  },
  {
    imgPath: `${base}images/logos/mqtt.png`,
  },
  {
    imgPath: `${base}images/logos/bluetooth.png`,
  },
  {
    imgPath: `${base}images/logos/zigbee.png`,
  },
  {
    imgPath: `${base}images/logos/Wi-Fi.png`,
  },
  {
    imgPath: `${base}images/logos/Ros.png`,
  },
  {
    imgPath: `${base}images/logos/pytorch.png`,
  },
  {
    imgPath: `${base}images/logos/pandas.png`,
  },
  {
    imgPath: `${base}images/logos/opencv.png`,
  },
  {
    imgPath: `${base}images/logos/IEC-61131-3.png`,
  },
];

const skillsProgress = {
  programming: [
    { id: 101, name: "C", percentage: 90 },
    { id: 102, name: "C#", percentage: 90 },
    { id: 103, name: "C++", percentage: 85 },
    { id: 104, name: "Python", percentage: 95 },
    { id: 105, name: "Java", percentage: 80 },
    { id: 106, name: "Javascript", percentage: 85 },
  ],
  it: [
    { id: 201, name: "AI & Machine Learning", percentage: 90 },
    { id: 202, name: "Wireless & IoT", percentage: 85 },
    { id: 203, name: "Software Development", percentage: 90 },
    { id: 204, name: "HTML & CSS", percentage: 80 },
  ],
  data: [
    { id: 301, name: "Documentation", percentage: 85 },
    { id: 302, name: "Mathematics", percentage: 90 },
    { id: 303, name: "Statistics", percentage: 85 },
    { id: 304, name: "Benchmarking", percentage: 80 },
  ],
  soft: [
    { id: 401, name: "Teamwork", percentage: 95 },
    { id: 402, name: "Problem Solving", percentage: 95 },
    { id: 403, name: "Planning", percentage: 90 },
    { id: 404, name: "Reporting", percentage: 85 },
  ],
  languages: [
    { id: 501, name: "Italiano", percentage: 100 },
    { id: 502, name: "Spagnolo", percentage: 80 },
    { id: 503, name: "Inglese", percentage: 90 },
  ],
};

const abilities = [
  {
    imgPath: `${base}images/seo.png`,
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: `${base}images/chat.png`,
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: `${base}images/time.png`,
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: `${base}images/logos/react.png`,
  },
  {
    name: "Python Developer",
    imgPath: `${base}images/logos/python.svg`,
  },
  {
    name: "Backend Developer",
    imgPath: `${base}images/logos/node.png`,
  },
  {
    name: "Interactive Developer",
    imgPath: `${base}images/logos/three.png`,
  },
  {
    name: "Project Manager",
    imgPath: `${base}images/logos/git.svg`,
  },
];

const techStackIcons = [
  {
    name: "C developer",
    modelPath: `${base}models/C.glb`,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: `${base}models/python-transformed.glb`,
    scale: 0.8,
    rotation: [0, 0, 0],
    desc: "Deep Learning · CNN · RNN · RL · GPU training & model deployment"
  },
  {
    name: "Java Developer",
    modelPath: `${base}models/Java.glb`,
    scale: 0.8,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: `${base}models/three.js-transformed.glb`,
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "ROS & ROS2 Developer",
    modelPath: `${base}models/ROS.glb`,
    scale: 0.22,
    rotation: [0, -Math.PI / 2, 0],
  },
];

const expCards = [
  {
    id: 1,
    title: "experience.maticmind_zenita.title",
    company: "Maticmind S.p.A",
    date: "experience.maticmind_zenita.date",
    company_sector: "experience.maticmind_zenita.company_sector",
    review: "experience.maticmind_zenita.review",
    responsibilities: "experience.maticmind_zenita.responsibilities",
    logoPath: `${base}images/maticmind-zenita.png`,
    logoFallback: "Maticmind Zenita"
  },
  {
    id: 2,
    title: "experience.maticmind_internship.title",
    company: "Maticmind S.p.A",
    date: "experience.maticmind_internship.date",
    company_sector: "experience.maticmind_internship.company_sector",
    review: "experience.maticmind_internship.review",
    responsibilities: "experience.maticmind_internship.responsibilities",
    logoPath: `${base}images/maticmind.png`,
    logoFallback: "Maticmind"
  },
];

const educationCards = [
  {
    id: 1,
    degree: "education.sapienza.degree",
    university: "education.sapienza.university",
    date: "education.sapienza.date",
    description: "education.sapienza.description",
    keyAreas: "education.sapienza.keyAreas",
    logoPath: `${base}images/Uniroma1.png`,
    logoFallback: "Sapienza"
  },
  {
    id: 2,
    degree: "education.roma_tre.degree",
    university: "education.roma_tre.university",
    date: "education.roma_tre.date",
    description: "education.roma_tre.description",
    keyAreas: "education.roma_tre.keyAreas",
    logoPath: `${base}images/Uniroma3.png`,
    logoFallback: "Roma Tre"
  },
];

const certifications = [

  {
    name: "Siemens KNX/DALI Gateways",
    issuer: "Siemens",
    date: null,
  },
  {
    name: "Siemens ModBus",
    issuer: "Siemens",
    date: null,
  },
  {
    name: "Siemens BT Networks Basics",
    issuer: "Siemens",
    date: null,
  },
  {
    name: "Siemens PXC4/PXC5/PXC7 Basics",
    issuer: "Siemens",
    date: null,
  },
];

const projects = [
  {
    title: "projects.hvac_twin.title",
    role: "projects.hvac_twin.role",
    tech: ["MQTT", "PLC", "BACnet", "IFC", "3D Modeling", "Data Visualization", "Modbus"],
    result: "projects.hvac_twin.result",
    dossier_desc: "projects.hvac_twin.dossier_desc",
  },
  {
    title: "projects.bridge_monitoring.title",
    role: "projects.bridge_monitoring.role",
    tech: ["PLC", "MQTT", "Sensor Networks", "Data Logging", "Real-time Dashboards", "Modbus"],
    result: "projects.bridge_monitoring.result",
    dossier_desc: "projects.bridge_monitoring.dossier_desc",
  },
  {
    title: "projects.tiago_robot.title",
    role: "projects.tiago_robot.role",
    tech: ["ROS2", "Python", "Nav2", "SLAM Toolbox", "Speech Recognition", "Behavior Trees"],
    result: "projects.tiago_robot.result",
    dossier_desc: "projects.tiago_robot.dossier_desc",
  },
  {
    title: "projects.koopa_forecasting.title",
    role: "projects.koopa_forecasting.role",
    tech: ["Python", "PyTorch", "Pandas", "Scikit-learn", "Koopa", "Time Series Forecasting"],
    result: "projects.koopa_forecasting.result",
    dossier_desc: "projects.koopa_forecasting.dossier_desc",
  },
  {
    title: "projects.maze_rl.title",
    role: "projects.maze_rl.role",
    tech: ["Python", "PyTorch", "Gymnasium", "Reinforcement Learning", "SAC", "DDPG"],
    result: "projects.maze_rl.result",
    dossier_desc: "projects.maze_rl.dossier_desc",
  },
  {
    title: "projects.cultural_classification.title",
    role: "projects.cultural_classification.role",
    tech: ["Python", "Transformers", "PyTorch", "Scikit-learn", "NLP", "TF-IDF"],
    result: "projects.cultural_classification.result",
    dossier_desc: "projects.cultural_classification.dossier_desc",
  },
  {
    title: "projects.archaic_translation.title",
    role: "projects.archaic_translation.role",
    tech: ["Python", "LLMs", "Prompt Engineering", "NLP", "Evaluation Pipelines"],
    result: "projects.archaic_translation.result",
    dossier_desc: "projects.archaic_translation.dossier_desc",
  },
  {
    title: "projects.thermal_drift.title",
    role: "projects.thermal_drift.role",
    tech: ["Python", "PyTorch", "Transformers", "Signal Processing", "Time Series Modeling"],
    result: "projects.thermal_drift.result",
    dossier_desc: "projects.thermal_drift.dossier_desc",
  },
  {
    title: "projects.image_generation.title",
    role: "projects.image_generation.role",
    tech: ["Python", "GANs", "Stable Diffusion", "VGG16", "PyTorch", "Image Classification"],
    result: "projects.image_generation.result",
    dossier_desc: "projects.image_generation.dossier_desc",
  },
  {
    title: "projects.vehicle_simulation.title",
    role: "projects.vehicle_simulation.role",
    tech: ["Unity", "C#", "Mobile Sensors", "WheelColliders", "UI Systems", "Physics Simulation"],
    result: "projects.vehicle_simulation.result",
    dossier_desc: "projects.vehicle_simulation.dossier_desc",
  },
];

const publications = [
  {
    title: "publications.thermal_drift_paper.title",
    authors: "publications.thermal_drift_paper.authors",
    venue: "publications.thermal_drift_paper.venue",
    year: 2025,
    doi: "10.1234/example.2025.001",
    link: "https://arxiv.org/example" // opzionale
  },
  {
    title: "publications.koopa_forecasting_paper.title",
    authors: "publications.koopa_forecasting_paper.authors",
    venue: "publications.koopa_forecasting_paper.venue",
    year: 2024,
    doi: null,
    link: "https://example.com/paper"
  }
];


const socialImgs = [
  {
    name: "github",
    imgPath: `${base}images/logos/git.svg`,
    link: "https://github.com/FS1612",
  },
  {
    name: "linkedin",
    imgPath: `${base}images/linkedin.png`,
    link: "https://www.linkedin.com/in/francesco-saverio-conforti-660b3a277/",
  },
  {
    name: "insta",
    imgPath: `${base}images/insta.png`,
    link: "https://www.instagram.com/fra.save16/",
  },
];

const showcaseProjects = [
  {
    id: 1,
    titleKey: "showcase.project1.title",
    descKey: "showcase.project1.desc",
    image: `${base}images/project1.png`,
    type: "image",
  },
  {
    id: 2,
    titleKey: "showcase.project2.title",
    descKey: "showcase.project2.desc",
    video: `${base}images/project2.mp4`,
    type: "video",
    bgColor: "#FFEFDB",
  },
  {
    id: 3,
    titleKey: "showcase.project3.title",
    descKey: "showcase.project3.desc",
    image: `${base}images/project3.png`,
    type: "image",
    bgColor: "#FFE7EB",
  },
];

export {
  words,
  abilities,
  logoIconsList,

  expCards,
  educationCards,
  certifications,
  projects,
  showcaseProjects,
  socialImgs,

  techStackIcons,
  techStackImgs,
  navLinks,
  skillsProgress,
  publications
};
