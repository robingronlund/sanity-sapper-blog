export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5eaa977cbf43eabda94f0201',
                  title: 'Sanity Studio',
                  name: 'sanity-sapper-blog-studio-y86tn82k',
                  apiId: '6fa602b0-3e69-4415-8ee3-6cdadf08eb4f'
                },
                {
                  buildHookId: '5eaa977c247691f5c445ef1a',
                  title: 'Blog Website',
                  name: 'sanity-sapper-blog-web-cuyjgrk4',
                  apiId: '80e95402-617e-49be-ac38-47b25badb5f5'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/robingronlund/sanity-sapper-blog',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-sapper-blog-web-cuyjgrk4.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
