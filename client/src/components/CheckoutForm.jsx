// import { useMutation } from '@apollo/client';
// import { CREATE_STRIPE_SESSION } from '../utils/mutations';
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(
//   'pk_test_51PJvcdBVaH1iGHeJY2P6pMwJukFJAshUZ8exvD58Yxh7IA4an6IOO8po46ekOfm3sJ66lasAiA1z6NbxGGuZZElJ00pd55a9Xr'
// ); // Replace 'your_publishable_key' with your actual Stripe publishable key

// const CheckoutForm = () => {
//   const [createStripeSession, { loading, error }] = useMutation(CREATE_STRIPE_SESSION);
//   const elements = useElements();
//   const stripe = useStripe();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) return;

//     const cardElement = elements.getElement(CardElement);

//     const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (paymentError) {
//       console.log('[error]', paymentError);
//     } else {
//       try {
//         const { data } = await createStripeSession({
//           variables: {
//             amount: 1000, // Replace with the desired donation amount (in cents)
//           },
//         });

//         // Redirect the user to the Stripe checkout page
//         const sessionId = data.createStripeSession.sessionId;
//         const stripeInstance = await stripePromise;
//         await stripeInstance.redirectToCheckout({ sessionId });
//       } catch (error) {
//         console.error('Error creating Stripe session:', error);
//       }
//     }
//   };

//   return (
//     <Box as="form" onSubmit={handleSubmit}>
//       <Heading size="md" mb={4}>
//         Donate via Stripe
//       </Heading>
//       {loading && <Text>Loading...</Text>}
//       {error && <Text color="red.500">{error.message}</Text>}
//       <CardElement />
//       <Flex mt={4} justify="flex-end">
//         <Button type="submit" colorScheme="blue" disabled={!stripe || loading}>
//           Donate
//         </Button>
//       </Flex>
//     </Box>
//   );
// };

// export default CheckoutForm;
