
                // Prayer Timetable Script
                const timetable = {
                    "1": ["4:03", "13:24", "17:27", "20:55", "22:34"],
                    "2": ["4:00", "13:24", "17:28", "20:57", "22:36"],
                    "3": ["3:58", "13:24", "17:29", "20:58", "22:38"],
                    "4": ["3:55", "13:24", "17:30", "21:00", "22:40"],
                    "5": ["3:53", "13:24", "17:30", "21:02", "22:43"],
                    "6": ["3:51", "13:23", "17:31", "21:04", "22:45"],
                    "7": ["3:48", "13:23", "17:32", "21:06", "22:47"],
                    "8": ["3:46", "13:23", "17:33", "21:07", "22:49"],
                    "9": ["3:44", "13:23", "17:33", "21:09", "22:51"],
                    "10": ["3:41", "13:23", "17:34", "21:11", "22:53"],
                    "11": ["3:39", "13:23", "17:35", "21:13", "22:55"],
                    "12": ["3:37", "13:23", "17:35", "21:14", "22:58"],
                    "13": ["3:35", "13:23", "17:36", "21:16", "23:00"],
                    "14": ["3:33", "13:23", "17:37", "21:18", "23:02"],
                    "15": ["3:30", "13:23", "17:37", "21:19", "23:04"],
                    "16": ["3:28", "13:23", "17:38", "21:21", "23:06"],
                    "17": ["3:26", "13:23", "17:39", "21:23", "23:08"],
                    "18": ["3:24", "13:23", "17:39", "21:24", "23:08"],
                    "19": ["3:22", "13:23", "17:40", "21:26", "23:08"],
                    "20": ["3:20", "13:23", "17:41", "21:27", "23:09"],
                    "21": ["3:18", "13:24", "17:41", "21:29", "23:09"],
                    "22": ["3:16", "13:24", "17:42", "21:31", "23:10"],
                    "23": ["3:15", "13:24", "17:43", "21:32", "23:10"],
                    "24": ["3:13", "13:24", "17:43", "21:34", "23:11"],
                    "25": ["3:11", "13:24", "17:44", "21:35", "23:11"],
                    "26": ["3:09", "13:24", "17:44", "21:37", "23:12"],
                    "27": ["3:08", "13:24", "17:45", "21:38", "23:12"],
                    "28": ["3:06", "13:24", "17:46", "21:39", "23:13"],
                    "29": ["3:04", "13:24", "17:46", "21:41", "23:13"],
                    "30": ["3:03", "13:25", "17:47", "21:42", "23:14"],
                    "31": ["3:01", "13:25", "17:47", "21:43", "23:14"]
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