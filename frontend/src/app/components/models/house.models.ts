export interface house{
    name:string,
    image:File, 
    desc:string,
    m2:number,
    house_type:houseType,
    rooms:number,
    ciudad:string,
    barrio:string,
    calle:string,
    portal:number,
    direccion:string,
    price:number 

}

export interface rooms{
    m2:number, 
    desc:string,
    image:File,
    price:number,
}



export enum houseType{
    Apartment = "Apartment",
    House = "House",
    Villa = "Villa", 
    Studio = "Studio", 
    Duplex = "Duplex"
}

