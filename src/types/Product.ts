export interface ProductsProps{
      products: Product[]
}

export interface CartProps{
      product: Product,
      quantity: number
}

export type Product = {
      asin: string | undefined | null,
      product_title: string,
      product_price?: string,
      product_original_price: string | undefined | null,
      currency: string | undefined | null,
      product_star_rating: string,
      product_num_ratings: number | undefined | null,
      product_url: string | undefined | null,
      product_photo: string,
      product_num_offers: number | undefined | null,
      product_minimum_offer_price: string | undefined | null,
      is_best_seller: boolean | undefined | null,
      is_amazon_choice: boolean | undefined | null,
      is_prime: boolean | undefined | null,
      climate_pledge_friendly: boolean | undefined | null,
      sales_volume: string | undefined | null,
      delivery: string | undefined | null,
      coupon_text?: string | undefined | null,
      has_variations: boolean | undefined | null,
}