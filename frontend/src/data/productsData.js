const products = [
    {
        id: 1,
        title: "Nexus-Core V2 Server",
        price: "₹3,86,910.00",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtfZujjCbXR1FlpM_7x3M8g0lKaOZYY5yzsGokOA6mF7-bG12N9IOqlcFx_bsXuEKIxNrsgmyIj9_JKVdA-i-ahyaino7rqAV9gZB3lHnmwAsMO6HHWNsCb3ank-T1fY5tY0FDVOUJdw6gEt8z7Kbh9tj1rq0vHzxWn76MwpP7x5Hfc4zdciERC9dYrWLQvPxWfIGOIsQVP5PH5JYyZk5iLCUWHijNzwAeFtj8g-0WeFLXxzxPrjwwxe7ujRSpdA9N-5TnqagOeHo",
        alt: "Close up photography of professional rack-mounted server units in a data center. The hardware is sleek, featuring status LEDs in soft blue, brushed aluminum finishes, and precision-engineered cooling vents. The lighting is cool and clinical, reinforcing a brand aesthetic of reliability and enterprise-level power.",
        category: "Enterprise Server",
        features: [
            { title: "Unrivaled Reliability", description: "Redundant power supplies and mission-critical components built for 99.999% uptime." },
            { title: "Scalable Architecture", description: "Modular design allowing for rapid expansion of memory and storage as your data grows." }
        ],
        processors: [
            { name: "Dual Intel Xeon Silver", price: "Included", selected: true },
            { name: "Dual Intel Xeon Gold", price: "+₹1,30,500.00", selected: false }
        ],
        memoryOptions: [
            { size: "64GB", selected: false },
            { size: "128GB", selected: true },
            { size: "256GB", selected: false }
        ],
        specs: [
            { label: "Processor", value: "Dual Intel Xeon Silver 4410Y (12C/24T)" },
            { label: "Memory Slots", value: "16x DIMM Slots (Up to 4TB)" },
            { label: "Memory Included", value: "128GB DDR5 ECC (4800MT/s)" },
            { label: "Networking", value: "2x 10GbE SFP+ / 2x 1GbE RJ45" },
            { label: "Storage Bays", value: "12x 3.5\" Hot-Swap SAS/SATA" },
            { label: "Power Supply", value: "Dual 1100W Redundant (Platinum)" },
            { label: "Form Factor", value: "2U Rackmount (Rails Included)" }
        ]
    },
    {
        id: 2,
        title: "RenderPro Workstation",
        price: "₹3,46,500.00",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzN8F2-N9ZrMZOLtcNVuf-tPAiYqS37ZX6HpMCKzDR6K68LuZazr94c-4dr3gb6vZyGfH3wgc-rGoGKXgf89T1O6WhcAhL4LR5_AJnn3iC6B-PYGRN-SNj8WtSrCY_GjwgvX3cKV8rZxA2VL_1GyIGq47jqHPTisEmjA9fKQYks0iJYj8ZbwYyhghiMB0LgPoF2V2xDZzoKV80RyYJBhHNA-qCvI6Fh6GKey48c5aec9klxTE14aeMJhStSZJM1cUd4fIlRV5ieeQ",
        alt: "A high-end network security appliance shown in a professional studio setting. The device is matte black with minimal branding, featuring glowing green and blue indicator lights that signify active data protection. The background is a gradient of soft grey and navy, maintaining a clean corporate aesthetic.",
        category: "Professional Workstation",
        features: [
            { title: "CUDA Optimized", description: "Triple-fan thermal management ensuring peak performance without thermal throttling." },
            { title: "Silent Operation", description: "Acoustically dampened chassis for distraction-free creative environments." }
        ],
        processors: [
            { name: "AMD Ryzen Threadripper", price: "Included", selected: true },
            { name: "AMD Ryzen Threadripper PRO", price: "+₹85,500.00", selected: false }
        ],
        memoryOptions: [
            { size: "128GB", selected: false },
            { size: "256GB", selected: true },
            { size: "512GB", selected: false }
        ],
        specs: [
            { label: "Processor", value: "AMD Ryzen Threadripper PRO 5955WX" },
            { label: "Graphics", value: "NVIDIA RTX A6000 48GB" },
            { label: "Memory Included", value: "256GB DDR4 ECC (3200MT/s)" },
            { label: "Networking", value: "1x 10GbE RJ45 / Wi-Fi 6E" },
            { label: "Storage Bays", value: "4x M.2 NVMe / 4x 3.5\" SATA" },
            { label: "Power Supply", value: "1600W 80+ Titanium" },
            { label: "Form Factor", value: "Full Tower ATX" }
        ]
    },
    {
        id: 3,
        title: "Precision Book Pro",
        price: "₹2,24,910.00",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaCQY1WoIhO1O4mnrEZ4FZS_OyHcWXOB_9_EcZNLHVzeqyiU5bdleKEWPU-44Zv44lokyBVtGR1yAfoMa_H3tUQubDX_6LxV1tOC8nMUmDPpMjfExCCRqLhUTi2TeIBCQnqC_IKFYydxAReAhEhrjxgPxsrOpL56L-zK3y632rrBZQKBRIuKka5L63n-7uPaYLBnNUeUFyVZyi6sY68sk0rMJJveqFA45F-ry5Y52v9dHzxLaj0CGW8J15HkL1wqe1iuMZ2i9ScSE",
        alt: "An industrial-grade network switch with multiple ethernet ports illuminated by high-speed data activity lights. The composition is angled to show the depth and complexity of the hardware, styled with a professional corporate look using shades of navy blue and metallic silver in a high-key lighting environment.",
        category: "Mobile Professional",
        features: [
            { title: "All-Day Battery", description: "Advanced power management delivering up to 20 hours of continuous productivity." },
            { title: "Retina XDR Display", description: "True-to-life color accuracy with 1000 nits sustained brightness." }
        ],
        processors: [
            { name: "M2 Pro Chip", price: "Included", selected: true },
            { name: "M2 Max Chip", price: "+₹54,000.00", selected: false }
        ],
        memoryOptions: [
            { size: "16GB", selected: false },
            { size: "32GB", selected: true },
            { size: "64GB", selected: false }
        ],
        specs: [
            { label: "Processor", value: "Apple M2 Max (12-core CPU)" },
            { label: "Graphics", value: "38-core GPU / 16-core Neural Engine" },
            { label: "Memory Included", value: "32GB Unified Memory" },
            { label: "Display", value: "16.2\" Liquid Retina XDR (3456x2234)" },
            { label: "Storage", value: "1TB PCIe NVMe SSD" },
            { label: "Battery", value: "100-watt-hour lithium-polymer" },
            { label: "Weight", value: "4.7 lbs (2.15 kg)" }
        ]
    },
    {
        id: 4,
        title: "DataStack SSD Array",
        price: "₹1,08,000.00",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5umdlj0a3zltxPIrEbWgUFsN25Ni4sAupFtBJWGpewMi0uuVj6pdqDayBQXDvV-32U78zfNF5j5s0fta-eO8c814d4z0ul2N26mIPgMAMZuxMTMp27b4wMFlaYVwEVAOP9ft0cqr_nbHm5lAEa_VypF57axl-q64KIk5ewQsvhPuMhDy2FvIV-tqKoCOnFTpXALFPZuMRAfDJ2FlnYTF5ckf4YFt921Kkbu6-AsmSNllFc5kd4Ix28qV7Pl3ZE9WTTSrDEKohmuc",
        alt: "A premium executive workstation laptop sitting on a minimalist wooden desk. The screen displays a complex data visualization dashboard in navy and teal. The surrounding environment is a bright, airy office with floor-to-ceiling windows, reflecting a modern, high-performance professional lifestyle.",
        category: "Enterprise Storage",
        features: [
            { title: "Hardware Encryption", description: "AES 256-bit hardware encryption with biometric access control options." },
            { title: "Thunderbolt 4", description: "Dual ports enabling daisy-chaining and up to 40Gbps transfer speeds." }
        ],
        processors: [
            { name: "16TB NVMe SSD", price: "Included", selected: true },
            { name: "32TB NVMe SSD", price: "+₹72,000.00", selected: false }
        ],
        memoryOptions: [
            { size: "RAID 0", selected: false },
            { size: "RAID 5", selected: true },
            { size: "RAID 10", selected: false }
        ],
        specs: [
            { label: "Capacity", value: "16TB (4x 4TB NVMe SSDs)" },
            { label: "Interface", value: "2x Thunderbolt 4 (40Gbps)" },
            { label: "Read/Write Speeds", value: "Up to 2800 MB/s" },
            { label: "RAID Controller", value: "Hardware RAID 0/1/4/5/1+0" },
            { label: "Cooling", value: "Active cooling with whisper-quiet fan" },
            { label: "Power Supply", value: "External 120W Power Adapter" },
            { label: "Dimensions", value: "4.2\" x 4.2\" x 7.5\"" }
        ]
    },
    {
        id: 5,
        title: "QuantumEdge Workstation",
        price: "₹2,16,000.00",
        src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80",
        alt: "A high-end workstation laptop on a sleek black desk displaying AI analytics dashboards in a modern office environment.",
        category: "Professional Workstation",
        features: [
            { title: "AI Acceleration", description: "Dedicated neural processing engine for machine learning tasks." },
            { title: "4K Display", description: "16-inch UHD display with HDR and 100% Adobe RGB coverage." }
        ],
        processors: [
            { name: "Intel Core Ultra 9", price: "Included", selected: true },
            { name: "AMD Ryzen 9 Pro", price: "+₹27,000.00", selected: false }
        ],
        memoryOptions: [
            { size: "32GB", selected: true },
            { size: "64GB", selected: false },
            { size: "128GB", selected: false }
        ],
        specs: [
            { label: "Display", value: "16-inch 4K UHD OLED" },
            { label: "Graphics", value: "NVIDIA RTX 5090 16GB" },
            { label: "Storage", value: "2TB NVMe SSD" },
            { label: "Battery", value: "99Wh Lithium-ion" },
            { label: "Ports", value: "2x Thunderbolt 5, HDMI 2.1" },
            { label: "Weight", value: "2.1kg" }
        ]
    },

    {
        id: 6,
        title: "SkyNet Mini Server",
        price: "₹1,66,500.00",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
        alt: "A compact enterprise mini server placed inside a modern server rack with blue lighting.",
        category: "Enterprise Server",
        features: [
            { title: "Remote Access", description: "Integrated remote server management and monitoring." },
            { title: "Virtualization Support", description: "Optimized for multiple virtual environments." }
        ],
        processors: [
            { name: "Intel Xeon E-2488", price: "Included", selected: true },
            { name: "Dual Xeon Setup", price: "+₹54,000.00", selected: false }
        ],
        memoryOptions: [
            { size: "32GB ECC", selected: false },
            { size: "64GB ECC", selected: true },
            { size: "128GB ECC", selected: false }
        ],
        specs: [
            { label: "Storage", value: "8TB SSD" },
            { label: "Network", value: "Dual 10Gb Ethernet" },
            { label: "Cooling", value: "Dynamic airflow cooling" },
            { label: "Power Supply", value: "500W Redundant PSU" },
            { label: "Dimensions", value: "10 x 8 x 4 inches" }
        ]
    },

    {
        id: 7,
        title: "NovaView Curved Monitor",
        price: "₹71,910.00",
        src: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
        alt: "A large curved ultrawide monitor showing multiple coding and design windows on a modern desk setup.",
        category: "Display Technology",
        features: [
            { title: "UltraWide Panel", description: "34-inch immersive curved display." },
            { title: "Adaptive Sync", description: "Smooth visuals with high refresh rate technology." }
        ],
        processors: [
            { name: "144Hz Refresh Rate", price: "Included", selected: true },
            { name: "240Hz Refresh Rate", price: "+₹18,000.00", selected: false }
        ],
        memoryOptions: [
            { size: "IPS Panel", selected: true },
            { size: "OLED Panel", selected: false }
        ],
        specs: [
            { label: "Resolution", value: "3440 x 1440" },
            { label: "Response Time", value: "1ms" },
            { label: "Brightness", value: "450 nits" },
            { label: "Ports", value: "HDMI 2.1, DisplayPort, USB-C" },
            { label: "Aspect Ratio", value: "21:9" }
        ]
    },

    {
        id: 8,
        title: "TitanX Gaming Desktop",
        price: "₹2,79,000.00",
        src: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
        alt: "A premium RGB gaming desktop setup with a transparent case and futuristic lighting.",
        category: "Gaming Systems",
        features: [
            { title: "Liquid Cooling", description: "Advanced RGB liquid cooling system." },
            { title: "Ray Tracing", description: "Next-generation graphics rendering support." }
        ],
        processors: [
            { name: "Intel i9-15900K", price: "Included", selected: true },
            { name: "AMD Ryzen 9 9950X", price: "+₹13,500.00", selected: false }
        ],
        memoryOptions: [
            { size: "32GB DDR5", selected: true },
            { size: "64GB DDR5", selected: false }
        ],
        specs: [
            { label: "GPU", value: "RTX 5090 24GB" },
            { label: "Storage", value: "4TB Gen5 SSD" },
            { label: "Power Supply", value: "1000W Gold Rated" },
            { label: "Cooling", value: "360mm Liquid Cooler" },
            { label: "Case", value: "Tempered Glass RGB Tower" }
        ]
    }
];

export default products;
