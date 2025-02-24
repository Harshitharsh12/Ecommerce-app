import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is Required!!",
      });
    }
    const existingUser = await categoryModel.findOne({ name });
    if (existingUser) {
      return res.status(404).send({
        success: false,
        message: "Category already Exists!!",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: " New Category-Created Successfully!!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category!!",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully!!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};
export const categoryController = async (req, res) => {
  try {
    const allCategory = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      allCategory,
    });
  } catch (error) {
    console.lo(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories!!",
    });
  }
};
export const singleCategoryController = async (req, res) => {
  const { slug } = req.params;
  const category = await categoryModel.findOne({ slug });
  res.status(200).send({
    success: true,
    message: "Single Category get Successfully!!",
    category,
  });
  try {
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting Single categories!!",
    });
  }
};
export const deleteSingleCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: " Category Deleted Successfully!!",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting Single categories!!",
    });
  }
};
export const deleteAllCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.deleteMany();
    res.status(200).send({
      success: true,
      message: "All Categories Deleted Successfully!!",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting all categories!!",
    });
  }
};
