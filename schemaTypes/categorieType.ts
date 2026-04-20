// schemaTypes/categorieType.ts
import { defineField, defineType } from 'sanity'

export const categorieType = defineType({
  name: 'categorie',
  title: 'Catégorie',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],

  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
})