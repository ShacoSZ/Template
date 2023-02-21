export interface libros{
    id:number;
    nombre:string;
    ISBN:bigint;
    fecha_de_creacion:Date;
    autor_id:number;
    categoria_id:number;
    editorial_id:number;
    paginas:number;
    descripcion:string;
}