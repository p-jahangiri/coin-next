export interface getResponseUsersDataType {
    id: number;
    person_id: number;
    role_id: number;
    username: string;
    active: number;
    online: number;
    created_at: string;
    updated_at: string;
    lastLogon?: null;
    lastPasswordChange?: null;
    logonCount: number;
    lastsession_ip?: null;
}
