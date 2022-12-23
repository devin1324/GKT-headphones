import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  
  const foundProduct = useRef();
  const index = useRef();

  //   Add a product to the cart
  const onAdd = useCallback(
    (product, quantity) => {
      const checkProductInCart = cartItems.find(
        (item) => item._id === product._id
      );

      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity
      );
      setTotalQuantities((prevTotalQuantites) => prevTotalQuantites + quantity);

      if (checkProductInCart) {
        const updateCartItems = cartItems.map((cartProduct) => {
          if (cartProduct._id === product._id)
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
        });

        setCartItems(updateCartItems);
      } else {
        product.quantity = quantity;

        setCartItems([...cartItems, { ...product }]);
      }

      toast.success(`${qty} ${product.name} added to the bcart`);
    },
    [cartItems, qty]
  );

  // Remove a product to the cart

  const onRemove = useCallback(
    (product) => {
      foundProduct.current = cartItems.find((item) => item._id === product._id);
      const newCartItems = cartItems.filter((item) => item._id !== product._id);

      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice -
          foundProduct.current.price * foundProduct.current.quantity
      );

      setTotalQuantities(
        (prevTotalQuantites) =>
          prevTotalQuantites - foundProduct.current.quantity
      );

      setCartItems(newCartItems);
    },
    [cartItems]
  );

  // Update the quantity of specific product
  const toogleCartItemQuantity = useCallback(
    (id, value) => {
      foundProduct.current = cartItems.find((item) => item._id === id);
      index.current = cartItems.findIndex((product) => product._id === id);
      const newCartItems = cartItems.filter((item) => item._id !== id);

      if (value === 'inc') {
        setCartItems([
          ...newCartItems,
          {
            ...foundProduct.current,
            quantity: foundProduct.current.quantity + 1,
          },
        ]);
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice + foundProduct.current.price
        );

        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      } else if (value === 'dec') {
        if (foundProduct.current.quantity > 1) {
          setCartItems([
            ...newCartItems,
            {
              ...foundProduct.current,
              quantity: foundProduct.current.quantity - 1,
            },
          ]);
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice - foundProduct.current.price
          );
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        }
      }
    },
    [cartItems]
  );

  //   Increment of quantity
  const incQty = useCallback(() => {
    setQty((prevQty) => prevQty + 1);
  }, []);

  //   Decrement of quantity
  const decQty = useCallback(() => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  }, []);

  const value = useMemo(
    () => ({
      showCart,
      cartItems,
      totalPrice,
      totalQuantities,
      qty,
      incQty,
      decQty,
      onAdd,
      setShowCart,
      toogleCartItemQuantity,
      onRemove,
    }),
    [
      showCart,
      cartItems,
      totalPrice,
      totalQuantities,
      qty,
      incQty,
      decQty,
      onAdd,
      setShowCart,
      toogleCartItemQuantity,
      onRemove,
    ]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useStateContext = () => useContext(Context);
