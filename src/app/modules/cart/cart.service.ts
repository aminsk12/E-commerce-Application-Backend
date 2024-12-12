import { Cart, CartItem, Order } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";


interface OrderData {
  email: string;
  productId: string;
  quantity: number;
}

const createCartIntoDB = async (orderData: OrderData) => {
  const { email, productId, quantity } = orderData;

  // Ensure the product exists
  const product = await prisma.product.findFirstOrThrow({
    where: {
      id: productId,
    },
  });

  // Check if the cart already exists for the user
  let cart;
  cart = await prisma.cart.findUnique({
    where: { email },
    include: { items: true },
  });

  if (!cart) {
    // Create a new cart for the user if it doesn't exist
    cart = await prisma.cart.create({
      data: {
        email,
      },
      include: { items: true },
    });
  }

  // Check if the product is already in the cart
  const existingCartItem = cart?.items.find(
    (item) => item.productId === productId
  );

  if (existingCartItem) {
    // Update the quantity of the existing cart item
    await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: {
        quantity: existingCartItem.quantity + quantity,
      },
    });
  } else {
    // Add the product to the cart as a new CartItem
    await prisma.cartItem.create({
      data: {
        productId,
        cartId: cart.id,
        quantity,
      },
    });
  }

  return prisma.cart.findUnique({
    where: { email },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
};

const getCartByCustomerIdFromDB = async (
  email: string
): Promise<Cart | null> => {
  const result = await prisma.cart.findFirst({
    where: {
      customer: {
        email, // Use the email from the related Customer or User model
      },
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              images: true,
              price: true,
              name: true,
              shopId: true,
              discount: true,
            },
          },
        },
      },
    },
  });
  return result;
};
const getCartByVendorIdFromDB = async (vendorId: string): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    where: {
      product: {
        shop: {
          vendorId: vendorId,
        },
      },
    },
    include: {
      product: {
        select: {
          name: true,
          price: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return result;
};

const deleteCartItemByCustomerFromDB = async (
  cartItemId: string
): Promise<CartItem | null> => {
  // Ensure the cart item exists
  console.log(cartItemId);

  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  // Delete the cart item
  await prisma.cartItem.delete({
    where: { id: cartItemId },
  });
  return null;
};

const totalPriceFormCart = async (req: any) => {
  const VAT_PERCENTAGE = 5;

  const { cartId } = req.params;

  // Fetch cart items and their product prices
  const cartItems = await prisma.cartItem.findMany({
    where: { cartId },
    include: {
      product: true, // Include product details (to access the price)
    },
  });

  if (cartItems.length === 0) {
    return new ApiError(httpStatus.BAD_REQUEST, "Length is 0");
  }

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + Number(item.product.price) * item.quantity;
  }, 0);
  const offerTotal = cartItems.reduce((total, item) => {
    let offerDis;
    if (item.product.offerDiscount) {
      offerDis =
        (total +
          Number(item.product.price) *
            item.quantity *
            Number(item.product.offerDiscount)) /
        100;
    } else {
      offerDis =
        (total +
          Number(item.product.price) *
            item.quantity *
            Number(item.product.discount)) /
        100;
    }
    return offerDis;
  }, 0);

  // Calculate VAT and total price
  const vat = (subtotal * VAT_PERCENTAGE) / 100;

  const totalPrice = subtotal + vat - offerTotal;

  // Response
  return {
    subtotal: subtotal.toFixed(2), // e.g., 100.00
    vat: vat.toFixed(2), // e.g., 15.00
    offerTotal: offerTotal.toFixed(2),
    totalPrice: totalPrice.toFixed(2), // e.g., 115.00
  };
};

export const CartService = {
  createCartIntoDB,
  getCartByVendorIdFromDB,
  getCartByCustomerIdFromDB,
  deleteCartItemByCustomerFromDB,
  totalPriceFormCart,
};