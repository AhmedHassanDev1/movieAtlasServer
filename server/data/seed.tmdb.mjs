import axios from "axios";



import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
const TMDB_ACCESS_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjgyMTk1M2QyYWZjYTRiOTk3NTk5MjkyYzZkM2IyZSIsIm5iZiI6MTc4MDMyODAwMS4zNzQsInN1YiI6IjZhMWRhNjQxNDc4MTQ0YmQ0MDQ4MGVmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.18C94hPRm6peahlv19cRBmHOLh0dtCLOXA5x7NmIQn0"
const TMDB_API_KEY="9b821953d2afca4b997599292c6d3b2e"

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
  }
};

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  ...options,
  params:{
    api_key: TMDB_API_KEY
  }
});