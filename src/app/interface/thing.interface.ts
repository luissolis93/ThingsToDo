export interface Thing{
    ok:string,
    Things:Array<ContentThing>
}

export interface ContentThing{
    complete:boolean,
    created_Date:string,
    thing:string,
    _id:string
}