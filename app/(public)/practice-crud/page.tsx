'use client'
import {useState, useEffect} from 'react'

const metadata = {
  title: "Contact Us",
  description: "Please Get In Touch Width Us",
};


export default function PracticeCrud() {

  interface Product {
    id: number | string;
    name: string;
    price: number;
    description: string,
    stock: number;
  }
    

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: ''
  })


  const handleChange = (e: any) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  // READ - Fetch products on page load
  useEffect(()=> {
    fecthProducts()
  }, [])

  const fecthProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data) // saving product data to Products variable
      console.log(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }



  const updateProduct = async (e: any) => {

  }

  const createProduct = async (e: any) => {
    
  }



    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-4xl font-bold">Lets Practice Crud</h1>
       
            <div className="mainContainer">

              <form onSubmit={editingId ? updateProduct : createProduct} >

                <input 
                  type="text"
                  name="name"
                  placeholder="Enter Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </form>



              <div>
                <h2>Product List</h2>

                { loading ? (
                    <p>Loading...</p>
                  ) : products.length === 0 ? (
                    <p>No Products Found. Add some!</p>
                  ) : (
                    <div className="listProducts">
                      <div className="grid grid-cols-4 gap-4 text-lg font-medium">
                        <div>Product Name</div>
                        <div>Price</div>
                        <div>Description</div>
                        <div>Stock</div>
                      </div>
                      { products.map((product) => (
                        <div key={product.id} className='grid grid-cols-4 gap-4'>
                          <div>{product.name}</div>
                          <div>{product.price}</div>
                          <div>{product.description}</div>
                          <div>{product.stock}</div>
                        </div>

                      ))
                         
                      }


                    </div>
                  )
                }
                
              </div>
            </div>
        </main>
    );
}