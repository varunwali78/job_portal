export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    const result = theFunction(req, res, next);
    if (result && typeof result.catch === "function") {
      result.catch(next);
    }
  };
};

// to catch any async errors it returns the req,res,next if there  is an error otherwise it will call the next function with the error
