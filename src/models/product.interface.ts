export interface Product {
    name: string
    desc: string
    price: number
    stock: number
    mrp: number
    images: File
    active?: boolean
}

export interface IProducts {
    _id?: string,
    product: Product
}