const projectsData = [
  {
    title: 'AsyncAPI',
    description: `Open-Source tools to easily build and maintain your event-driven architecture. All powered by the AsyncAPI specification, the industry standard for defining asynchronous APIs. I'm actively maintaining several projects and build community.`,
    imgSrc: '/static/images/asyncapi.png',
    href: 'https://www.asyncapi.com/',
  },
  {
    title: 'GitHub Action to Analyze Sentiments',
    description: `GitHub Action that can be used in a workflow that listens to every single comment and checks the sensitivity of the message. In theory it helps to moderate community at scale and react on negative abusive comments before somebody manually reports them.`,
    href: 'https://github.com/derberg/code-of-conduct-sentiment-analysis-github-action',
  },
  {
    title: 'GitHub Action to support Global Workflows',
    description: `GitHub Action that introduces support for global workflows. Global workflows are the one you update in just one repo and they are automatically updated in other repositories.`,
    href: 'https://github.com/derberg/global-workflows-support',
  },
  {
    title: 'GitHub Action to Auto-bump NPM Dependencies',
    description: `GitHub Action that handles automated update of dependencies in package.json between projects from the same GitHub organization. If you use it, you have no more excuses for doing monorepo.`,
    href: 'https://github.com/derberg/npm-dependency-manager-for-your-github-org',
  },
]

export default projectsData
