ALTER TABLE "comment" ADD COLUMN "parrentId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_parrentId_comment_id_fk" FOREIGN KEY ("parrentId") REFERENCES "public"."comment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
