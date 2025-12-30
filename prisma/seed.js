const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({
  adapter,
});

const movies = [
  {
    id: "e2a3b1c4-d5e6-4f7g-8h9i-0j1k2l3m4n5o",
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Adventure"],
    runtime: 148,
    posterUrl: "https://images.example.com/inception.jpg",
    createdBy: "35517960-4188-4990-bc18-c2a6c98670cf",
    createdAt: "2024-01-15T08:30:00.000Z",
  },
  {
    id: "f1g2h3i4-j5k6-4l7m-8n9o-0p1q2r3s4t5u",
    title: "The Shawshank Redemption",
    overview:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseYear: 1994,
    genres: ["Drama"],
    runtime: 142,
    posterUrl: "https://images.example.com/shawshank.jpg",
    createdBy: "35517960-4188-4990-bc18-c2a6c98670cf",
    createdAt: "2024-01-15T09:00:00.000Z",
  },
  {
    id: "a1b2c3d4-e5f6-4g7h-8i9j-0k1l2m3n4o5p",
    title: "Everything Everywhere All at Once",
    overview:
      "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes.",
    releaseYear: 2022,
    genres: ["Action", "Adventure", "Sci-Fi"],
    runtime: 139,
    posterUrl: "https://images.example.com/eeaao.jpg",
    createdBy: "35517960-4188-4990-bc18-c2a6c98670cf",
    createdAt: "2024-01-15T09:15:00.000Z",
  },
  {
    id: "b2c3d4e5-f6g7-4h8i-9j0k-1l2m3n4o5p6q",
    title: "The Godfather",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseYear: 1972,
    genres: ["Crime", "Drama"],
    runtime: 175,
    posterUrl: "https://images.example.com/godfather.jpg",
    createdBy: "35517960-4188-4990-bc18-c2a6c98670cf",
    createdAt: "2024-01-15T10:00:00.000Z",
  },
  {
    id: "c3d4e5f6-g7h8-4i9j-0k1l-2m3n4o5p6q7r",
    title: "Parasite",
    overview:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    releaseYear: 2019,
    genres: ["Drama", "Thriller", "Comedy"],
    runtime: 132,
    posterUrl: "https://images.example.com/parasite.jpg",
    createdBy: "35517960-4188-4990-bc18-c2a6c98670cf",
    createdAt: "2024-01-15T10:30:00.000Z",
  },
  {
    id: "d4e5f6g7-h8i9-4j0k-1l2m-3n4o5p6q7r8s",
    title: "The Matrix",
    overview:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    releaseYear: 1999,
    genres: ["Action", "Sci-Fi"],
    runtime: 136,
    posterUrl: "https://images.example.com/matrix.jpg",
    createdBy: "35517960-4188-4990-bc18-c2a6c98670cf",
    createdAt: "2024-01-15T11:00:00.000Z",
  },
  {
    id: "e5f6g7h8-i9j0-4k1l-2m3n-4o5p6q7r8s9t",
    title: "Spider-Man: Into the Spider-Verse",
    overview:
      "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    releaseYear: 2018,
    genres: ["Animation", "Action", "Adventure"],
    runtime: 117,
    posterUrl: "https://images.example.com/spiderverse.jpg",
    createdBy: "35517960-4188-4990-bc18-c2a6c98670cf",
    createdAt: "2024-01-15T11:45:00.000Z",
  },
  {
    id: "f6g7h8i9-j0k1-4l2m-3n4o-5p6q7r8s9t0u",
    title: "Pulp Fiction",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    runtime: 154,
    posterUrl: "https://images.example.com/pulpfiction.jpg",
    createdBy: "35517960-4188-4990-bc18-c2a6c98670cf",
    createdAt: "2024-01-15T12:00:00.000Z",
  },
  {
    id: "g7h8i9j0-k1l2-4m3n-4o5p-6q7r8s9t0u1v",
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    posterUrl: "https://images.example.com/interstellar.jpg",
    createdBy: "35517960-4188-4990-bc18-c2a6c98670cf",
    createdAt: "2024-01-15T12:30:00.000Z",
  },
  {
    id: "h8i9j0k1-l2m3-4n4o-5p6q-7r8s9t0u1v2w",
    title: "Spirited Away",
    overview:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    releaseYear: 2001,
    genres: ["Animation", "Adventure", "Family"],
    runtime: 125,
    posterUrl: "https://images.example.com/spiritedaway.jpg",
    createdBy: "35517960-4188-4990-bc18-c2a6c98670cf",
    createdAt: "2024-01-15T13:00:00.000Z",
  },
];

const main = async () => {
  console.log("Seeding movies....");
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`created movie: ${movie.title}`);
  }
  console.log("Seeding successful");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
