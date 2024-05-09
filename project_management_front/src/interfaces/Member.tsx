export interface Member {
    member_id?: number;
    member_name?: string;
    role?: string;
    project_id?: number;
}


export interface MemberTeam {
    project_id?: number;
    project_name?: string;
    members?: Member[]
}

