
import { User, Link, Category, Department, Team, ClickLog, UserRole, LinkStatus, LinkVisibility, Project } from './types';

export const MOCK_USERS: User[] = [
    { id: 'user-1', name: 'Alex Johnson', email: 'alex.j@company.com', avatar: 'https://picsum.photos/seed/alex/100/100', role: UserRole.ADMIN, departmentId: 'dept-1', teamId: 'team-1' },
    { id: 'user-2', name: 'Maria Garcia', email: 'maria.g@company.com', avatar: 'https://picsum.photos/seed/maria/100/100', role: UserRole.USER, departmentId: 'dept-1', teamId: 'team-2' },
    { id: 'user-3', name: 'Chen Wei', email: 'chen.w@company.com', avatar: 'https://picsum.photos/seed/chen/100/100', role: UserRole.USER, departmentId: 'dept-2', teamId: 'team-3' },
];

export const MOCK_CATEGORIES: Category[] = [
    { id: 'cat-1', name: 'Engineering', icon: '💻' },
    { id: 'cat-2', name: 'Marketing', icon: '📈' },
    { id: 'cat-3', name: 'HR', icon: '👥' },
    { id: 'cat-4', name: 'Design', icon: '🎨' },
];

export const MOCK_DEPARTMENTS: Department[] = [
    { id: 'dept-1', name: 'Technology' },
    { id: 'dept-1-1', name: 'Platform Engineering', parentId: 'dept-1' },
    { id: 'dept-2', name: 'Business' },
    { id: 'dept-3', name: 'Operations' },
];

export const MOCK_PROJECTS: Project[] = [
    { id: 'proj-1', name: 'Project Phoenix' },
    { id: 'proj-2', name: 'Project Titan' },
];

export const MOCK_TEAMS: Team[] = [
    { id: 'team-1', name: 'Frontend', departmentId: 'dept-1-1' },
    { id: 'team-2', name: 'Backend', departmentId: 'dept-1-1' },
    { id: 'team-3', name: 'Sales', departmentId: 'dept-2' },
    { id: 'team-4', name: 'Core UX', projectId: 'proj-1' },
    { id: 'team-5', name: 'Data Analytics', projectId: 'proj-2' },
];

