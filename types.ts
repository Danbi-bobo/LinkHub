
export enum LinkStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    ARCHIVED = 'archived',
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

export enum LinkVisibility {
    PUBLIC = 'public',
    DEPARTMENT = 'department',
    TEAM = 'team',
    PROJECT = 'project',
    PRIVATE = 'private',
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: UserRole;
    departmentId: string;
    teamId: string;
}

export interface Department {
    id: string;
    name: string;
    parentId?: string;
}

export interface Project {
    id: string;
    name: string;
}

export interface Team {
    id: string;
    name: string;
    departmentId?: string;
    projectId?: string;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
}

export interface Link {
    id: string;
    title: string;
    url: string;
    shortUrl: string;
    description: string;
    status: LinkStatus;
    clicks: number;
    creatorId: string;
    categoryId: string;
    createdAt: Date;
    tags?: string[];
    approvedAt?: Date;
    ttl?: Date;
    maxClicks?: number;
    visibility: LinkVisibility;
    allowedDepartmentIds?: string[];
    allowedTeamIds?: string[];
    allowedProjectIds?: string[];
    allowedUserIds?: string[];
}

export interface ClickLog {
    id: string;
    linkId: string;
    userId: string;
    timestamp: Date;
}

export interface AuditLog {
    id: string;
    action: string;
    userId: string;
    timestamp: Date;
    details: Record<string, any>;
}

export interface Notification {
    id: string;
    message: string;
    read: boolean;
    createdAt: Date;
}