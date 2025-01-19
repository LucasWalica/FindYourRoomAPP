export interface house{
    creator:number,
    id:number|null,
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
    longitud:number
}

export interface rooms{
    id:number|null,
    m2:number, 
    desc:string,
    image:File | string,
    price:number,
}



export enum houseType{
    Apartment = "Apartment",
    House = "House",
    Villa = "Villa", 
    Studio = "Studio", 
    Duplex = "Duplex"
}

