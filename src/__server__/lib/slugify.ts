import slugify from "slugify";

const generateSlug = (str: string) => {
  const options = {
    lower: true,
    trim: true,
    replacement: "-",
  };

  return slugify(str, options);
};

export default generateSlug;
