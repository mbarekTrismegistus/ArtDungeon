import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';


export const users = pgTable('users', {
    id: serial('id').primaryKey({autoIncrement: true}),
    username: varchar('username', { length: 256 }).notNull().unique(),
    email: varchar('email').notNull().unique(),
    password: text('password'),
    image: varchar('image')
});


export const art = pgTable('art',{
    id: serial('id').primaryKey({autoIncrement: true}),
    title: text('title').notNull(),
    description: text('description').notNull(),
    media: varchar('media').array(),
    postedAt: timestamp('postedAt').defaultNow(),
    tags: varchar('tags').array(),
    userId: integer('userId').references(() => users.id)
})

export const like = pgTable('like', {
    id: serial('id').primaryKey({autoIncrement: true}),
    artId: integer('artId').references(() => art.id),
    userId: integer('userId').references(() => users.id)

})

export const comment = pgTable('comment', {
    id: serial('id').primaryKey({autoIncrement: true}),
    content: text('content').notNull(),
    commentedAt: timestamp('commentedAt').defaultNow(),
    artId: integer('artId').references(() => art.id),
    userId: integer('userId').references(() => users.id)
})

export const artRelations = relations(art, ({ one, many  }) => ({
    user: one(users, {
      fields: [art.userId],
      references: [users.id],
    }),
    like: many(like),
    comment: many(comment)
}));

export const likeRelations = relations(like, ({ one }) => ({
    user: one(users, {
        fields: [like.userId],
        references: [users.id],
    }),
    art: one(art, {
        fields: [like.artId],
        references: [art.id],
    }),
}))

export const commentRelations = relations(comment, ({ one }) => ({
    user: one(users, {
        fields: [like.userId],
        references: [users.id],
    }),
    art: one(art, {
        fields: [like.artId],
        references: [art.id],
    }),
}))




export const usersRelations = relations(users, ({ many }) => ({
    arts: many(art),
    likes: many(like),
    comment: many(comment)
}))