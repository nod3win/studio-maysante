// schemaTypes/auteurType.ts
import { defineField, defineType } from 'sanity'

export const auteurType = defineType({
  name: 'auteur',
  title: 'Auteur',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      description: 'Ex : Diététicienne, Médecin généraliste…',
    }),

    defineField({
      name: 'bio',
      title: 'Biographie',
      type: 'text',
      rows: 4,
    }),
  ],

  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})