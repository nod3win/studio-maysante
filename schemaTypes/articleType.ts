// schemaTypes/articleType.ts
import { defineField, defineType } from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Brouillon', value: 'draft' },
          { title: 'Publié',    value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      hidden: ({ document }) => document?.status !== 'published',
    }),

    defineField({
      name: 'auteur',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'auteur' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categorie' }] }],
    }),

    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'excerpt',
      title: 'Résumé',
      type: 'text',
      rows: 3,
      description: 'Affiché dans les listes et les aperçus. Max 200 caractères.',
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Légende',
            }),
          ],
        },
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta title',
          type: 'string',
          description: 'Laissez vide pour utiliser le titre de l\'article.',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta description',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'Image Open Graph',
          type: 'image',
          description: 'Laissez vide pour utiliser l\'image de couverture.',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'auteur.name',
      media: 'coverImage',
      status: 'status',
    },
    prepare({ title, author, media, status }) {
      return {
        title,
        subtitle: `${status === 'published' ? '✅' : '✏️'}  ${author ?? 'Sans auteur'}`,
        media,
      }
    },
  },
})