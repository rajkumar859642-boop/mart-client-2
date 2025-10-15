import ProductCards from './ProductCards'
import { shoppingData } from '../../data'

const Products = () => {
  return (
    <div className='grid md:grid-cols-4 gap-1 p-1 grid-cols-2 md:p-20 md:gap-5'>
      {shoppingData.map((value) => {
        return (<>

          <ProductCards value={value} />
        </>)
      })}
    </div>
  )
}

export default Products