export const MOCK_LINKS: Link[] = [
    { id: 'link-1', title: 'React Documentation', url: 'https://react.dev/', shortUrl: 'lh.co/react', description: 'The official documentation for the React library.', status: LinkStatus.APPROVED, clicks: 1258, creatorId: 'user-1', categoryId: 'cat-1', createdAt: new Date('2024-05-20T10:00:00Z'), visibility: LinkVisibility.PUBLIC, tags: ['react', 'docs', 'frontend'] },
    { id: 'link-2', title: 'Figma Design System', url: 'https://figma.com/design-system', shortUrl: 'lh.co/figma', description: 'Our company-wide design system and component library.', status: LinkStatus.APPROVED, clicks: 873, creatorId: 'user-2', categoryId: 'cat-4', createdAt: new Date('2024-05-19T14:30:00Z'), visibility: LinkVisibility.PUBLIC, tags: ['design', 'ui', 'ux'] },
    { id: 'link-3', title: 'Q2 Marketing Plan', url: 'https://docs.google.com/spreadsheets/12345', shortUrl: 'lh.co/q2plan', description: 'Strategic plan and budget for the upcoming quarter.', status: LinkStatus.APPROVED, clicks: 450, creatorId: 'user-2', categoryId: 'cat-2', createdAt: new Date('2024-05-18T09:00:00Z'), visibility: LinkVisibility.DEPARTMENT, allowedDepartmentIds: ['dept-2'], tags: ['marketing', 'planning', 'budget'] },
    { id: 'link-4', title: 'Employee Handbook', url: 'https://notion.so/handbook', shortUrl: 'lh.co/handbook', description: 'Policies, benefits, and company culture.', status: LinkStatus.APPROVED, clicks: 2310, creatorId: 'user-3', categoryId: 'cat-3', createdAt: new Date('2024-05-15T11:00:00Z'), visibility: LinkVisibility.PUBLIC, tags: ['hr', 'policy'] },
    { id: 'link-5', title: 'New Staging Server IP', url: '#', shortUrl: 'lh.co/staging', description: 'IP address for the new staging environment. Pending review.', status: LinkStatus.PENDING, clicks: 0, creatorId: 'user-1', categoryId: 'cat-1', createdAt: new Date('2024-05-21T15:00:00Z'), visibility: LinkVisibility.TEAM, allowedTeamIds: ['team-1', 'team-2'], tags: ['infra', 'staging'] },
    { id: 'link-6', title: 'Old Project Proposal', url: '#', shortUrl: 'lh.co/oldprop', description: 'Rejected due to budget constraints.', status: LinkStatus.REJECTED, clicks: 0, creatorId: 'user-3', categoryId: 'cat-2', createdAt: new Date('2024-04-10T12:00:00Z'), visibility: LinkVisibility.PRIVATE, allowedUserIds: ['user-3'] },
    { id: 'link-7', title: 'Project Phoenix Roadmap', url: 'https://jira.com/phoenix-roadmap', shortUrl: 'lh.co/phoenix', description: 'High-level roadmap for Project Phoenix.', status: LinkStatus.APPROVED, clicks: 150, creatorId: 'user-1', categoryId: 'cat-1', createdAt: new Date('2024-05-22T10:00:00Z'), visibility: LinkVisibility.PROJECT, allowedProjectIds: ['proj-1'], tags: ['project', 'roadmap'] },
    { id: 'link-8', title: 'API Gateway Specs', url: 'https://swagger.io/api-gateway', shortUrl: 'lh.co/apispec', description: 'OpenAPI specification for the new API gateway.', status: LinkStatus.APPROVED, clicks: 302, creatorId: 'user-1', categoryId: 'cat-1', createdAt: new Date('2024-05-23T11:00:00Z'), visibility: LinkVisibility.TEAM, allowedTeamIds: ['team-2'], tags: ['api', 'backend', 'docs'] },
    { id: 'link-9', title: 'Security Audit Checklist', url: 'https://docs.google.com/doc/sec-audit', shortUrl: 'lh.co/secaudit', description: 'Checklist for the upcoming Q3 security audit.', status: LinkStatus.APPROVED, clicks: 98, creatorId: 'user-1', categoryId: 'cat-1', createdAt: new Date('2024-05-24T09:30:00Z'), visibility: LinkVisibility.DEPARTMENT, allowedDepartmentIds: ['dept-1'], tags: ['security', 'audit'] },
    { id: 'link-10', title: 'Onboarding Guide for New Devs', url: 'https://notion.so/dev-onboarding', shortUrl: 'lh.co/devboard', description: 'A complete guide for new software engineers joining the team.', status: LinkStatus.APPROVED, clicks: 541, creatorId: 'user-1', categoryId: 'cat-1', createdAt: new Date('2024-05-14T16:00:00Z'), visibility: LinkVisibility.TEAM, allowedTeamIds: ['team-1', 'team-2'], tags: ['onboarding', 'docs'] },
    { id: 'link-11', title: 'Q3 OKRs Brainstorm', url: 'https://miro.com/q3-okrs', shortUrl: 'lh.co/q3okrs', description: 'Miro board for Q3 Objective and Key Results brainstorming.', status: LinkStatus.APPROVED, clicks: 76, creatorId: 'user-1', categoryId: 'cat-3', createdAt: new Date('2024-05-13T10:00:00Z'), visibility: LinkVisibility.DEPARTMENT, allowedDepartmentIds: ['dept-1'], tags: ['planning', 'okr'] },
    { id: 'link-12', title: 'Component Library Storybook', url: 'https://storybook.js.org/docs', shortUrl: 'lh.co/storybook', description: 'Storybook instance for our internal component library.', status: LinkStatus.APPROVED, clicks: 233, creatorId: 'user-1', categoryId: 'cat-4', createdAt: new Date('2024-05-12T13:00:00Z'), visibility: LinkVisibility.PUBLIC, tags: ['storybook', 'frontend', 'ui'] },
    { id: 'link-13', title: 'Post-Mortem: May 10th Outage', url: 'https://docs.google.com/doc/outage-pm', shortUrl: 'lh.co/may10pm', description: 'Root cause analysis and action items from the May 10th production outage.', status: LinkStatus.APPROVED, clicks: 189, creatorId: 'user-1', categoryId: 'cat-1', createdAt: new Date('2024-05-11T18:00:00Z'), visibility: LinkVisibility.DEPARTMENT, allowedDepartmentIds: ['dept-1-1'], tags: ['postmortem', 'incident'] },
    { id: 'link-14', title: 'Frontend Performance Budget', url: 'https://docs.google.com/sheet/perf-budget', shortUrl: 'lh.co/perfbud', description: 'Performance budget and metrics for the web application.', status: LinkStatus.PENDING, clicks: 0, creatorId: 'user-1', categoryId: 'cat-1', createdAt: new Date('2024-05-25T10:00:00Z'), visibility: LinkVisibility.TEAM, allowedTeamIds: ['team-1'], tags: ['performance', 'frontend'] },
    { id: 'link-15', title: 'CI/CD Pipeline Visualization', url: 'https://jenkins.io/pipeline', shortUrl: 'lh.co/cicd', description: 'Link to the CI/CD pipeline visualization tool.', status: LinkStatus.APPROVED, clicks: 412, creatorId: 'user-1', categoryId: 'cat-1', createdAt: new Date('2024-05-09T11:00:00Z'), visibility: LinkVisibility.TEAM, allowedTeamIds: ['team-1', 'team-2'], tags: ['devops', 'ci-cd'] },
    { id: 'link-16', title: 'User Interview Recordings', url: 'https://lookback.io/interviews', shortUrl: 'lh.co/interviews', description: 'Recordings from the latest user research interviews.', status: LinkStatus.APPROVED, clicks: 65, creatorId: 'user-1', categoryId: 'cat-4', createdAt: new Date('2024-05-08T15:00:00Z'), visibility: LinkVisibility.TEAM, allowedTeamIds: ['team-4'], tags: ['ux', 'research'] },
    { id: 'link-17', title: 'Internal Tooling Ideas', url: 'https://docs.google.com/doc/tooling-ideas', shortUrl: 'lh.co/tooling', description: 'A document for collecting ideas for internal developer tools.', status: LinkStatus.APPROVED, clicks: 39, creatorId: 'user-1', categoryId: 'cat-1', createdAt: new Date('2024-05-07T14:00:00Z'), visibility: LinkVisibility.DEPARTMENT, allowedDepartmentIds: ['dept-1-1'], tags: ['dev-tools', 'ideas'] },
];

export const MOCK_CLICK_LOGS: ClickLog[] = Array.from({ length: 500 }, (_, i) => {
    const link = MOCK_LINKS[Math.floor(Math.random() * MOCK_LINKS.filter(l => l.status === 'approved').length)];
    const user = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    return {
        id: `click-${i}`,
        linkId: link.id,
        userId: user.id,
        timestamp: date
    }
});
