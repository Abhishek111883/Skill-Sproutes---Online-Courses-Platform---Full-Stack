const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("Cluster0");
    const UserCollection = database.collection("UserDB");
    const ClassesCollection = database.collection("ClassesDB");

    // Clear existing data (optional)
    // await UserCollection.deleteMany({});
    // await ClassesCollection.deleteMany({});

    // 5 Dummy Instructors
    const instructors = [
      {
        name: "Dr. Sarah Mitchell",
        email: "sarah.mitchell@example.com",
        role: "instructor",
        password: "hashed_password_1",
        about: "Expert in Web Development with 10+ years experience",
        photoUrl: "https://via.placeholder.com/150?text=Sarah",
        skills: ["React", "Node.js", "MongoDB", "JavaScript"],
        experience: "10+ years",
        students: 1250,
      },
      {
        name: "Prof. James Chen",
        email: "james.chen@example.com",
        role: "instructor",
        password: "hashed_password_2",
        about: "Data Science and Machine Learning specialist",
        photoUrl: "https://via.placeholder.com/150?text=James",
        skills: ["Python", "TensorFlow", "Data Science", "SQL"],
        experience: "8+ years",
        students: 980,
      },
      {
        name: "Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        role: "instructor",
        password: "hashed_password_3",
        about: "UI/UX Design and Frontend Development Expert",
        photoUrl: "https://via.placeholder.com/150?text=Emily",
        skills: ["Figma", "CSS", "React", "UI Design"],
        experience: "7+ years",
        students: 756,
      },
      {
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        role: "instructor",
        password: "hashed_password_4",
        about: "Cloud Architecture and DevOps Specialist",
        photoUrl: "https://via.placeholder.com/150?text=Michael",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        experience: "9+ years",
        students: 645,
      },
      {
        name: "Lisa Wang",
        email: "lisa.wang@example.com",
        role: "instructor",
        password: "hashed_password_5",
        about: "Mobile App Development and Cross-platform Expert",
        photoUrl: "https://via.placeholder.com/150?text=Lisa",
        skills: ["React Native", "Flutter", "iOS", "Android"],
        experience: "6+ years",
        students: 523,
      },
    ];

    // 10 Most Valuable Classes
    const classes = [
      {
        className: "React-Advanced-2024",
        title: "Advanced React.js Mastery 2024",
        instructorEmail: "sarah.mitchell@example.com",
        instructorName: "Dr. Sarah Mitchell",
        description:
          "Master advanced React concepts including hooks, context, and performance optimization",
        image: "https://via.placeholder.com/400x300?text=React+Mastery",
        price: 99.99,
        status: "approved",
        totalEnrolled: 3450,
        availableSeats: 50,
        duration: "12 weeks",
        level: "Advanced",
        category: "Web Development",
        students: 3450,
        rating: 4.9,
        reviews: 1250,
      },
      {
        className: "ML-AI-Complete",
        title: "Complete Machine Learning & AI Course",
        instructorEmail: "james.chen@example.com",
        instructorName: "Prof. James Chen",
        description:
          "Learn ML algorithms, neural networks, and build AI applications from scratch",
        image: "https://via.placeholder.com/400x300?text=ML+AI",
        price: 129.99,
        status: "approved",
        totalEnrolled: 2890,
        availableSeats: 30,
        duration: "16 weeks",
        level: "Advanced",
        category: "Data Science",
        students: 2890,
        rating: 4.8,
        reviews: 980,
      },
      {
        className: "FullStack-Bootcamp",
        title: "Full Stack Web Development Bootcamp",
        instructorEmail: "sarah.mitchell@example.com",
        instructorName: "Dr. Sarah Mitchell",
        description:
          "Complete journey from frontend to backend: React, Node.js, and databases",
        image: "https://via.placeholder.com/400x300?text=Full+Stack",
        price: 149.99,
        status: "approved",
        totalEnrolled: 4120,
        availableSeats: 40,
        duration: "20 weeks",
        level: "Beginner to Advanced",
        category: "Web Development",
        students: 4120,
        rating: 4.9,
        reviews: 1450,
      },
      {
        className: "UIUX-Design-101",
        title: "UI/UX Design Fundamentals",
        instructorEmail: "emily.rodriguez@example.com",
        instructorName: "Emily Rodriguez",
        description:
          "Learn design principles, wireframing, prototyping, and modern design tools",
        image: "https://via.placeholder.com/400x300?text=UI+UX",
        price: 89.99,
        status: "approved",
        totalEnrolled: 2340,
        availableSeats: 60,
        duration: "10 weeks",
        level: "Beginner",
        category: "Design",
        students: 2340,
        rating: 4.7,
        reviews: 756,
      },
      {
        className: "AWS-Certification-Pro",
        title: "AWS Cloud Architecture Certification",
        instructorEmail: "michael.johnson@example.com",
        instructorName: "Michael Johnson",
        description:
          "Prepare for AWS Solutions Architect certification with real-world projects",
        image: "https://via.placeholder.com/400x300?text=AWS+Cloud",
        price: 139.99,
        status: "approved",
        totalEnrolled: 1980,
        availableSeats: 35,
        duration: "14 weeks",
        level: "Advanced",
        category: "Cloud Computing",
        students: 1980,
        rating: 4.8,
        reviews: 645,
      },
      {
        className: "Python-DataViz",
        title: "Python for Data Analysis & Visualization",
        instructorEmail: "james.chen@example.com",
        instructorName: "Prof. James Chen",
        description:
          "Master Python, Pandas, NumPy, and create stunning data visualizations",
        image: "https://via.placeholder.com/400x300?text=Python+Data",
        price: 99.99,
        status: "approved",
        totalEnrolled: 3670,
        availableSeats: 50,
        duration: "12 weeks",
        level: "Intermediate",
        category: "Data Science",
        students: 3670,
        rating: 4.8,
        reviews: 1100,
      },
      {
        className: "ReactNative-Mobile",
        title: "React Native: Build iOS & Android Apps",
        instructorEmail: "lisa.wang@example.com",
        instructorName: "Lisa Wang",
        description:
          "Create cross-platform mobile apps using React Native with real projects",
        image: "https://via.placeholder.com/400x300?text=React+Native",
        price: 119.99,
        status: "approved",
        totalEnrolled: 2150,
        availableSeats: 45,
        duration: "14 weeks",
        level: "Intermediate",
        category: "Mobile Development",
        students: 2150,
        rating: 4.7,
        reviews: 523,
      },
      {
        className: "Docker-K8s-DevOps",
        title: "Docker & Kubernetes for DevOps",
        instructorEmail: "michael.johnson@example.com",
        instructorName: "Michael Johnson",
        description:
          "Master containerization and orchestration with Docker and Kubernetes",
        image: "https://via.placeholder.com/400x300?text=Docker+K8s",
        price: 109.99,
        status: "approved",
        totalEnrolled: 1740,
        availableSeats: 40,
        duration: "11 weeks",
        level: "Advanced",
        category: "DevOps",
        students: 1740,
        rating: 4.8,
        reviews: 580,
      },
      {
        className: "JavaScript-Complete-2024",
        title: "The Complete JavaScript Course 2024",
        instructorEmail: "sarah.mitchell@example.com",
        instructorName: "Dr. Sarah Mitchell",
        description:
          "From basics to advanced: ES6+, async programming, and modern patterns",
        image: "https://via.placeholder.com/400x300?text=JavaScript",
        price: 94.99,
        status: "approved",
        totalEnrolled: 5320,
        availableSeats: 100,
        duration: "10 weeks",
        level: "Beginner to Intermediate",
        category: "Web Development",
        students: 5320,
        rating: 4.9,
        reviews: 1890,
      },
      {
        className: "CSS-Responsive-Advanced",
        title: "Advanced CSS & Responsive Design",
        instructorEmail: "emily.rodriguez@example.com",
        instructorName: "Emily Rodriguez",
        description:
          "Master CSS Grid, Flexbox, animations, and create beautiful responsive websites",
        image: "https://via.placeholder.com/400x300?text=CSS+Design",
        price: 79.99,
        status: "approved",
        totalEnrolled: 2890,
        availableSeats: 75,
        duration: "8 weeks",
        level: "Intermediate",
        category: "Web Development",
        students: 2890,
        rating: 4.8,
        reviews: 912,
      },
    ];

    // Insert instructors
    console.log("\n📝 Inserting Instructors...");
    const instructorResult = await UserCollection.insertMany(instructors);
    console.log(`✅ ${instructorResult.insertedCount} instructors added`);
    instructors.forEach((instructor, index) => {
      console.log(`   ${index + 1}. ${instructor.name} (${instructor.email})`);
    });

    // Insert classes
    console.log("\n📚 Inserting Classes...");
    const classResult = await ClassesCollection.insertMany(classes);
    console.log(`✅ ${classResult.insertedCount} classes added`);
    classes.forEach((cls, index) => {
      console.log(`   ${index + 1}. ${cls.title} - $${cls.price}`);
    });

    // Summary Statistics
    console.log("\n📊 Database Summary:");
    const totalUsers = await UserCollection.countDocuments({});
    const totalClasses = await ClassesCollection.countDocuments({});
    const totalEnrolled = classes.reduce(
      (sum, cls) => sum + cls.totalEnrolled,
      0,
    );
    const totalRevenue = classes.reduce(
      (sum, cls) => sum + cls.price * cls.totalEnrolled,
      0,
    );

    console.log(`   Total Users: ${totalUsers}`);
    console.log(`   Total Classes: ${totalClasses}`);
    console.log(`   Total Enrollments: ${totalEnrolled}`);
    console.log(`   Estimated Revenue: $${totalRevenue.toFixed(2)}`);

    console.log("\n✨ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();
