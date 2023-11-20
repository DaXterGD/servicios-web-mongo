import ProductsModel from './products.dao.mjs'

// función manejadora que envía los productos existentes en la base de datos
export const getProducts = async (req, res) => {
  try {
    const createdProducts = await ProductsModel.find({})
    res.status(200).json({ createdProducts })
  } catch (err) {
    res.status(500).json({ error: 'Ha ocurrido un error inesperado' })
  }
}

// función manejadora para creación de productos
export const addProduct = async (req, res) => {
  let { name, category, price, imageUrl, description } = req.body
  if (!name) {
    res.status(500).json({ message: 'Debes ingresar el nombre del producto' })
  } else if (!category) {
    res.status(500).json({ message: 'Debes ingresar la categoría del producto' })
  } else if (!price) {
    res.status(500).json({ message: 'Debes ingresar el precio del producto' })
  } else if (!imageUrl) {
    res.status(500).json({ message: 'Debes ingresar una url para la imagen' })
  } else if (!description) {
    res.status(500).json({ message: 'Debes ingresar una descripción del producto' })
  } else if (typeof price !== 'number') {
    res.status(500).json({ message: 'El precio del producto debe ser un número' })
  } else {
    price = parseInt(price)
    try {
      const productExist = await ProductsModel.findOne({ name })
      const imageExist = await ProductsModel.findOne({ imageUrl })
      if (productExist) {
        res.status(500).json({ message: 'Este producto ya existe :(' })
      } else if (imageExist) {
        res.status(500).json({ message: 'Esta imagen ya existe :(' })
      } else {
        const newProduct = new ProductsModel({ name, category, price, imageUrl, description })
        await ProductsModel.create(newProduct)
        res.status(200).json({ message: `¡Producto ${name} insertado!` })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Ha ocurrido un error inesperado' })
    }
  }
}
