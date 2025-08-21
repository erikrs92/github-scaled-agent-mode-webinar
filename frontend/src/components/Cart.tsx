import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { darkMode } = useTheme();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const subtotal = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <div className="mb-8">
              <svg 
                className={`mx-auto h-24 w-24 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-2H3m4 0v18a1 1 0 001 1h1a1 1 0 001-1v-1h6v1a1 1 0 001 1h1a1 1 0 001-1V3a1 1 0 00-1-1H8a1 1 0 00-1 1v0z" 
                />
              </svg>
            </div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
              Tu carrito está vacío
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 transition-colors duration-300`}>
              Añade algunos productos para comenzar tu compra
            </p>
            <a 
              href="/products" 
              className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Ver Productos
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
            Carrito de Compras
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2 transition-colors duration-300`}>
            {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden transition-colors duration-300`}>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {items.map((item) => {
                  const displayPrice = item.discount ? item.price * (1 - item.discount) : item.price;
                  const originalPrice = item.price;
                  
                  return (
                    <div key={item.productId} className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img 
                            src={`/${item.imgName}`} 
                            alt={item.name}
                            className="w-20 h-20 object-contain rounded-lg bg-gray-100 dark:bg-gray-700 p-2"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                            {item.name}
                          </h3>
                          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1 transition-colors duration-300`}>
                            SKU: {item.sku}
                          </p>
                          
                          {/* Price */}
                          <div className="mt-2 flex items-center space-x-2">
                            {item.discount ? (
                              <>
                                <span className="text-gray-500 line-through text-sm">${originalPrice.toFixed(2)}</span>
                                <span className="text-primary text-lg font-bold">${displayPrice.toFixed(2)}</span>
                                <span className="bg-primary text-white px-2 py-1 rounded text-xs">
                                  {Math.round(item.discount * 100)}% OFF
                                </span>
                              </>
                            ) : (
                              <span className="text-primary text-lg font-bold">${displayPrice.toFixed(2)}</span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-1 transition-colors duration-300`}>
                            <button 
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                              className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light hover:text-primary' : 'text-gray-700 hover:text-primary'} transition-colors duration-300`}
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <span>-</span>
                            </button>
                            <span className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center transition-colors duration-300`}>
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                              className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light hover:text-primary' : 'text-gray-700 hover:text-primary'} transition-colors duration-300`}
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <span>+</span>
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button 
                            onClick={() => handleRemoveItem(item.productId)}
                            className={`text-red-500 hover:text-red-700 text-sm transition-colors duration-300`}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            Eliminar
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <span className={`text-xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                            ${(displayPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 sticky top-24 transition-colors duration-300`}>
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
                Resumen del Pedido
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className={`flex justify-between ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={`flex justify-between ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>
                <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                <div className={`flex justify-between text-xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                  <span>Total:</span>
                  <span className="text-primary">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                className="w-full bg-primary hover:bg-accent text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                onClick={() => alert('Funcionalidad de checkout no implementada aún')}
              >
                Finalizar Compra
              </button>
              
              <button 
                className={`w-full mt-3 ${darkMode ? 'text-gray-400 hover:text-light' : 'text-gray-600 hover:text-gray-800'} font-medium py-2 transition-colors duration-300`}
                onClick={() => window.history.back()}
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}