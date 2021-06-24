import {Iblog} from '../component/iblog.interface'

export class blog implements Iblog
{
    _id!: any;
    _title!: string;
    _description!: string;
    _image_url!: string;
    _image_desc!: string;
    _blog_name!: string;
    _content!: string;
    link_id!: string;
    _date!: Date;
    _visits!: number;
}