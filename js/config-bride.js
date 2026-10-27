/**
 * Centralized Wedding Invitation Configuration ΓÇö Bride's Version
 * Custom event list, timings, and family order for the bride's invitation.
 */
const weddingDetails = {
    groomName: "VIVEK.A",
    groomFullName: "VIVEK.A",
    groomParents: "Shri. Anbalagan C.K & Smt. Mary Stella A",

    brideName: "Arshitha",
    brideFullName: "Arshitha",
    brideParents: "Shri. G. RAJU & Smt. SANGEETHA RAJU",

    // Target date for the live countdown timer (ISO format: YYYY-MM-DDTHH:MM:SS)
    weddingDateISO: "2026-11-16T09:30:00",
    weddingDateFormatted: "Monday, 16th November 2026",
    hashtag: "#VivekAndArshitha",

    events: {
        haldi: {
            title: "Haldi",
            eyebrow: "Auspicious Ceremony",
            tagline: "A vibrant celebration of turmeric, blessings and joy",
            date: "Thursday, 12th November 2026",
            time: "10:30 AM onwards",
            image: "assets/images/i4.jpeg"
        },
        jodihaldi: {
            title: "Jodi Haldi",
            eyebrow: "Auspicious Ceremony",
            tagline: "A joyous haldi celebration together with love and laughter",
            date: "Sunday, 15th November 2026",
            time: "8:00 AM ΓÇô 11:00 AM",
            image: "assets/images/i (7).jpeg"
        },
        sangeeth: {
            title: "Sangeeth",
            eyebrow: "Musical Evening",
            tagline: "An evening of dance, music and grand celebration",
            date: "Sunday, 15th November 2026",
            time: "1:00 PM ΓÇô 3:00 PM",
            image: "assets/images/sangeeth1.jpeg"
        },
        reception: {
            title: "Reception",
            eyebrow: "Grand Celebration",
            tagline: "An evening of celebration and grand feast",
            date: "Sunday, 15th November 2026",
            time: "6:30 PM onwards",
            venue: "ALILA MEADOWS AND SK FARMS",
            venueAddress: "19/5, Bilijaji, Hesaraghatta, Bengaluru, Karnataka ΓÇô 560088",
            image: "assets/images/i (10).jpeg"
        },
        muhurtham: {
            title: "Muhurtham",
            eyebrow: "Auspicious Ceremony",
            tagline: "Joining hands in holy matrimony",
            date: "Monday, 16th November 2026",
            time: "Muhurtham ΓÇô 9:30 AM",
            venue: "ALILA MEADOWS AND SK FARMS",
            venueAddress: "19/5, Bilijaji, Hesaraghatta, Bengaluru, Karnataka ΓÇô 560088",
            image: "assets/images/muhurtham.jpeg"
        }
    },

    families: {
        groomFamilyTitle: "GROOM'S FAMILY",
        groomFamilyNames: "Shri. Anbalagan C.K & Smt. Mary Stella A & Family",
        brideFamilyTitle: "BRIDE'S FAMILY",
        brideFamilyNames: "Shri. G. RAJU & Smt. SANGEETHA RAJU & Family"
    },

    venue: {
        name: "ALILA MEADOWS AND SK FARMS",
        city: "Bengaluru",
        fullAddress: "19/5, Bilijaji, Hesaraghatta, Bengaluru, Karnataka ΓÇô 560088",
        mapsUrl: "https://www.google.com/maps?q=Alila+Meadows,+19/5,+Bilijaji,+Hesaraghatta,+Bengaluru,+Karnataka+560088&ftid=0x3bae23007780365b:0x9bb463de8255f9cc&entry=gps&shh=CAE&lucs=,94297699,100826475,94231188,94280568,100821559,47071704,94218641,94282134,94286869,100820247,100822504&g_ep=CAISEjI2LjMzLjEuOTYxODkxNDMyMBgAIIgnKmcsOTQyOTc2OTksMTAwODI2NDc1LDk0MjMxMTg4LDk0MjgwNTY4LDEwMDgyMTU1OSw0NzA3MTcwNCw5NDIxODY0MSw5NDI4MjEzNCw5NDI4Njg2OSwxMDA4MjAyNDcsMTAwODIyNTA0QgJJTg%3D%3D&skid=0ed668c7-2845-4617-ba2a-625ae33ab2d4&g_st=iw"
    }
};

// Export to window scope
window.weddingDetails = weddingDetails;
