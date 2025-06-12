
                // Prayer Timetable Script
                const timetable = {
    "1": ["3:00", "13:25", "17:48", "21:45", "23:15"],
    "2": ["2:59", "13:25", "17:48", "21:46", "23:16"],
    "3": ["2:57", "13:25", "17:49", "21:47", "23:17"],
    "4": ["2:56", "13:25", "17:49", "21:48", "23:18"],
    "5": ["2:55", "13:25", "17:50", "21:49", "23:19"],
    "6": ["2:54", "13:26", "17:50", "21:50", "23:20"],
    "7": ["2:53", "13:26", "17:51", "21:51", "23:21"],
    "8": ["2:52", "13:26", "17:51", "21:52", "23:22"],
    "9": ["2:51", "13:26", "17:51", "21:53", "23:23"],
    "10": ["2:50", "13:26", "17:52", "21:54", "23:24"],
    "11": ["2:49", "13:27", "17:52", "21:55", "23:25"],
    "12": ["2:49", "13:27", "17:53", "21:56", "23:26"],
    "13": ["2:48", "13:27", "17:53", "21:56", "23:26"],
    "14": ["2:47", "13:27", "17:53", "21:57", "23:27"],
    "15": ["2:47", "13:27", "17:54", "21:58", "23:28"],
    "16": ["2:47", "13:28", "17:54", "21:58", "23:28"],
    "17": ["2:46", "13:28", "17:54", "21:59", "23:29"],
    "18": ["2:46", "13:28", "17:55", "21:59", "23:29"],
    "19": ["2:46", "13:28", "17:55", "22:00", "23:30"],
    "20": ["2:46", "13:28", "17:55", "22:00", "23:30"],
    "21": ["2:46", "13:29", "17:55", "22:00", "23:30"],
    "22": ["2:46", "13:29", "17:56", "22:01", "23:31"],
    "23": ["2:47", "13:29", "17:56", "22:01", "23:31"],
    "24": ["2:47", "13:29", "17:56", "22:01", "23:31"],
    "25": ["2:47", "13:29", "17:56", "22:01", "23:31"],
    "26": ["2:48", "13:30", "17:56", "22:01", "23:31"],
    "27": ["2:48", "13:30", "17:56", "22:01", "23:31"],
    "28": ["2:49", "13:30", "17:56", "22:01", "23:31"],
    "29": ["2:50", "13:30", "17:57", "22:01", "23:31"],
    "30": ["2:51", "13:30", "17:57", "22:00", "23:30"]
};
                const iqamahTimes = {
                    "Fajr": "",
                    "Dhuhr": "",
                    "Asr": "",
                    "Maghrib": "",
                    "Isha": ""
                };

                function updateTimetable() {
                    const now = new Date();
                    const day = now.getDate();
                    const month = now.getMonth();

                    document.getElementById("todayDate").textContent = now.toDateString();

                    if (month !== 4 || !timetable[day]) {
                        document.getElementById("nextPrayer").textContent = "Timetable only available for May 2025.";
                        return;
                    }

                    const [fajr, dhuhr, asr, maghrib, isha] = timetable[day];

                    document.getElementById("FajrAdhan").textContent = fajr;
                    document.getElementById("DhuhrAdhan").textContent = dhuhr;
                    document.getElementById("AsrAdhan").textContent = asr;
                    document.getElementById("MaghribAdhan").textContent = maghrib;
                    document.getElementById("IshaAdhan").textContent = isha;

                    document.getElementById("FajrIqamah").textContent = iqamahTimes["Fajr"];
                    document.getElementById("DhuhrIqamah").textContent = iqamahTimes["Dhuhr"];
                    document.getElementById("AsrIqamah").textContent = iqamahTimes["Asr"];
                    document.getElementById("MaghribIqamah").textContent = iqamahTimes["Maghrib"];
                    document.getElementById("IshaIqamah").textContent = iqamahTimes["Isha"];

                    updateNextPrayer(fajr, dhuhr, asr, maghrib, isha);
                }

                function updateNextPrayer(fajr, dhuhr, asr, maghrib, isha) {
                    const now = new Date();
                    const prayers = {
                        "Fajr": fajr,
                        "Dhuhr": dhuhr,
                        "Asr": asr,
                        "Maghrib": maghrib,
                        "Isha": isha
                    };

                    for (const [name, time] of Object.entries(prayers)) {
                        const [h, m] = time.split(":").map(Number);
                        const prayerTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
                        if (now < prayerTime) {
                            const diff = Math.floor((prayerTime - now) / 1000);
                            const hours = Math.floor(diff / 3600);
                            const minutes = Math.floor((diff % 3600) / 60);
                            const seconds = diff % 60;
                            const pad = n => n.toString().padStart(2, '0');
                            document.getElementById("nextPrayer").textContent = `Next prayer: ${name} in ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
                            return;
                        }
                    }

                    document.getElementById("nextPrayer").textContent = "Next prayer: Fajr tomorrow";
                }

                function updateHijriDate() {
                    try {
                        const today = new Date();
                        const hijriDate = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }).format(today);

                        document.getElementById("hijriDate").textContent = `Hijri Date: ${hijriDate}`;
                    } catch (e) {
                        document.getElementById("hijriDate").textContent = "Hijri date not supported in this browser.";
                    }
                }

                updateTimetable();
                setInterval(updateTimetable, 1000);
                updateHijriDate();
                function updateHijriDate() {
    try {
        const today = new Date();
        const hijriDate = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(today);

        document.getElementById("hijriDate").textContent = `Hijri Date: ${hijriDate}`;
    } catch (error) {
        // Fallback: fetch Hijri date from Aladhan API
        fetchHijriDateFromAPI();
    }
}

function fetchHijriDateFromAPI() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const yyyy = today.getFullYear();

    const url = `https://islamicfoundation.ie/${dd}-${mm}-${yyyy}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.hijri) {
                const hijri = data.data.hijri;
                const hijriDateStr = `Hijri Date: ${hijri.day} ${hijri.month.en} ${hijri.year}`;
                document.getElementById("hijriDate").textContent = hijriDateStr;
            } else {
                document.getElementById("hijriDate").textContent = "Hijri date unavailable.";
            }
        })
        .catch(() => {
            document.getElementById("hijriDate").textContent = "Error fetching Hijri date.";
        });
}

            


