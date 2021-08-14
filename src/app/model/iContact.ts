import { iContact } from '../component/iContact.interface'

export class contact implements iContact
{
        _id!: any;
        _firs_name!: string;
        _last_name!: string;
        _country!: string;
        _content!: string;
}