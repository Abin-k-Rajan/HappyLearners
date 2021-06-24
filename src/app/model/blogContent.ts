import {IblogContent} from '../component/iblog-content'

export class blogContent implements IblogContent
{
    id!: string;
    uid!: string;
    title!: string;
    description!: string;
    content!: string;
    image_url!: string;
    code_cpp!: string;
    code_java!: string;
    code_python!: string;
    paragraph!: Array<string>;
    images!: Array<string>;
}