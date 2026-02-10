const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const School = require('./models/School');
const Subject = require('./models/Subject');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data (Optional - Be careful!)
        // await Category.deleteMany();
        // await School.deleteMany();

        // 1. Seed Schools
        const schools = await School.insertMany([
            {
                name: "SMA Negeri 1 Jakarta",
                npsn: "12345678",
                schoolType: "NEGERI",
                address: { city: "Jakarta Pusat", province: "DKI Jakarta" }
            },
            {
                name: "SMA Binus Serpong",
                npsn: "87654321",
                schoolType: "SWASTA",
                address: { city: "Tangerang", province: "Banten" }
            }
        ]);
        console.log('Schools seeded!');

        // 2. Seed Categories
        const categories = await Category.insertMany([
            { name: "Sains (IPA)", code: "SCIENCE", description: "Materi fokus pada Ilmu Pengetahuan Alam" },
            { name: "Sosial (IPS)", code: "SOCIAL", description: "Materi fokus pada Ilmu Pengetahuan Sosial" },
            { name: "Bahasa", code: "LANGUAGE", description: "Materi fokus pada Kebahasaan" }
        ]);
        console.log('Categories seeded!');

        // 3. Seed Subjects (Reference first category)
        await Subject.insertMany([
            {
                name: "Matematika Arimatika",
                code: "MATH-12",
                categoryId: categories[0]._id,
                description: "Materi persiapan ujian matematika kelas 12"
            },
            {
                name: "Fisika Modern",
                code: "PHYS-12",
                categoryId: categories[0]._id,
                description: "Materi persiapan ujian fisika kelas 12"
            }
        ]);
        console.log('Subjects seeded!');

        console.log('Data seeding completed successfully!');
        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
