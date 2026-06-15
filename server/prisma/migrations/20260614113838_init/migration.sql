-- CreateEnum
CREATE TYPE "ReviewSource" AS ENUM ('TMDB', 'Local');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('Local', 'Google', 'Apple');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('Movie', 'TV');

-- CreateEnum
CREATE TYPE "VideoSite" AS ENUM ('YouTube', 'Vimeo');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('Poster', 'Backdrop');

-- CreateEnum
CREATE TYPE "CreditType" AS ENUM ('Cast', 'Crew');

-- CreateEnum
CREATE TYPE "WatchProviderType" AS ENUM ('flatrate', 'rent', 'buy', 'free');

-- CreateEnum
CREATE TYPE "DiscoverType" AS ENUM ('TRENDING', 'POPULAR', 'TOP_RATED', 'NOW_PLAYING', 'UPCOMING', 'ACTION');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "bio" TEXT,
    "provider" "Provider" NOT NULL DEFAULT 'Local',
    "is_verify" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avatar" (
    "url" TEXT NOT NULL,
    "public_id" TEXT,
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Title" (
    "id" TEXT NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "media_type" "MediaType" NOT NULL,
    "title" TEXT NOT NULL,
    "original_title" TEXT,
    "original_language" TEXT,
    "overview" TEXT,
    "tagline" TEXT,
    "homepage" TEXT,
    "imdb_id" TEXT,
    "poster_path" TEXT,
    "backdrop_path" TEXT,
    "popularity" DOUBLE PRECISION NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "adult" BOOLEAN NOT NULL DEFAULT false,
    "release_date" TIMESTAMP(3),
    "runtime" INTEGER,
    "status" TEXT,
    "number_of_seasons" INTEGER,
    "number_of_episodes" INTEGER,
    "in_production" BOOLEAN,
    "collectionId" TEXT,
    "last_synced_at" TIMESTAMP(3),
    "tmdb_updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscoverItem" (
    "id" SERIAL NOT NULL,
    "type" "DiscoverType" NOT NULL,
    "rank" INTEGER NOT NULL,
    "titleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiscoverItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleImage" (
    "id" TEXT NOT NULL,
    "type" "ImageType" NOT NULL,
    "file_path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "aspect_ratio" DOUBLE PRECISION,
    "title_id" TEXT NOT NULL,

    CONSTRAINT "TitleImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleVideo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER,
    "site" "VideoSite" NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "title_id" TEXT NOT NULL,

    CONSTRAINT "TitleVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "tmdb_review_id" TEXT,
    "title_id" TEXT NOT NULL,
    "user_id" TEXT,
    "source" "ReviewSource" NOT NULL,
    "name" TEXT,
    "avatar_path" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleGenre" (
    "title_id" TEXT NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "TitleGenre_pkey" PRIMARY KEY ("title_id","genre_id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "biography" TEXT,
    "birthday" TIMESTAMP(3),
    "popularity" DOUBLE PRECISION NOT NULL,
    "profile_path" TEXT,
    "known_for_department" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credit" (
    "id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "credit_type" "CreditType" NOT NULL,
    "department" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "character" TEXT,
    "order" INTEGER,

    CONSTRAINT "Credit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "user_id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("user_id","title_id")
);

-- CreateTable
CREATE TABLE "Watchlist" (
    "user_id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("user_id","title_id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "tmdb_id" INTEGER,
    "name" TEXT NOT NULL,
    "overview" TEXT,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInterest" (
    "user_id" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,

    CONSTRAINT "UserInterest_pkey" PRIMARY KEY ("user_id","genre_id")
);

-- CreateTable
CREATE TABLE "WatchProvider" (
    "id" TEXT NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "logo_path" TEXT,

    CONSTRAINT "WatchProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleWatchProvider" (
    "title_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "type" "WatchProviderType" NOT NULL,

    CONSTRAINT "TitleWatchProvider_pkey" PRIMARY KEY ("title_id","provider_id","region","type")
);

-- CreateTable
CREATE TABLE "IngestionError" (
    "id" TEXT NOT NULL,
    "title_id" TEXT,
    "tmdb_id" INTEGER,
    "media_type" "MediaType",
    "phase" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IngestionError_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_user_id_key" ON "Avatar"("user_id");

-- CreateIndex
CREATE INDEX "Title_popularity_idx" ON "Title"("popularity");

-- CreateIndex
CREATE INDEX "Title_vote_average_idx" ON "Title"("vote_average");

-- CreateIndex
CREATE INDEX "Title_release_date_idx" ON "Title"("release_date");

-- CreateIndex
CREATE INDEX "Title_last_synced_at_idx" ON "Title"("last_synced_at");

-- CreateIndex
CREATE INDEX "Title_imdb_id_idx" ON "Title"("imdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "Title_tmdb_id_media_type_key" ON "Title"("tmdb_id", "media_type");

-- CreateIndex
CREATE INDEX "DiscoverItem_type_idx" ON "DiscoverItem"("type");

-- CreateIndex
CREATE UNIQUE INDEX "DiscoverItem_type_rank_key" ON "DiscoverItem"("type", "rank");

-- CreateIndex
CREATE INDEX "TitleImage_title_id_type_idx" ON "TitleImage"("title_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Review_tmdb_review_id_key" ON "Review"("tmdb_review_id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_tmdb_id_key" ON "Genre"("tmdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "Person_tmdb_id_key" ON "Person"("tmdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "Credit_title_id_person_id_credit_type_job_character_key" ON "Credit"("title_id", "person_id", "credit_type", "job", "character");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_tmdb_id_key" ON "Collection"("tmdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "WatchProvider_tmdb_id_key" ON "WatchProvider"("tmdb_id");

-- CreateIndex
CREATE INDEX "IngestionError_phase_created_at_idx" ON "IngestionError"("phase", "created_at");

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscoverItem" ADD CONSTRAINT "DiscoverItem_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleImage" ADD CONSTRAINT "TitleImage_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleVideo" ADD CONSTRAINT "TitleVideo_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleGenre" ADD CONSTRAINT "TitleGenre_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleGenre" ADD CONSTRAINT "TitleGenre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("tmdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInterest" ADD CONSTRAINT "UserInterest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInterest" ADD CONSTRAINT "UserInterest_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleWatchProvider" ADD CONSTRAINT "TitleWatchProvider_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleWatchProvider" ADD CONSTRAINT "TitleWatchProvider_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "WatchProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
