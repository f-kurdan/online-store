import { products } from "@/data";

export function getProducts(page?: number, query?: string, categoriesId?: number[], brands?: number[], color?: number[], characteristics?: string[]) {
    const productsEnd = page ? page * 12 : 12;
    const productsStart = productsEnd - 12

    let filteredProducts = [...products].reverse();

    if (categoriesId) {
        filteredProducts = filteredProducts.filter(p => categoriesId.some(id => id === p.category_id));
    }

    if (brands) {
        filteredProducts = filteredProducts.filter(p => brands.some(id => id === p.brand_id));
    }

    if (color) {
        filteredProducts = filteredProducts.filter(p => color.some(id => id === p.color_id))
    }

    if(characteristics) {
        filteredProducts = filteredProducts.filter(product => product.characteristics.some(productChar => characteristics.some(char => productChar.value.includes(char))))
    }

    if (query) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    }

    return Promise.resolve({ products: filteredProducts.slice(productsStart, productsEnd), totalProducts: filteredProducts.length })
}

export function getProduct(sku:string) {
    
    return Promise.resolve(products.find(p => p.SKU === sku))
}

export function getAllProducts() {
    return Promise.resolve(products)
}

export function getProductsByName(string: string) {
    return Promise.resolve(products.filter(p => p.name.toLowerCase().includes(string.toLowerCase())))
}