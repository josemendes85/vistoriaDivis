
    '010': [ // 010: SISTEMA DE CHUVEIROS AUTOMÁTICOS
        { grupos: [], check: () => true }, // Sempre
        { grupos: [2], check: (h, a) => h > 600 },
        { grupos: [], check: (h, a) => h > 3 && a > 500 },
        { grupos: [22, 23, 30, 31], check: (h, a) => h > 3 && a > 3000 },
        { grupos: [], check: (h, a) => h > 6 && a > 750 },
        { grupos: [17], check: (h, a) => h > 6 && a > 3000 },
        { grupos: [], check: (h, a) => h > 9 && a > 750 },
        { grupos: [], check: (h, a) => h > 9 && a > 1200 },
        { grupos: [], check: (h, a) => h > 12 && a > 1200 },
        { grupos: [], check: (h, a) => h > 12 && a > 2000 },
        { grupos: [35, 39], check: (h, a) => h > 12 && a > 3000 },
        { grupos: [3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 25, 26, 27, 28, 29, 32, 38], check: (h, a) => h > 12 && a > 5000 },
        { grupos: [34], check: (h, a) => h > 15 && a > 5000 },
        { grupos: [37], check: (h, a) => h > 15 && a > 7000 },
        { grupos: [36], check: (h, a) => h > 15 && a > 10000 },
        
]