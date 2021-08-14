import { iProjects } from '../component/iProjects.interface'

export class project implements iProjects{
        _id !: any;
        _name !: string;
        _git_link !: string;
        _description !: string;
} 