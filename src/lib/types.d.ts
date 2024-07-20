export type UserInfo = {
    uid:string,
    name:string,
    email:string
};

export type ErrorMessage = {
    error: string|{}
};

export type SelType ='Text'|'Subtitle'|'Img'|'Latex';

export type AreaType = {
    [key:number]:
    {
        father:number,
        cont:{
            sel:SelType,
            content:string|string[]
        }
    }
};
