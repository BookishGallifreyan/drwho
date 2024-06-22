import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const db = new pg.Pool({
  connectionString: process.env.DB_CONNECTION,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("You found my root route! on a saturday");
});

//Shows the list of villains
app.get("/villains", async (req, res) => {
  const result = await db.query(`SELECT
   doctor_who_villains.name,
   ARRAY_AGG(the_doctor_and_their_companions.name) AS companions
   FROM
   doctor_who_villains
   LEFT JOIN
   hero_villain_encounters ON doctor_who_villains.id = hero_villain_encounters.villains_id
   LEFT JOIN
   the_doctor_and_their_companions ON the_doctor_and_their_companions.id = hero_villain_encounters.companion_id
   group by doctor_who_villains.id`);

  res.json(result.rows);
});

//Let's people put in monsters they spot?

app.post("/doctor_who_villains", async (req, res) => {
  const { name, first_appearance } = req.body;
  console.log("REQUEST BODY:", req.body);

  const result = await db.query(
    `INSERT INTO doctor_who_villains (name, first_appearance) VALUES ($1, $2)`,
    [name, first_appearance]
  );
  res.json({ recordInserted: result });
});

app.listen("8080", () => {
  console.log("The 8080 gremlin is all ears!");
});
