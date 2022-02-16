export interface IProductItem {
    ID: number,
    Title: string,
    Price: number,
    Description: string,
    Category: string,
    Image: string,
    InStock: number,
    Rating: {Rate: number},
}

export interface ICartItem {
  ID: string,
  ProductItem: IProductItem,
  Count: number,
}