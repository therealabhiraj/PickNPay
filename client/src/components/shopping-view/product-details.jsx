import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails, fetchProductDetails } from "@/store/shop/products-slice"; 
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import axios from "axios";
import { BASE_API_URL, PYTHON_RECOMMENDER_API_BASE_URL } from "../../config";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const [recommendations, setRecommendations] = useState([]);
  const [recsLoading, setRecsLoading] = useState(false);
  const [recsError, setRecsError] = useState(null);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails()); 
    setRating(0);
    setReviewMsg("");
    setRecommendations([]);
    setRecsError(null);
  }

  function handleRecommendedProductClick(rec) {
    if (rec && rec._id) {
      dispatch(fetchProductDetails(rec._id));
      const dialogContent = document.querySelector('.max-w-[90vw]');
      if (dialogContent) {
          dialogContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails, dispatch]);

  useEffect(() => {
    if (!open || !productDetails || !productDetails._id) {
      setRecommendations([]);
      return;
    }

    async function fetchRecommendationsForProduct() {
      setRecsLoading(true);
      setRecsError(null);
      try {
        const response = await axios.get(
          `${PYTHON_RECOMMENDER_API_BASE_URL}/recommendations/${productDetails._id}`
        );
        if (Array.isArray(response.data)) {
          setRecommendations(response.data);
        } else {
          console.warn("Recommendations API did not return an array:", response.data);
          setRecommendations([]);
        }
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
        setRecsError(
          err.response?.data?.message ||
            "Failed to load recommendations due to a network or server error."
        );
        setRecommendations([]);
      } finally {
        setRecsLoading(false);
      }
    }

    fetchRecommendationsForProduct();
  }, [productDetails, open]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="flex flex-col gap-6 sm:p-8 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-shrink-0">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
              <p className="text-muted-foreground text-2xl mb-5 mt-4">
                {productDetails?.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p
                className={`text-3xl font-bold text-primary ${
                  productDetails?.salePrice > 0 ? "line-through" : ""
                }`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-2xl font-bold text-muted-foreground">
                  ${productDetails?.salePrice}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                <StarRatingComponent rating={averageReview} />
              </div>
              <span className="text-muted-foreground">
                ({averageReview.toFixed(2)})
              </span>
            </div>
            <div className="mt-5 mb-5">
              {productDetails?.totalStock === 0 ? (
                <Button className="w-full opacity-60 cursor-not-allowed">
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                >
                  Add to Cart
                </Button>
              )}
            </div>
            <Separator />

            <div className="flex-grow overflow-y-auto pr-2">
              <h2 className="text-xl font-bold mb-4 mt-4">Reviews</h2>
              <div className="grid gap-6">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div key={reviewItem._id} className="flex gap-4">
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback>
                          {reviewItem?.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{reviewItem?.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarRatingComponent rating={reviewItem?.reviewValue} />
                        </div>
                        <p className="text-muted-foreground">
                          {reviewItem.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>No Reviews</h1>
                )}
              </div>
              <div className="mt-10 flex-col flex gap-2">
                <Label>Write a review</Label>
                <div className="flex gap-1">
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(event) => setReviewMsg(event.target.value)}
                  placeholder="Write a review..."
                />
                <Button
                  onClick={handleAddReview}
                  disabled={reviewMsg.trim() === ""}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <div className="mt-4 w-full flex-shrink-0">
          <h2 className="text-xl font-bold mb-4">Recommended for you:</h2>
          {recsLoading ? (
            <p>Loading recommendations...</p>
          ) : recsError ? (
            <p className="text-red-500">Error loading recommendations: {recsError}</p>
          ) : recommendations.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec._id}
                  className="flex flex-col items-center text-center p-3 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleRecommendedProductClick(rec)}
                >
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-20 h-20 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-base font-semibold line-clamp-2">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground">${rec.price?.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No specific recommendations available at this time.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;