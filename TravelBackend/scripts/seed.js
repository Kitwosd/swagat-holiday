const path = require("path");
const {
  sequelize,
  User,
  Trip,
  Destination,
  Activity,
  Review,
  BlogPost,
  Faq,
  SiteContent,
} = require("../models");

async function seedDatabase() {
  console.log("--- Starting Database Seeding ---");

  try {
    // Authenticate and sync schema
    await sequelize.authenticate();
    console.log("Database connected.");

    await sequelize.sync({ alter: true });
    console.log("Database schema synchronized.");

    // 1. Seed Admin User
    const existingAdmin = await User.findOne({
      where: { email: "admin@swagatholidays.com" },
    });
    if (!existingAdmin) {
      await User.create({
        name: "Swagat Holidays",
        email: "admin@swagatholidays.com",
        password: "adminpassword123",
        role: "admin",
      });
      console.log(
        "Default Admin user created: admin@swagatholidays.com / adminpassword123",
      );
    } else {
      console.log("Admin user already exists.");
    }

    // Load frontend data dynamically
    const tripsModule = await import("../../Travels/src/data/tripsData.js");
    const destinationsModule =
      await import("../../Travels/src/data/destinationsData.js");
    const activitiesModule =
      await import("../../Travels/src/data/activitiesData.js");

    // 2. Seed Trips
    const tripCount = await Trip.count();
    if (tripCount === 0 && tripsModule.TRIPS) {
      await Trip.bulkCreate(tripsModule.TRIPS);
      console.log(`Seeded ${tripsModule.TRIPS.length} trips.`);
    } else {
      console.log(`Trips table already has ${tripCount} records.`);
    }

    // 3. Seed Destinations
    const destCount = await Destination.count();
    if (destCount === 0 && destinationsModule.DESTINATIONS) {
      await Destination.bulkCreate(destinationsModule.DESTINATIONS);
      console.log(
        `Seeded ${destinationsModule.DESTINATIONS.length} destinations.`,
      );
    } else {
      console.log(`Destinations table already has ${destCount} records.`);
    }

    // 4. Seed Activities
    const actCount = await Activity.count();
    if (actCount === 0 && activitiesModule.ACTIVITIES) {
      await Activity.bulkCreate(activitiesModule.ACTIVITIES);
      console.log(`Seeded ${activitiesModule.ACTIVITIES.length} activities.`);
    } else {
      console.log(`Activities table already has ${actCount} records.`);
    }

    // 5. Seed Reviews
    const revCount = await Review.count();
    if (revCount === 0 && activitiesModule.REVIEWS) {
      await Review.bulkCreate(activitiesModule.REVIEWS);
      console.log(`Seeded ${activitiesModule.REVIEWS.length} reviews.`);
    } else {
      console.log(`Reviews table already has ${revCount} records.`);
    }

    // 6. Seed Blog Posts
    const blogCount = await BlogPost.count();
    if (blogCount === 0 && activitiesModule.BLOG_POSTS) {
      await BlogPost.bulkCreate(activitiesModule.BLOG_POSTS);
      console.log(`Seeded ${activitiesModule.BLOG_POSTS.length} blog posts.`);
    } else {
      console.log(`Blog posts table already has ${blogCount} records.`);
    }

    // 7. Seed FAQs
    const faqCount = await Faq.count();
    if (faqCount === 0 && activitiesModule.FAQS) {
      const faqsWithIndex = activitiesModule.FAQS.map((f, i) => ({
        ...f,
        orderIndex: i,
      }));
      await Faq.bulkCreate(faqsWithIndex);
      console.log(`Seeded ${activitiesModule.FAQS.length} FAQs.`);
    } else {
      console.log(`FAQs table already has ${faqCount} records.`);
    }

    // 8. Seed Site Contents (Hero, Stats, Company Info)
    const siteContentDefaults = [
      {
        key: "hero_content",
        data: {
          badge:
            "Government Licensed • Sherpa Led • 100% Guaranteed Departures",
          title: "Your Gateway to the Himalayas",
          subtitle:
            "With years of experience, we craft unforgettable treks, tours and journeys that connect you directly to the heart of the Himalayas.",
          image:
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85",
        },
      },
      {
        key: "company_stats",
        data: {
          experienceYears: "18+",
          successRate: "99.4%",
          trekkersGuided: "12,500+",
          averageRating: "4.98",
        },
      },
      {
        key: "contact_info",
        data: {
          phone: "+977-1-4700000",
          mobile: "+977-9851000000",
          email: "hello@swagattravels.com",
          address: "Amrit Marg, Thamel, Kathmandu 44600, Nepal",
          whatsapp: "+9779851000000",
          googleMapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.240403164478!2d85.30904037546738!3d27.70986277617997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb1555555%3A0x6b13b63b21625d97!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp",
          workingHours: "Sunday – Friday: 08:30 AM – 06:30 PM (NPT)",
          emergencySupport: "24/7 On-Tour & Mountain SOS Support",
        },
      },
      {
        key: "why_choose_us",
        data: {
          title: "Why Choose Our Journeys",
          subtitle:
            "Experience the difference of traveling with Nepal’s top certified mountaineering leaders.",
          image1:
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
          image2:
            "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=800&q=80",
        },
      },
      {
        key: "testimonials_section",
        data: {
          title: "What Our Travelers Say",
          subtitle:
            "Real feedback from travelers, first-time explorers, and families who walked the high Himalayas with Swagat Holidays & Travels.",
          ratingBadge: "5.0 / 5.0",
          rankText: "Ranked #1 on TripAdvisor & Google Reviews",
        },
      },
    ];

    for (const item of siteContentDefaults) {
      const exists = await SiteContent.findOne({ where: { key: item.key } });
      if (!exists) {
        await SiteContent.create(item);
        console.log(`Created default site content for: ${item.key}`);
      } else {
        // Update with any missing fields
        await exists.update({ data: { ...item.data, ...exists.data } });
      }
    }

    console.log("--- Database Seeding Completed Successfully! ---");
  } catch (error) {
    console.error("Error during database seeding:", error);
    throw error;
  }
}

// Execute if run directly from CLI
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = seedDatabase;