// Ayah of the Day Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load Arabic font
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const ayahs = [
        {
            arabic: "وَإِن تَصْبِرُوا۟ وَتَتَّقُوا۟ فَإِنَّ ذَٰلِكَ مِنْ عَزْمِ ٱلْأُمُورِ",
            translation: "And if you are patient and fear Allah, indeed, that is of the matters requiring resolve.",
            reference: "Surah Al-Imran (3:186)"
        },
        {
            arabic: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
            translation: "Indeed, with hardship comes ease.",
            reference: "Surah Ash-Sharh (94:6)"
        },
        {
            arabic: "وَٱذْكُرُوا۟ نِعْمَةَ ٱللَّهِ عَلَيْكُمْ",
            translation: "And remember the favor of Allah upon you.",
            reference: "Surah Al-Baqarah (2:231)"
        },
        {
            arabic: "وَتَعَاوَنُوا۟ عَلَى ٱلْبِرِّ وَٱلتَّقْوَىٰ",
            translation: "And cooperate in righteousness and piety.",
            reference: "Surah Al-Ma'idah (5:2)"
        },
        {
            arabic: "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱصْبِرُوا۟ وَصَابِرُوا۟",
            translation: "O you who have believed, persevere and endure.",
            reference: "Surah Al-Imran (3:200)"
        },
        {
            arabic: "وَٱلَّذِينَ جَٰهَدُوا۟ فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
            translation: "And those who strive for Us - We will surely guide them to Our ways.",
            reference: "Surah Al-Ankabut (29:69)"
        }
    ];

    // Get today's ayah based on date (consistent daily)
    function getDailyAyah() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        return ayahs[dayOfYear % ayahs.length];
    }

    // Display ayah
    function displayAyah(ayah) {
        document.getElementById('ayahArabic').textContent = ayah.arabic;
        document.getElementById('ayahTranslation').textContent = `"${ayah.translation}"`;
        document.getElementById('ayahReference').textContent = ayah.reference;
    }

    // Initial display
    displayAyah(getDailyAyah());

    // Refresh button - shows random ayah
    document.getElementById('refreshAyah').addEventListener('click', function() {
        const randomAyah = ayahs[Math.floor(Math.random() * ayahs.length)];
        displayAyah(randomAyah);
    });
});



        // Tab functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Main tabs
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons and contents
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    button.classList.add('active');
                    const tabId = button.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                });
            });
            
            // Nested auth tabs
            const authTabButtons = document.querySelectorAll('.auth-tab-btn');
            const authContents = document.querySelectorAll('.auth-content');

            
            authTabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons and contents
                    authTabButtons.forEach(btn => btn.classList.remove('active'));
                    authContents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    button.classList.add('active');
                    const authTabId = button.getAttribute('data-auth-tab') + 'Tab';
                    document.getElementById(authTabId).classList.add('active');
                });
            });

            // Mobile menu toggle
            document.querySelector('.menu-toggle').addEventListener('click', function() {
                document.getElementById('main-nav').classList.toggle('show');
            });

            // Read More Button Functionality
            const readMoreBtns = document.querySelectorAll('.read-more-btn');
            
            readMoreBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const additionalContent = this.nextElementSibling;
                    const isExpanded = additionalContent.style.display === 'block';
                    
                    // Toggle content visibility
                    additionalContent.style.display = isExpanded ? 'none' : 'block';
                    
                    // Update button text and icon
                    this.innerHTML = isExpanded ? 
                        'Read More <i class="fas fa-chevron-down"></i>' : 
                        'Read Less <i class="fas fa-chevron-up"></i>';
                    
                    // Toggle active class
                    this.classList.toggle('active');
                });
            });
        });
    

document.write(new Date().getFullYear())

document.write(new Date().getFullYear())
