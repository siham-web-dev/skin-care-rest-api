
class Product {
    id?: number
    name: string
    description: string
    ingredients: string
    how_to_use: string
    quantity: number
    price: number
    image_url: string
    companyID?: number

  constructor(
     name: string,
      description: string,
      ingredients: string,
      how_to_use: string,
      quantity: number,
      price: number,
      image_url: string,
      id?: number,
      companyID?: number
    ) {
      this.name = name
      this.description = description
      this.ingredients = ingredients
      this.how_to_use = how_to_use
      this.quantity = quantity
      this.price = price
      this.image_url = image_url
      this.id = id
      this.companyID = companyID
  }
}

export default Product;
