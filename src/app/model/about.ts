import { iAbout } from '../component/iAbout.interface'


export class about implements iAbout
{
        _id !: any;
        _name !: string;
        _image_url !: string;
        _role !: string;
        _specialization !: string;
        _cover !: string;
}