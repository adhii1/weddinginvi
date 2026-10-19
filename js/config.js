/**
 * Centralized Wedding Invitation Configuration
 * Updated with exact names, dates, events, venue, and countdown target date.
 */
const weddingDetails = {
    brideName: "Arshitha",
    brideFullName: "Arshitha",
    brideParents: "Shri. G. RAJU & Smt. SANGEETHA RAJU",
    
    groomName: "VIVEK.A",
    groomFullName: "VIVEK.A",
    groomParents: "Shri. Anbalagan C.K & Smt. Mary Stella A",
    
    // Target date for the live countdown timer (ISO format: YYYY-MM-DDTHH:MM:SS)
    weddingDateISO: "2026-11-16T09:30:00",
    weddingDateFormatted: "Monday, 16th November 2026",
    hashtag: "#ArshithaAndVivek",

    events: {
        haldi: {
            title: "Haldi",
            eyebrow: "Auspicious Ceremony",
            tagline: "A vibrant celebration of turmeric, blessings and joy",
            date: "Thursday, 12th November 2026",
            time: "12:30 PM – 2:30 PM",
            dressColor: "White (DC-White)",
            dressHex: "#FFFFFF",
            image: "assets/images/i (9).jpeg"
        },
        mehendi: {
            title: "Mehendi",
            eyebrow: "Joyous Celebration",
            tagline: "An afternoon of beautiful henna, music and joy",
            date: "Thursday, 12th November 2026",
            time: "4:00 PM",
            image: "assets/images/i (8).jpeg"
        },
        pelikuthru: {
            title: "Pelikuthru",
            eyebrow: "Auspicious Ceremony",
            tagline: "Traditional bridal blessings and sacred pre-wedding rituals",
            date: "Friday, 13th November 2026",
            time: "12:00 PM – 1:00 PM",
            image: "assets/images/baale.jpeg"
        },
        bangle: {
            title: "Bangle Ceremony",
            eyebrow: "Traditional Blessing",
            tagline: "Adorning colourful glass bangles with love and blessings",
            date: "Friday, 13th November 2026",
            time: "4:30 PM",
            image: "assets/images/baaleshashtra.jpeg"
        },
        jodihaldi: {
            title: "Jodi Haldi",
            eyebrow: "Auspicious Ceremony",
            tagline: "A joyous haldi celebration together with love and laughter",
            date: "Sunday, 15th November 2026",
            time: "8:00 AM – 11:00 AM",
            dressColor: "Red (DC-Red)",
            dressHex: "#8C1D2F",
            image: "assets/images/i (7).jpeg"
        },
        sangeeth: {
            title: "Sangeeth",
            eyebrow: "Musical Evening",
            tagline: "An evening of dance, music and grand celebration",
            date: "Sunday, 15th November 2026",
            time: "1:00 PM – 3:00 PM",
            image: "assets/images/sangeeth new.jpeg"
        },
        reception: {
            title: "Reception",
            eyebrow: "Grand Celebration",
            tagline: "An evening of celebration and grand feast",
            date: "Sunday, 15th November 2026",
            time: "6:30 PM onwards",
            venue: "ALILA MEADOWS AND SK FARMS",
            venueAddress: "19/5, Bilijaji, Hesaraghatta, Bengaluru, Karnataka – 560088",
            image: "assets/images/i (10).jpeg"
        },
        muhurtham: {
            title: "Muhurtham",
            eyebrow: "Auspicious Ceremony",
            tagline: "Joining hands in holy matrimony",
            date: "Monday, 16th November 2026",
            time: "Muhurtham – 9:30 AM",
            venue: "ALILA MEADOWS AND SK FARMS",
            venueAddress: "19/5, Bilijaji, Hesaraghatta, Bengaluru, Karnataka – 560088",
            image: "assets/images/muhurtham.jpeg"
        }
    },

    families: {
        brideFamilyTitle: "BRIDE'S FAMILY",
        brideFamilyNames: "Shri. G. RAJU & Smt. SANGEETHA RAJU & Family",
        groomFamilyTitle: "GROOM'S FAMILY",
        groomFamilyNames: "Shri. Anbalagan C.K & Smt. Mary Stella A & Family"
    },

    venue: {
        name: "ALILA MEADOWS AND SK FARMS",
        city: "Bengaluru",
        fullAddress: "19/5, Bilijaji, Hesaraghatta, Bengaluru, Karnataka – 560088",
        mapsUrl: "https://maps.google.com/?q=Alila+Meadows+and+SK+Farms+Bilijaji+Hesaraghatta+Bengaluru+560088"
    },

    pickupLocation: {
        name: "Green Rich Enclave, HBR Layout (Bride's Home)",
        mapsUrl: "https://maps.google.com/?q=Green+Rich+Enclave,+HBR+Layout"
    }
};

// Export to window scope
window.weddingDetails = weddingDetails;
