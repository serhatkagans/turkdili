CREATE TABLE `cards` (
	`id` text PRIMARY KEY NOT NULL,
	`wordId` text NOT NULL,
	`sentence` text NOT NULL,
	`nickname` text NOT NULL,
	`scene` text NOT NULL,
	`style` text NOT NULL,
	`image` text NOT NULL,
	`mode` text NOT NULL,
	`createdAt` integer NOT NULL,
	`approved` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `cards_gallery` ON `cards` (`approved`,`createdAt`);