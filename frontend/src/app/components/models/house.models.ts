export interface house{
    fkCreator:number,
    id:number,
    name:string,
    image:File | string, 
    desc:string,
    m2:number,
    house_type:houseType,
    rooms:number,
    ciudad:string,
    barrio:string,
    calle:string,
    portal:number,
    price:number, 
    rooms_data:rooms[],
    latitud:number,
    longitud:number,
    petsAllowed:boolean,
    smokersAllowed:boolean,
    house_requests:HouseRequests[]|null
}

export interface rooms{
    id:number,
    m2:number, 
    desc:string,
    image:File | string,
    price:number,
    room_requests:RoomRequests[]|null
}

export interface HouseRequests{
    accepted:null,
    fkHouse:number,
    fkTenant:number
    pk:number
}
export interface RoomRequests{
    accepted:null,
    fkRoom:number,
    fkTenant:number
    pk:number
}


export enum houseType{
    Apartment = "Apartment",
    House = "House",
    Villa = "Villa", 
    Studio = "Studio", 
    Duplex = "Duplex"
}

